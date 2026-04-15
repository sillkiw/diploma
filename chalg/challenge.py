#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import time
from dataclasses import dataclass
from typing import Dict, Tuple, List, Any

import numpy as np
import pandas as pd
from sklearn.svm import SVC


# =========================
# MDM: базовые функции
# =========================

def simplex_uniform(n: int) -> np.ndarray:
    return np.ones(n, dtype=float) / float(n)


def weighted_point(P: np.ndarray, w: np.ndarray) -> np.ndarray:
    return (w[:, None] * P).sum(axis=0)


@dataclass
class MDMState:
    P1: np.ndarray  # (n1, d)
    P2: np.ndarray  # (n2, d)
    u: np.ndarray   # (n1,)
    v: np.ndarray   # (n2,)


def current_w(state: MDMState) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
    w1 = weighted_point(state.P1, state.u)
    w2 = weighted_point(state.P2, state.v)
    w = w1 - w2
    return w1, w2, w


def deltas(state: MDMState) -> Dict[str, object]:
    w1, w2, w = current_w(state)

    s1 = state.P1 @ w        # <p_i, w>
    s2 = state.P2 @ (-w)     # <q_j, -w>

    tol = 1e-15
    act1 = np.where(state.u > tol)[0]
    act2 = np.where(state.v > tol)[0]

    j_prime = int(act1[np.argmax(s1[act1])]) if act1.size else int(np.argmax(s1))
    j_bis = int(np.argmin(s1))
    delta1 = float(s1[j_prime] - s1[j_bis])

    l_prime = int(act2[np.argmax(s2[act2])]) if act2.size else int(np.argmax(s2))
    l_bis = int(np.argmin(s2))
    delta2 = float(s2[l_prime] - s2[l_bis])

    obj = 0.5 * float(np.dot(w, w))

    return {
        "w1": w1,
        "w2": w2,
        "w": w,
        "s1": s1,
        "s2": s2,
        "u": state.u.copy(),
        "v": state.v.copy(),
        "delta1": delta1,
        "delta2": delta2,
        "delta": max(delta1, delta2),
        "objective": obj,
        "j_prime": j_prime,
        "j_bis": j_bis,
        "l_prime": l_prime,
        "l_bis": l_bis,
        "active_count": int(act1.size + act2.size),
    }


def step(state: MDMState) -> Dict[str, object]:
    info = deltas(state)
    delta1 = float(info["delta1"])
    delta2 = float(info["delta2"])

    if delta1 >= delta2:
        donor = int(info["j_prime"])
        recv = int(info["j_bis"])

        donor_before = float(state.u[donor])
        recv_before = float(state.u[recv])

        d = state.P1[donor] - state.P1[recv]
        denom = donor_before * float(np.dot(d, d))

        if denom <= 0.0:
            t = 0.0
        else:
            t_hat = delta1 / denom
            t = 1.0 if t_hat >= 1.0 else float(t_hat)

        moved = t * donor_before

        state.u[donor] = donor_before - moved
        state.u[recv] = recv_before + moved

        donor_after = float(state.u[donor])
        recv_after = float(state.u[recv])

        updated_class = 1

    else:
        donor = int(info["l_prime"])
        recv = int(info["l_bis"])

        donor_before = float(state.v[donor])
        recv_before = float(state.v[recv])

        d = state.P2[donor] - state.P2[recv]
        denom = donor_before * float(np.dot(d, d))

        if denom <= 0.0:
            t = 0.0
        else:
            t_hat = delta2 / denom
            t = 1.0 if t_hat >= 1.0 else float(t_hat)

        moved = t * donor_before

        state.v[donor] = donor_before - moved
        state.v[recv] = recv_before + moved

        donor_after = float(state.v[donor])
        recv_after = float(state.v[recv])

        updated_class = 2

    # cleanup
    state.u[state.u < 0] = 0.0
    state.v[state.v < 0] = 0.0

    su = float(state.u.sum())
    sv = float(state.v.sum())
    if su > 0:
        state.u /= su
    if sv > 0:
        state.v /= sv

    info2 = deltas(state)
    diag = {
        "updated_class": updated_class,
        "donor_index": donor,
        "receiver_index": recv,
        "t": float(t),
        "truncated": bool(abs(t - 1.0) < 1e-15),
        "moved_mass": float(moved),
        "donor_weight_before": float(donor_before),
        "donor_weight_after": float(donor_after),
        "receiver_weight_before": float(recv_before),
        "receiver_weight_after": float(recv_after),
        "delta1": float(info2["delta1"]),
        "delta2": float(info2["delta2"]),
        "delta": float(info2["delta"]),
        "objective": float(info2["objective"]),
        "w": np.asarray(info2["w"], dtype=float),
        "w1": np.asarray(info2["w1"], dtype=float),
        "w2": np.asarray(info2["w2"], dtype=float),
        "active_count": int(info2["active_count"]),
    }
    return diag


