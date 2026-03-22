from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import GeometryRequest
from .mdm import geometry_2d
from .schemas import (
    CreateSessionRequest, CreateSessionResponse,
    StepRequest, RunRequest, StateResponse
)
from .presets import make_dataset
from .mdm import MDMState, simplex_uniform, deltas, step
from .storage import new_session, get_session, reset_session


app = FastAPI(title="MDM Demo API", version="1.0.0")

# Разрешаем фронту ходить на API (потом сузишь origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _state_snapshot(state: MDMState) -> dict:
    info = deltas(state)
    return {
        "delta1": float(info["delta1"]),
        "delta2": float(info["delta2"]),
        "delta": float(info["delta"]),
        "objective": float(info["objective"]),
        "w": info["w"].tolist(),
        "w1": info["w1"].tolist(),
        "w2": info["w2"].tolist(),
        "active_count": int(info["active_count"]),
    }


@app.post("/api/session", response_model=CreateSessionResponse)
def create_session(req: CreateSessionRequest):
    P1, P2 = make_dataset(req.preset, req.n_per_class, req.seed)
    u = simplex_uniform(P1.shape[0])
    v = simplex_uniform(P2.shape[0])
    state = MDMState(P1=P1, P2=P2, u=u, v=v)
    sid = new_session(state)

    return {
        "session_id": sid,
        "P1": P1.tolist(),
        "P2": P2.tolist(),
        "state": _state_snapshot(state),
    }


@app.get("/api/state", response_model=StateResponse)
def get_state(session_id: str):
    try:
        sess = get_session(session_id)
    except KeyError:
        raise HTTPException(status_code=404, detail="Unknown session_id")

    last = sess.history[-1] if sess.history else None
    st = sess.state
    return {
        "session_id": session_id,
        "P1": st.P1.tolist(),
        "P2": st.P2.tolist(),
        "u": st.u.tolist(),
        "v": st.v.tolist(),
        "last": last,
        "history": sess.history,
    }


@app.post("/api/step")
def do_step(req: StepRequest):
    try:
        sess = get_session(req.session_id)
    except KeyError:
        raise HTTPException(status_code=404, detail="Unknown session_id")

    diag = step(sess.state)
    sess.history.append(diag)

    return {
        "session_id": req.session_id,
        "u": sess.state.u.tolist(),
        "v": sess.state.v.tolist(),
        "diag": diag,
    }


@app.post("/api/run")
def run(req: RunRequest):
    try:
        sess = get_session(req.session_id)
    except KeyError:
        raise HTTPException(status_code=404, detail="Unknown session_id")

    for _ in range(req.max_iter):
        snap = _state_snapshot(sess.state)
        if snap["delta"] <= req.eps:
            break
        diag = step(sess.state)
        sess.history.append(diag)

    return {
        "session_id": req.session_id,
        "iterations": len(sess.history),
        "last": sess.history[-1] if sess.history else _state_snapshot(sess.state),
        "history": sess.history,
    }


@app.post("/api/reset")
def reset(session_id: str):
    try:
        sess = get_session(session_id)
    except KeyError:
        raise HTTPException(status_code=404, detail="Unknown session_id")

    # переинициализируем веса (оставляем точки)
    st = sess.state
    st.u[:] = simplex_uniform(st.P1.shape[0])
    st.v[:] = simplex_uniform(st.P2.shape[0])
    reset_session(sess)

    return {"session_id": session_id, "state": _state_snapshot(st)}

@app.post("/api/geometry")
def get_geometry(req: GeometryRequest):
    try:
        sess = get_session(req.session_id)
    except KeyError:
        raise HTTPException(status_code=404, detail="Unknown session_id")

    st = sess.state
    try:
        geo = geometry_2d(st, span=req.span)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # дополнительные данные для “вау” визуала
    info = deltas(st)
    w = info["w"]
    extras = {
        "s1": (st.P1 @ w).tolist(),       # <p_i, w>
        "s2": (st.P2 @ (-w)).tolist(),    # <q_j, -w>
        "u": st.u.tolist(),
        "v": st.v.tolist(),
    }

    return {
        "session_id": req.session_id,
        "state": _state_snapshot(st),
        "geometry": geo,
        "extras": extras,
    }