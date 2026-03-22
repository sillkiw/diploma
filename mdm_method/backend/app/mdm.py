import numpy as np
from dataclasses import dataclass
from typing import Dict, Tuple


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
        "w1": w1, "w2": w2, "w": w,
        "delta1": delta1, "delta2": delta2,
        "delta": max(delta1, delta2),
        "objective": obj,
        "j_prime": j_prime, "j_bis": j_bis,
        "l_prime": l_prime, "l_bis": l_bis,
        "active_count": int(act1.size + act2.size),
    }


def step(state: MDMState) -> Dict[str, object]:
    info = deltas(state)
    delta1 = float(info["delta1"])
    delta2 = float(info["delta2"])

    if delta1 >= delta2:
        # update within class 1
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
        # update within class 2
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

    # numeric cleanup
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

        # новые поля для объяснения шага
        "moved_mass": float(moved),
        "donor_weight_before": float(donor_before),
        "donor_weight_after": float(donor_after),
        "receiver_weight_before": float(recv_before),
        "receiver_weight_after": float(recv_after),

        "delta1": float(info2["delta1"]),
        "delta2": float(info2["delta2"]),
        "delta": float(info2["delta"]),
        "objective": float(info2["objective"]),
        "w": info2["w"].tolist(),
        "w1": info2["w1"].tolist(),
        "w2": info2["w2"].tolist(),
        "active_count": int(info2["active_count"]),
    }
    return diag


def geometry_2d(state: MDMState, *, span: float = 8.0, tol: float = 1e-10) -> Dict[str, object]:
    """
    Returns drawing primitives for 2D visualization:
      - separating line through midpoint c with normal w
      - two parallel margin lines through w1 and w2
    span: half-length multiplier for plotting line segments (in data units).
    """
    if state.P1.shape[1] != 2 or state.P2.shape[1] != 2:
        raise ValueError("geometry_2d requires 2D data")

    w1, w2, w = current_w(state)
    dist = float(np.linalg.norm(w))
    separable = bool(dist > tol)

    c = 0.5 * (w1 + w2)

    if dist <= tol:
        # No reliable direction
        return {
            "separable": False,
            "distance": dist,
            "midpoint": c.tolist(),
            "normal": w.tolist(),
            "direction": [0.0, 0.0],
            "line": None,
            "margin_plus": None,
            "margin_minus": None,
        }

    n_hat = w / dist
    # Direction along the separating line (perpendicular to normal)
    dir_vec = np.array([-n_hat[1], n_hat[0]], dtype=float)

    # Choose segment endpoints for drawing
    p0 = c - span * dir_vec
    p1 = c + span * dir_vec

    # Margin lines: same direction, but pass through w1 and w2
    m1_0 = w1 - span * dir_vec
    m1_1 = w1 + span * dir_vec
    m2_0 = w2 - span * dir_vec
    m2_1 = w2 + span * dir_vec

    return {
        "separable": True,
        "distance": dist,
        "midpoint": c.tolist(),
        "normal": w.tolist(),
        "direction": dir_vec.tolist(),
        "line": {"p0": p0.tolist(), "p1": p1.tolist()},
        "margin_plus": {"p0": m1_0.tolist(), "p1": m1_1.tolist()},   # through w1
        "margin_minus": {"p0": m2_0.tolist(), "p1": m2_1.tolist()},  # through w2
    }