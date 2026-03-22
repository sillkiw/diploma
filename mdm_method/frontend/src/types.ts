export type PresetName = "separable_blobs" | "noisy_outlier" | "xor";
export type StepResponse = {
  session_id: string;
  u: number[];
  v: number[];
  diag: RunHistoryItem;
};

export type StateResponse = {
  session_id: string;
  P1: number[][];
  P2: number[][];
  u: number[];
  v: number[];
  last: RunHistoryItem | null;
  history: RunHistoryItem[];
};


export type SessionResponse = {
  session_id: string;
  P1: number[][];
  P2: number[][];
  state: {
    delta1: number;
    delta2: number;
    delta: number;
    objective: number;
    w: number[];
    w1: number[];
    w2: number[];
    active_count: number;
  };
};

export type RunHistoryItem = {
  updated_class: number;
  donor_index: number;
  receiver_index: number;
  t: number;
  truncated: boolean;
  delta1: number;
  delta2: number;
  delta: number;
  objective: number;
  w: number[];
  w1: number[];
  w2: number[];
  active_count: number;
  moved_mass: number;
donor_weight_before: number;
donor_weight_after: number;
receiver_weight_before: number;
receiver_weight_after: number;
};
export type GeometryResponse = {
  session_id: string;
  state: {
    delta1: number;
    delta2: number;
    delta: number;
    objective: number;
    w: number[];
    w1: number[];
    w2: number[];
    active_count: number;
  };
  geometry: {
    separable: boolean;
    distance: number;
    midpoint: number[];
    normal: number[];
    direction: number[];
    line: null | { p0: number[]; p1: number[] };
    margin_plus: null | { p0: number[]; p1: number[] };
    margin_minus: null | { p0: number[]; p1: number[] };
  };
  extras: {
    s1: number[];
    s2: number[];
    u: number[];
    v: number[];
  };
};