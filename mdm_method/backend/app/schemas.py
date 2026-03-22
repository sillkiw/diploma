# app/schemas.py
from pydantic import BaseModel, Field
from typing import List, Optional, Literal

PresetName = Literal["separable_blobs", "noisy_outlier", "xor"]

class CreateSessionRequest(BaseModel):
    preset: PresetName = "separable_blobs"
    n_per_class: int = Field(default=30, ge=5, le=500)
    seed: Optional[int] = 0

class CreateSessionResponse(BaseModel):
    session_id: str
    P1: List[List[float]]
    P2: List[List[float]]
    state: dict

class StepRequest(BaseModel):
    session_id: str

class RunRequest(BaseModel):
    session_id: str
    eps: float = Field(default=1e-6, gt=0)
    max_iter: int = Field(default=2000, ge=1, le=20000)

class GeometryRequest(BaseModel):
    session_id: str
    span: float = Field(default=8.0, gt=0)

class StateResponse(BaseModel):
    session_id: str
    P1: List[List[float]]
    P2: List[List[float]]
    u: List[float]
    v: List[float]
    last: Optional[dict]
    history: List[dict]


class GeometryRequest(BaseModel):
    session_id: str
    span: float = Field(default=8.0, gt=0)