def run_mdm(
    P1: np.ndarray,
    P2: np.ndarray,
    max_iter: int = 10000,
    tol: float = 1e-10,
) -> Dict[str, Any]:
    state = MDMState(
        P1=P1.copy(),
        P2=P2.copy(),
        u=simplex_uniform(len(P1)),
        v=simplex_uniform(len(P2)),
    )

    history = []
    truncated_count = 0

    t0 = time.perf_counter()

    for k in range(max_iter):
        info = deltas(state)
        history.append({
            "iter": k,
            "objective": float(info["objective"]),
            "delta": float(info["delta"]),
            "delta1": float(info["delta1"]),
            "delta2": float(info["delta2"]),
            "active_count": int(info["active_count"]),
        })

        if info["delta"] <= tol:
            break

        diag = step(state)
        history[-1]["step_t"] = float(diag["t"])
        history[-1]["truncated"] = bool(diag["truncated"])
        if diag["truncated"]:
            truncated_count += 1

    elapsed = time.perf_counter() - t0
    final = deltas(state)

    return {
        "state": state,
        "u": state.u.copy(),
        "v": state.v.copy(),
        "w1": np.asarray(final["w1"], dtype=float),
        "w2": np.asarray(final["w2"], dtype=float),
        "w": np.asarray(final["w"], dtype=float),
        "objective": float(final["objective"]),
        "delta": float(final["delta"]),
        "delta1": float(final["delta1"]),
        "delta2": float(final["delta2"]),
        "active_count": int(final["active_count"]),
        "iterations": len(history),
        "truncated_count": int(truncated_count),
        "time_sec": float(elapsed),
        "history": history,
    }


# =========================
# Восстановление hard-margin SVM из MDM
# =========================

def mdm_hard_margin_from_state(state: MDMState) -> Dict[str, Any]:
    w1, w2, w_star = current_w(state)
    norm2 = float(np.dot(w_star, w_star))

    if norm2 <= 1e-15:
        raise ValueError("Near-zero hull distance; data may be non-separable or degenerate.")

    # По формуле из статьи
    w_svm = 2.0 * w_star / norm2

    P1 = state.P1
    P2 = state.P2

    left = np.max(1.0 - P1 @ w_svm)
    right = np.min(-1.0 - P2 @ w_svm)
    beta = 0.5 * (left + right)

    return {
        "w_star": w_star,
        "distance_between_hulls": float(np.linalg.norm(w_star)),
        "w_svm": w_svm,
        "beta": float(beta),
        "margin_width": 2.0 / float(np.linalg.norm(w_svm)),
        "w1": w1,
        "w2": w2,
    }


# =========================
# sklearn SVM
# =========================

