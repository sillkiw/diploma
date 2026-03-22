import numpy as np
from typing import Literal, Optional, Tuple

PresetName = Literal["separable_blobs", "noisy_outlier", "xor"]

def make_dataset(preset: PresetName, n_per_class: int, seed: Optional[int]) -> Tuple[np.ndarray, np.ndarray]:
    g = np.random.default_rng(seed)
    n = n_per_class

    if preset == "separable_blobs":
        P1 = g.normal(loc=(-2.0, 0.0), scale=0.7, size=(n, 2))
        P2 = g.normal(loc=(+2.0, 0.0), scale=0.7, size=(n, 2))
        return P1, P2

    if preset == "noisy_outlier":
        P1 = g.normal(loc=(-2.0, 0.0), scale=0.8, size=(n, 2))
        P2 = g.normal(loc=(+2.0, 0.0), scale=0.8, size=(n, 2))
        P1 = np.vstack([P1, np.array([[+1.0, 0.0]])])
        P2 = np.vstack([P2, np.array([[-1.0, 0.0]])])
        return P1, P2

    if preset == "xor":
        c = 1.8
        s = 0.35
        P1 = np.vstack([
            g.normal(loc=(-c, -c), scale=s, size=(n // 2, 2)),
            g.normal(loc=(+c, +c), scale=s, size=(n - n // 2, 2)),
        ])
        P2 = np.vstack([
            g.normal(loc=(-c, +c), scale=s, size=(n // 2, 2)),
            g.normal(loc=(+c, -c), scale=s, size=(n - n // 2, 2)),
        ])
        return P1, P2

    raise ValueError("Unknown preset")