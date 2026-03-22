import { useEffect, useMemo, useRef, useState } from "react";
import type { GeometryResponse, PresetName, RunHistoryItem, SessionResponse } from "./types";
import { createSession, getGeometry, resetSession, stepSession } from "./api";
import { Controls } from "./components/Controls";
import { GeometryPlot } from "./components/GeometryPlot";
import { MetricsPlots } from "./components/MetricsPlots";

export default function App() {
  const [preset, setPreset] = useState<PresetName>("separable_blobs");
  const [nPerClass, setNPerClass] = useState<number>(30);
  const [seed, setSeed] = useState<number>(0);
  const [eps, setEps] = useState<number>(1e-6);
  const [speedMs, setSpeedMs] = useState<number>(120);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [P1, setP1] = useState<number[][]>([]);
  const [P2, setP2] = useState<number[][]>([]);
  const [geometry, setGeometry] = useState<GeometryResponse | null>(null);

  const [history, setHistory] = useState<RunHistoryItem[]>([]);
  const [running, setRunning] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(false);

  const runningRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const lastStep = history.length ? history[history.length - 1] : null;

  async function refreshGeometry(sid: string) {
    const geo = await getGeometry(sid, 8.0);
    setGeometry(geo);
    return geo;
  }

  function stopRun() {
    runningRef.current = false;
    setRunning(false);
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  async function onCreate() {
    stopRun();
    setBusy(true);
    try {
      const res: SessionResponse = await createSession(preset, nPerClass, seed);
      setSessionId(res.session_id);
      setP1(res.P1);
      setP2(res.P2);
      setHistory([]);
      await refreshGeometry(res.session_id);
    } finally {
      setBusy(false);
    }
  }

  async function onReset() {
    if (!sessionId) return;
    stopRun();
    setBusy(true);
    try {
      await resetSession(sessionId);
      setHistory([]);
      await refreshGeometry(sessionId);
    } finally {
      setBusy(false);
    }
  }

  async function onStep() {
    if (!sessionId) return;
    setBusy(true);
    try {
      const res = await stepSession(sessionId);
      setHistory((h) => [...h, res.diag as RunHistoryItem]);
      const geo = await refreshGeometry(sessionId);

      if (geo.state.delta <= eps) stopRun();
    } finally {
      setBusy(false);
    }
  }

  async function runOnce() {
    if (!sessionId) return;
    if (!runningRef.current) return;

    if (busy) {
      timerRef.current = window.setTimeout(runOnce, speedMs);
      return;
    }

    try {
      setBusy(true);

      const res = await stepSession(sessionId);
      setHistory((h) => [...h, res.diag as RunHistoryItem]);

      const geo = await getGeometry(sessionId, 8.0);
      setGeometry(geo);

      if (geo.state.delta <= eps) {
        stopRun();
        return;
      }

      timerRef.current = window.setTimeout(runOnce, speedMs);
    } catch {
      stopRun();
    } finally {
      setBusy(false);
    }
  }

  function startRun() {
    if (!sessionId) return;
    runningRef.current = true;
    setRunning(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(runOnce, speedMs);
  }

  function onRunToggle() {
    if (running) stopRun();
    else startRun();
  }

  useEffect(() => {
    onCreate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const status = useMemo(() => {
    if (!geometry) return null;
    return {
      dist: geometry.geometry.distance,
      sep: geometry.geometry.separable,
      delta: geometry.state.delta,
      obj: geometry.state.objective,
    };
  }, [geometry]);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr", gap: 16, alignItems: "start" }}>
        <div className="card">
          <GeometryPlot P1={P1} P2={P2} geometry={geometry} lastStep={lastStep} history={history} />

          {status && (
            <div style={{ marginTop: 10, display: "flex", gap: 18, flexWrap: "wrap" }}>
              <div><b>Расстояние ‖w‖</b>: {status.dist.toExponential(3)}</div>
              <div><b>Разделимо</b>: {status.sep ? "да" : "нет"}</div>
              <div><b>Δ</b>: {status.delta.toExponential(3)}</div>
              <div><b>Цель</b>: {status.obj.toExponential(3)}</div>
              <div><b>Итерации</b>: {history.length}</div>
              {lastStep && (
                <div><b>t</b>: {lastStep.t.toFixed(3)} {lastStep.truncated ? "(усеч.)" : ""}</div>
              )}
            </div>
          )}

          {geometry && !geometry.geometry.separable && (
            <div style={{ marginTop: 8, color: "#b42318" }}>
              Выпуклые оболочки пересекаются (‖w‖≈0): строгая (hard-margin) разделимость отсутствует.
            </div>
          )}
        </div>

        <div className="card">
          <Controls
            preset={preset}
            setPreset={setPreset}
            nPerClass={nPerClass}
            setNPerClass={setNPerClass}
            seed={seed}
            setSeed={setSeed}
            eps={eps}
            setEps={setEps}
            speedMs={speedMs}
            setSpeedMs={setSpeedMs}
            running={running}
            onCreate={onCreate}
            onStep={onStep}
            onRunToggle={onRunToggle}
            onReset={onReset}
            disabled={busy}
          />

          {lastStep && (
            <div style={{ marginTop: 12 }} className="card">
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Шаг алгоритма</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div><b>Класс</b>: {lastStep.updated_class === 1 ? "+1" : "-1"}</div>
                <div><b>t</b>: {lastStep.t.toFixed(4)} {lastStep.truncated ? "(усеч.)" : ""}</div>

                <div><b>Донор</b>: {lastStep.donor_index}</div>
                <div><b>Получатель</b>: {lastStep.receiver_index}</div>

                {"donor_weight_before" in lastStep ? (
                  <>
                    <div><b>Вес донора (до)</b>: {lastStep.donor_weight_before.toExponential(3)}</div>
                    <div><b>Вес донора (после)</b>: {lastStep.donor_weight_after.toExponential(3)}</div>
                      <div><b>Вес получателя (до)</b>: {lastStep.receiver_weight_before.toExponential(3)}</div>
                    
                    <div><b>Вес получателя (после)</b>: {lastStep.receiver_weight_after.toExponential(3)}</div>
                  <div><b>Перенос δ</b>: {lastStep.moved_mass.toExponential(3)}</div>

<div><b>Прирост получателя</b>: {(lastStep.receiver_weight_after - lastStep.receiver_weight_before).toExponential(3)}</div>
                  </>
                ) : (
                  <div style={{ gridColumn: "1 / -1" }} className="muted">
                    Чтобы показывать веса и перенос δ, добавь поля moved_mass/donor_weight_* в ответ /api/step на бэкенде.
                  </div>
                )}
              </div>

              {"donor_weight_before" in lastStep && (
                <div className="muted" style={{ marginTop: 8 }}>
                  Перенос массы: <b>δ = t · вес_донора(до)</b>. Размер точек на графике пропорционален весам u/v.
                </div>
              )}
            </div>
          )}

          {sessionId && (
            <div style={{ marginTop: 12 }} className="muted">
              <div style={{ fontWeight: 700, marginBottom: 4 }}>session_id</div>
              <div style={{ wordBreak: "break-all" }}>{sessionId}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 14 }} className="card">
        <MetricsPlots history={history} />
      </div>
    </div>
  );
}