def fit_sklearn_linear_svm(P1: np.ndarray, P2: np.ndarray, C: float = 1e6) -> Dict[str, Any]:
    X = np.vstack([P1, P2]).astype(float)
    y = np.hstack([np.ones(len(P1)), -np.ones(len(P2))]).astype(float)

    t0 = time.perf_counter()
    clf = SVC(kernel="linear", C=C)
    clf.fit(X, y)
    elapsed = time.perf_counter() - t0

    w = clf.coef_[0].astype(float)
    b = float(clf.intercept_[0])
    nw = float(np.linalg.norm(w))

    return {
        "clf": clf,
        "w": w,
        "b": b,
        "norm_w": nw,
        "margin_width": (2.0 / nw) if nw > 0 else np.inf,
        "support_indices": clf.support_.copy(),
        "n_support": clf.n_support_.copy(),
        "time_sec": float(elapsed),
    }


# =========================
# Метрики
# =========================

def predict_linear(X: np.ndarray, w: np.ndarray, b: float) -> np.ndarray:
    scores = X @ w + b
    return np.where(scores >= 0.0, 1.0, -1.0)


def accuracy_score_pm1(y_true: np.ndarray, y_pred: np.ndarray) -> float:
    return float(np.mean(y_true == y_pred))


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    na = float(np.linalg.norm(a))
    nb = float(np.linalg.norm(b))
    if na <= 1e-15 or nb <= 1e-15:
        return np.nan
    return float(np.dot(a, b) / (na * nb))


def signed_margins(X: np.ndarray, y: np.ndarray, w: np.ndarray, b: float) -> np.ndarray:
    return y * (X @ w + b)


def margin_width(w: np.ndarray) -> float:
    nw = float(np.linalg.norm(w))
    if nw <= 1e-15:
        return np.inf
    return 2.0 / nw


def normalized_direction(w: np.ndarray) -> np.ndarray:
    nw = float(np.linalg.norm(w))
    if nw <= 1e-15:
        return np.zeros_like(w)
    return w / nw


def confusion_counts_pm1(y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, int]:
    return {
        "tp": int(np.sum((y_true == 1) & (y_pred == 1))),
        "tn": int(np.sum((y_true == -1) & (y_pred == -1))),
        "fp": int(np.sum((y_true == -1) & (y_pred == 1))),
        "fn": int(np.sum((y_true == 1) & (y_pred == -1))),
    }


def evaluate_mdm_vs_svm(
    P1: np.ndarray,
    P2: np.ndarray,
    mdm_run: Dict[str, Any],
    mdm_svm: Dict[str, Any],
    svm_result: Dict[str, Any],
) -> Dict[str, Any]:
    X = np.vstack([P1, P2]).astype(float)
    y = np.hstack([np.ones(len(P1)), -np.ones(len(P2))]).astype(float)

    w_mdm = np.asarray(mdm_svm["w_svm"], dtype=float)
    b_mdm = float(mdm_svm["beta"])

    w_svm = np.asarray(svm_result["w"], dtype=float)
    b_svm = float(svm_result["b"])

    y_pred_mdm = predict_linear(X, w_mdm, b_mdm)
    y_pred_svm = predict_linear(X, w_svm, b_svm)

    acc_mdm = accuracy_score_pm1(y, y_pred_mdm)
    acc_svm = accuracy_score_pm1(y, y_pred_svm)

    margins_mdm = signed_margins(X, y, w_mdm, b_mdm)
    margins_svm = signed_margins(X, y, w_svm, b_svm)

    cos = cosine_similarity(w_mdm, w_svm)
    cos_abs = abs(cos) if np.isfinite(cos) else np.nan

    dir_mdm = normalized_direction(w_mdm)
    dir_svm = normalized_direction(w_svm)
    sign = 1.0 if not np.isfinite(cos) or cos >= 0 else -1.0

    return {
        "train_accuracy_mdm": acc_mdm,
        "train_accuracy_svm": acc_svm,

        "min_signed_margin_mdm": float(np.min(margins_mdm)),
        "min_signed_margin_svm": float(np.min(margins_svm)),
        "mean_signed_margin_mdm": float(np.mean(margins_mdm)),
        "mean_signed_margin_svm": float(np.mean(margins_svm)),

        "margin_width_mdm": float(margin_width(w_mdm)),
        "margin_width_svm": float(margin_width(w_svm)),
        "margin_width_diff": float(abs(margin_width(w_mdm) - margin_width(w_svm))),

        "cosine_similarity": float(cos),
        "abs_cosine_similarity": float(cos_abs),
        "direction_diff_norm": float(np.linalg.norm(dir_mdm - sign * dir_svm)),

        "mdm_iterations": int(mdm_run["iterations"]),
        "mdm_final_delta": float(mdm_run["delta"]),
        "mdm_active_count": int(mdm_run["active_count"]),
        "mdm_truncated_count": int(mdm_run["truncated_count"]),
        "mdm_time_sec": float(mdm_run["time_sec"]),
        "svm_time_sec": float(svm_result["time_sec"]),

        "mdm_objective": float(mdm_run["objective"]),
        "mdm_hull_distance": float(np.linalg.norm(mdm_run["w"])),

        "confusion_mdm": confusion_counts_pm1(y, y_pred_mdm),
        "confusion_svm": confusion_counts_pm1(y, y_pred_svm),
    }


