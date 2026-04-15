import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlideShell } from "../components/SlideShell";
import { MInline } from "../components/Math";

type Pt = { x: number; y: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpPt = (a: Pt, b: Pt, t: number): Pt => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
});



function hullPath(points: Pt[]) {
  if (points.length === 0) return "";
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return `${d} Z`;
}

function linePath(a: Pt, b: Pt) {
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}

function pointOnSegment(a: Pt, b: Pt, t: number) {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}



function Arrow({
  from,
  to,
  label,
  dashed = false,
  faint = false,
  color = "currentColor",
  labelDx = 0,
  labelDy = -16,
  strokeWidth = 3.25,
}: {
  from: Pt;
  to: Pt;
  label?: string;
  dashed?: boolean;
  faint?: boolean;
  color?: string;
  labelDx?: number;
  labelDy?: number;
  strokeWidth?: number;
}) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const head = 12;
  const a1 = {
    x: to.x - head * Math.cos(angle - Math.PI / 7),
    y: to.y - head * Math.sin(angle - Math.PI / 7),
  };
  const a2 = {
    x: to.x - head * Math.cos(angle + Math.PI / 7),
    y: to.y - head * Math.sin(angle + Math.PI / 7),
  };
  const mid = { x: (from.x + to.x) / 2 + labelDx, y: (from.y + to.y) / 2 + labelDy };
  const width = label ? Math.max(82, 12 * label.length) : 0;

  return (
    <g opacity={faint ? 0.32 : 1}>
      <path
        d={linePath(from, to)}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? "10 8" : undefined}
        strokeLinecap="round"
      />
      <path
        d={`M ${to.x} ${to.y} L ${a1.x} ${a1.y} M ${to.x} ${to.y} L ${a2.x} ${a2.y}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {label ? (
        <g transform={`translate(${mid.x}, ${mid.y})`}>
          <rect
            x={-width / 2}
            y={-16}
            width={width}
            height={32}
            rx={16}
            fill="white"
            opacity={0.94}
            stroke="rgba(15,23,42,0.06)"
          />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-neutral-800 text-[16px] font-medium"
          >
            {label}
          </text>
        </g>
      ) : null}
    </g>
  );
}

function Dot({
  p,
  label,
  tone = "dark",
  r = 8,
  dx = 14,
  dy = -14,
}: {
  p: Pt;
  label: string;
  tone?: "dark" | "accent" | "muted";
  r?: number;
  dx?: number;
  dy?: number;
}) {
  const fill =
    tone === "accent"
      ? "#0f172a"
      : tone === "muted"
        ? "#94a3b8"
        : "#334155";

  return (
    <g>
      <circle cx={p.x} cy={p.y} r={r} fill={fill} />
      <text
        x={p.x + dx}
        y={p.y + dy}
        className="fill-neutral-800 text-[18px] font-medium"
      >
        {label}
      </text>
    </g>
  );
}

function Tick({ x, label, active }: { x: number; label: string; active: boolean }) {
  return (
    <g>
      <line
        x1={x}
        y1={-9}
        x2={x}
        y2={9}
        stroke="currentColor"
        strokeWidth={active ? 3 : 2}
        className={active ? "text-neutral-900" : "text-neutral-400"}
      />
      <text
        x={x}
        y={34}
        textAnchor="middle"
        className={active ? "fill-neutral-900 text-[16px] font-semibold" : "fill-neutral-500 text-[15px] font-medium"}
      >
        {label}
      </text>
    </g>
  );
}

export function MDMStepTrajectoryVisualSlide() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;

    let raf = 0;
    let start: number | null = null;
    const duration = 5600;

    const loop = (ts: number) => {
      if (start == null) start = ts;
      const raw = ((ts - start) % duration) / duration;
      const cycle = 0.5 - 0.5 * Math.cos(2 * Math.PI * raw);
      setT(cycle);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const geom = useMemo(() => {
    const pPrime: Pt = { x: 230, y: 128 };
    const pDoublePrime: Pt = { x: 640, y: 198 };

    const xk: Pt = { x: 340, y: 232 };
    const xHat: Pt = { x: 548, y: 176 };
    const xkt = lerpPt(xk, xHat, t);

    const yk: Pt = { x: 822, y: 368 };

    const c1Hull: Pt[] = [
      { x: 92, y: 110 },
      { x: 220, y: 56 },
      { x: 470, y: 54 },
      { x: 660, y: 106 },
      { x: 720, y: 192 },
      { x: 676, y: 286 },
      { x: 484, y: 340 },
      { x: 220, y: 326 },
      { x: 102, y: 238 },
    ];

    const c2Hull: Pt[] = [
      { x: 700, y: 252 },
      { x: 824, y: 220 },
      { x: 950, y: 248 },
      { x: 986, y: 338 },
      { x: 956, y: 438 },
      { x: 830, y: 486 },
      { x: 694, y: 452 },
      { x: 650, y: 348 },
    ];

    const sliderWidth = 420;
    const sliderPos = pointOnSegment({ x: 0, y: 0 }, { x: sliderWidth, y: 0 }, t);

    return {
      pPrime,
      pDoublePrime,
      xk,
      xHat,
      xkt,
      yk,
      c1Hull,
      c2Hull,
      sliderPos,
      sliderWidth,
    };
  }, [t]);

  const tText = t.toFixed(2);
  const tPercent = Math.round(t * 100);

  return (
    <SlideShell
      title="Движение точки в C₁ и траектория w_k(t)"
      centerContent={false}
      contentClassName="pt-2"
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="min-w-0 text-[19px] text-neutral-700">
            <MInline math={String.raw`x_k(t)=x_k-t\,u_k'(p_k'-p_k'')`} />
            <span className="mx-3 text-neutral-300">→</span>
            <MInline math={String.raw`w_k(t)=x_k(t)-y_k`} />
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm">
              t = {tText}
            </div>
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
            >
              {playing ? "⏸ Пауза" : "▶ Пуск"}
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-[30px] border border-neutral-200 bg-[radial-gradient(circle_at_top_left,_white_0%,_#f8fafc_55%,_#f3f4f6_100%)] shadow-sm">
          <svg viewBox="0 0 1080 560" className="h-full w-full">
            <defs>
              <linearGradient id="c1Fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="c2Fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="trackGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.46" />
              </linearGradient>
              <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodOpacity="0.11" />
              </filter>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#16a34a" floodOpacity="0.22" />
              </filter>
              <marker id="sepArrow" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto">
                <path d="M 0 0 L 12 6 L 0 12 z" fill="#cbd5e1" />
              </marker>
            </defs>

            <path
              d={hullPath(geom.c1Hull)}
              fill="url(#c1Fill)"
              stroke="#6366f1"
              strokeWidth={2.5}
              filter="url(#softShadow)"
            />
            <text x={118} y={88} className="fill-indigo-700 text-[24px] font-semibold">
              C₁
            </text>

            <path
              d={hullPath(geom.c2Hull)}
              fill="url(#c2Fill)"
              stroke="#f59e0b"
              strokeWidth={2.5}
              filter="url(#softShadow)"
            />
            <text x={970} y={236} className="fill-amber-700 text-[24px] font-semibold">
              C₂
            </text>

            <line
              x1={698}
              y1={150}
              x2={698}
              y2={470}
              stroke="#cbd5e1"
              strokeWidth={2.5}
              strokeDasharray="10 10"
              markerEnd="url(#sepArrow)"
            />

            <path
              d={linePath(geom.xk, geom.xHat)}
              fill="none"
              stroke="url(#trackGrad)"
              strokeWidth={12}
              strokeLinecap="round"
            />
            <circle cx={geom.xk.x} cy={geom.xk.y} r={7} fill="#0f172a" fillOpacity={0.18} />
            <circle cx={geom.xHat.x} cy={geom.xHat.y} r={7} fill="#0f172a" fillOpacity={0.22} />

            <Arrow
              from={geom.pPrime}
              to={geom.pDoublePrime}
              label="p''_k - p'_k"
              dashed
              faint
              color="#94a3b8"
              labelDy={-20}
            />

            <Arrow
              from={geom.yk}
              to={geom.xk}
              label="w_k"
              dashed
              faint
              color="#64748b"
              labelDx={-18}
              labelDy={-10}
            />

            <Arrow
              from={geom.yk}
              to={geom.xHat}
              label="x̂_k - y_k"
              dashed
              faint
              color="#94a3b8"
              labelDx={18}
              labelDy={18}
            />

            <Arrow
              from={geom.yk}
              to={geom.xkt}
              label="w_k(t)"
              color="#0f172a"
              labelDx={-8}
              labelDy={-26}
              strokeWidth={3.5}
            />

            <Dot p={geom.pPrime} label="p'_k" tone="muted" r={7} dx={12} dy={-10} />
            <Dot p={geom.pDoublePrime} label="p''_k" tone="muted" r={7} dx={12} dy={-12} />
            <Dot p={geom.xk} label="x_k" tone="muted" r={8} dx={16} dy={-16} />
            <Dot p={geom.xHat} label="x̂_k" tone="dark" r={8} dx={16} dy={-16} />
            <Dot p={geom.yk} label="y_k" tone="dark" r={8} dx={16} dy={-16} />

            <motion.g
              animate={{ x: geom.xkt.x - geom.xk.x, y: geom.xkt.y - geom.xk.y }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <circle cx={geom.xk.x} cy={geom.xk.y} r={12} fill="#16a34a" filter="url(#glow)" />
              <circle cx={geom.xk.x} cy={geom.xk.y} r={19} fill="none" stroke="#16a34a" strokeOpacity="0.16" strokeWidth={6} />
              <text
                x={geom.xk.x + 18}
                y={geom.xk.y + 34}
                className="fill-green-700 text-[18px] font-semibold"
              >
                x_k(t)
              </text>
            </motion.g>

            <g transform={`translate(${geom.xkt.x + 38}, ${geom.xkt.y + 42})`}>
              <rect
                x={0}
                y={0}
                width={96}
                height={36}
                rx={18}
                fill="white"
                opacity={0.96}
                stroke="rgba(15,23,42,0.06)"
              />
              <text
                x={48}
                y={23}
                textAnchor="middle"
                className="fill-neutral-800 text-[16px] font-medium"
              >
                {tPercent}%
              </text>
            </g>
          </svg>

          <div className="absolute inset-x-6 bottom-5">
            <div className="rounded-[22px] border border-white/70 bg-white/82 px-5 py-4 backdrop-blur-sm shadow-sm">
              <div className="relative mx-auto h-10 max-w-[480px]">
                <div className="absolute inset-x-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-neutral-200" />
                <div
                  className="absolute left-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full rounded-r-none bg-neutral-900/80"
                  style={{ width: `${tPercent}%` }}
                />
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                  <svg viewBox={`0 0 ${geom.sliderWidth} 40`} className="w-full overflow-visible">
                    <g transform="translate(0,20)">
                      <Tick x={0} label="0" active={tPercent <= 3} />
                      <Tick x={geom.sliderWidth / 2} label="t" active={tPercent > 47 && tPercent < 53} />
                      <Tick x={geom.sliderWidth} label="1" active={tPercent >= 97} />
                    </g>
                  </svg>
                </div>
                <motion.div
                  className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-neutral-900 shadow-md"
                  animate={{ left: `${tPercent}%` }}
                  transition={{ type: "spring", stiffness: 160, damping: 20 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
