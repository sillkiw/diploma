import uuid
from dataclasses import dataclass, field
from typing import Dict, List

import numpy as np
from .mdm import MDMState

@dataclass
class Session:
    state: MDMState
    history: List[dict] = field(default_factory=list)

SESSIONS: Dict[str, Session] = {}

def new_session(state: MDMState) -> str:
    sid = uuid.uuid4().hex
    SESSIONS[sid] = Session(state=state)
    return sid

def get_session(session_id: str) -> Session:
    s = SESSIONS.get(session_id)
    if s is None:
        raise KeyError("Unknown session_id")
    return s

def reset_session(session: Session):
    session.history.clear()