# =========================
# Генерация данных
# =========================

def make_separable_classes(
    n1: int,
    n2: int,
    d: int,
    seed: int,
    mean_sep: float = 6.0,
    noise: float = 1.0,
) -> Tuple[np.ndarray, np.ndarray]:
    """
    Генерирует два линейно разделимых / почти разделимых больших класса.
    Чем больше mean_sep, тем легче задача.
    """
    rng = np.random.default_rng(seed)

    center1 = np.zeros(d, dtype=float)
    center2 = np.zeros(d, dtype=float)
    center2[0] = mean_sep

    P1 = rng.normal(loc=0.0, scale=noise, size=(n1, d)) + center1
    P2 = rng.normal(loc=0.0, scale=noise, size=(n2, d)) + center2

    return P1, P2


# =========================
# Один эксперимент
# =========================

def run_single_experiment(
    n1: int,
    n2: int,
    d: int,
    seed: int,
    mdm_tol: float,
    mdm_max_iter: int,
    svm_C: float,
    mean_sep: float,
    noise: float,
) -> Dict[str, Any]:
    P1, P2 = make_separable_classes(
        n1=n1,
        n2=n2,
        d=d,
        seed=seed,
        mean_sep=mean_sep,
        noise=noise,
    )

    mdm_run = run_mdm(P1, P2, max_iter=mdm_max_iter, tol=mdm_tol)
    mdm_svm = mdm_hard_margin_from_state(mdm_run["state"])
    svm_result = fit_sklearn_linear_svm(P1, P2, C=svm_C)
    metrics = evaluate_mdm_vs_svm(P1, P2, mdm_run, mdm_svm, svm_result)

    row = {
        "seed": seed,
        "n1": n1,
        "n2": n2,
        "d": d,
        "mean_sep": mean_sep,
        "noise": noise,
        **metrics,
    }
    return row


# =========================
# Серия экспериментов
# =========================

def run_benchmark(
    sizes: List[int],
    repeats: int,
    d: int,
    mdm_tol: float,
    mdm_max_iter: int,
    svm_C: float,
    mean_sep: float,
    noise: float,
    base_seed: int,
) -> pd.DataFrame:
    rows = []

    for n in sizes:
        for rep in range(repeats):
            seed = base_seed + 1000 * n + rep
            row = run_single_experiment(
                n1=n,
                n2=n,
                d=d,
                seed=seed,
                mdm_tol=mdm_tol,
                mdm_max_iter=mdm_max_iter,
                svm_C=svm_C,
                mean_sep=mean_sep,
                noise=noise,
            )
            rows.append(row)
            print(
                f"[done] n={n:5d}, rep={rep+1}/{repeats}, "
                f"acc_mdm={row['train_accuracy_mdm']:.3f}, "
                f"acc_svm={row['train_accuracy_svm']:.3f}, "
                f"abs_cos={row['abs_cosine_similarity']:.6f}, "
                f"mdm_time={row['mdm_time_sec']:.4f}s, "
                f"svm_time={row['svm_time_sec']:.4f}s"
            )

    return pd.DataFrame(rows)


