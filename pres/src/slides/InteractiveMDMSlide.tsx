import { useEffect, useMemo, useRef, useState } from "react";
import type { GeometryResponse, PresetName, RunHistoryItem, SessionResponse } from "../types";
import { createSession, getGeometry, resetSession, stepSession } from "../api";
import { Controls } from "../components/Controls";
import { GeometryPlot } from "../components/GeometryPlot";
import { SlideShell } from "../components/SlideShell";

export function InteractiveMDMSlide() {
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
    if (!sessionId || !runningRef.current) return;

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

   useEffect(() => {
    if (!geometry?.extras) return;
    console.log("s1:", geometry.extras.s1);
    console.log("s2:", geometry.extras.s2);
    console.log("u:", geometry.extras.u);
    console.log("v:", geometry.extras.v);
  }, [geometry]);

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
    <SlideShell centerContent={false} contentClassName="pt-2">
      <div className="flex h-full flex-col gap-5">
        
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
      

        <div className="flex-1 rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
          <GeometryPlot
            P1={P1}
            P2={P2}
            geometry={geometry}
            lastStep={lastStep}
            history={history}
          />

          {status && (
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-neutral-200 pt-4 text-sm text-neutral-700 lg:grid-cols-5">
              <div>
                <span className="font-semibold text-neutral-900">‖w‖:</span>{" "}
                {status.dist.toExponential(3)}
              </div>
              <div>
                <span className="font-semibold text-neutral-900">Δ:</span>{" "}
                {status.delta.toExponential(3)}
              </div>
              <div>
                <span className="font-semibold text-neutral-900">Цель:</span>{" "}
                {status.obj.toExponential(3)}
              </div>
              <div>
                <span className="font-semibold text-neutral-900">Итерации:</span>{" "}
                {history.length}
              </div>
              <div>
                <span className="font-semibold text-neutral-900">Разделимо:</span>{" "}
                {status.sep ? "да" : "нет"}
              </div>
            </div>
          )}

          {lastStep && (
            <div className="mt-3 text-sm text-neutral-600">
              Последний шаг:{" "}
              <span className="font-medium text-neutral-900">
                t = {lastStep.t.toFixed(4)}
              </span>
              {" · "}
              <span className="font-medium text-neutral-900">
                {lastStep.truncated ? "усечённый" : "неусечённый"}
              </span>
            </div>
          )}

          {geometry && !geometry.geometry.separable && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Выпуклые оболочки пересекаются: строгая hard-margin разделимость отсутствует.
            </div>
          )}
        </div>
      </div>
    </SlideShell>
  );
}