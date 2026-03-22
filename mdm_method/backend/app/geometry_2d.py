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