# =========================
# Печать таблиц
# =========================

def print_summary_tables(df: pd.DataFrame) -> None:
    pd.set_option("display.max_columns", 200)
    pd.set_option("display.width", 220)

    print("\n=== RAW RESULTS ===")
    cols = [
        "n1",
        "seed",
        "train_accuracy_mdm",
        "train_accuracy_svm",
        "abs_cosine_similarity",
        "margin_width_mdm",
        "margin_width_svm",
        "margin_width_diff",
        "min_signed_margin_mdm",
        "min_signed_margin_svm",
        "mdm_iterations",
        "mdm_final_delta",
        "mdm_active_count",
        "mdm_time_sec",
        "svm_time_sec",
    ]
    print(df[cols].to_string(index=False))

    print("\n=== AGGREGATED BY SIZE (mean/std) ===")
    agg = (
        df.groupby("n1")
        .agg({
            "train_accuracy_mdm": ["mean", "std"],
            "train_accuracy_svm": ["mean", "std"],
            "abs_cosine_similarity": ["mean", "std"],
            "margin_width_mdm": ["mean", "std"],
            "margin_width_svm": ["mean", "std"],
            "margin_width_diff": ["mean", "std"],
            "min_signed_margin_mdm": ["mean", "std"],
            "min_signed_margin_svm": ["mean", "std"],
            "mdm_iterations": ["mean", "std"],
            "mdm_final_delta": ["mean", "std"],
            "mdm_active_count": ["mean", "std"],
            "mdm_time_sec": ["mean", "std"],
            "svm_time_sec": ["mean", "std"],
        })
    )
    print(agg)


# =========================
# main
# =========================

def parse_args():
    parser = argparse.ArgumentParser(
        description="Benchmark MDM vs sklearn linear SVM on large separable classes."
    )
    parser.add_argument(
        "--sizes",
        type=int,
        nargs="+",
        default=[200, 500, 1000],
        help="Class sizes to test. Example: --sizes 200 500 1000",
    )
    parser.add_argument(
        "--repeats",
        type=int,
        default=3,
        help="Number of repeats per size.",
    )
    parser.add_argument(
        "--dim",
        type=int,
        default=2,
        help="Feature dimension.",
    )
    parser.add_argument(
        "--mdm-tol",
        type=float,
        default=1e-10,
        help="Stopping tolerance for MDM delta.",
    )
    parser.add_argument(
        "--mdm-max-iter",
        type=int,
        default=20000,
        help="Maximum MDM iterations.",
    )
    parser.add_argument(
        "--svm-C",
        type=float,
        default=1e6,
        help="Large C to approximate hard-margin SVM.",
    )
    parser.add_argument(
        "--mean-sep",
        type=float,
        default=6.0,
        help="Distance between class centers along first coordinate.",
    )
    parser.add_argument(
        "--noise",
        type=float,
        default=1.0,
        help="Gaussian noise scale.",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=42,
        help="Base random seed.",
    )
    parser.add_argument(
        "--csv",
        type=str,
        default="mdm_vs_svm_results.csv",
        help="Output CSV file.",
    )
    return parser.parse_args()


def main():
    args = parse_args()

    df = run_benchmark(
        sizes=args.sizes,
        repeats=args.repeats,
        d=args.dim,
        mdm_tol=args.mdm_tol,
        mdm_max_iter=args.mdm_max_iter,
        svm_C=args.svm_C,
        mean_sep=args.mean_sep,
        noise=args.noise,
        base_seed=args.seed,
    )

    print_summary_tables(df)

    df.to_csv(args.csv, index=False)
    print(f"\nSaved results to: {args.csv}")


if __name__ == "__main__":
    main()