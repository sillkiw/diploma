import { motion } from "framer-motion";
import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

const pts1 = [
  { x: 110, y: 240 },
  { x: 150, y: 185 },
  { x: 205, y: 255 },
  { x: 245, y: 165 }, // p_k'
  { x: 285, y: 225 }, // p_k''
  { x: 330, y: 145 },
];

const pts2 = [
  { x: 430, y: 110 },
  { x: 470, y: 180 },
  { x: 520, y: 95 },
  { x: 565, y: 165 },
  { x: 610, y: 120 },
];

const pkPrime = { x: 245, y: 165 };
const pkBis = { x: 285, y: 225 };
const xk = { x: 225, y: 205 };
const xhat = { x: 255, y: 250 };

export function MDMStepSizeSlide() {
  return (
    <SlideShell
      title="Траектория и выбор шага"
      subtitle="Перенос коэффициента задаёт допустимое движение вдоль отрезка"
      centerContent={false}
      contentClassName="pt-2"
    >
      <div className="flex h-full flex-col gap-8">
        <div className="grid grid-cols-[1.15fr_0.85fr] gap-8 items-center">
          <div className="rounded-[30px] border border-neutral-200 bg-white px-5 py-5 shadow-sm">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Геометрическая схема шага
            </div>

            <svg viewBox="0 0 700 340" className="w-full overflow-visible">
              {/* axes */}
              <line x1="50" y1="300" x2="655" y2="300" stroke="#d4d4d8" strokeWidth="1.5" />
              <line x1="50" y1="300" x2="50" y2="35" stroke="#d4d4d8" strokeWidth="1.5" />

              {/* class hull guides */}
              <path
                d="M95 255 Q145 150 245 165 Q315 185 340 140 Q300 270 160 275 Z"
                fill="#f5f5f5"
                stroke="#d4d4d8"
                strokeWidth="1.5"
              />
              <path
                d="M410 185 Q455 70 530 95 Q610 110 625 170 Q555 210 450 205 Z"
                fill="#ecfdf5"
                stroke="#a7f3d0"
                strokeWidth="1.5"
              />

              {/* labels */}
              <text x="165" y="120" fontSize="18" fill="#737373" fontWeight="600">
                C₁
              </text>
              <text x="520" y="62" fontSize="18" fill="#047857" fontWeight="600">
                C₂
              </text>

              {/* class 1 points */}
              {pts1.map((p, i) => (
                <circle key={`c1-${i}`} cx={p.x} cy={p.y} r="6.5" fill="#111827" opacity="0.9" />
              ))}

              {/* class 2 points */}
              {pts2.map((p, i) => (
                <circle key={`c2-${i}`} cx={p.x} cy={p.y} r="6.5" fill="#059669" opacity="0.9" />
              ))}

              {/* selected points */}
              <circle cx={pkPrime.x} cy={pkPrime.y} r="11" fill="white" stroke="#111827" strokeWidth="3" />
              <circle cx={pkBis.x} cy={pkBis.y} r="11" fill="white" stroke="#111827" strokeWidth="3" />

              <text x={pkPrime.x - 18} y={pkPrime.y - 18} fontSize="16" fill="#111827" fontWeight="600">
                p′ₖ
              </text>
              <text x={pkBis.x - 8} y={pkBis.y + 30} fontSize="16" fill="#111827" fontWeight="600">
                p″ₖ
              </text>

              {/* transfer arrow p' -> p'' */}
              <defs>
                <marker
                  id="arrow-dark"
                  markerWidth="10"
                  markerHeight="10"
                  refX="8"
                  refY="5"
                  orient="auto"
                >
                  <path d="M0,0 L10,5 L0,10 z" fill="#111827" />
                </marker>
                <marker
                  id="arrow-emerald"
                  markerWidth="10"
                  markerHeight="10"
                  refX="8"
                  refY="5"
                  orient="auto"
                >
                  <path d="M0,0 L10,5 L0,10 z" fill="#059669" />
                </marker>
              </defs>

              <line
                x1={pkPrime.x + 10}
                y1={pkPrime.y + 8}
                x2={pkBis.x - 10}
                y2={pkBis.y - 8}
                stroke="#111827"
                strokeWidth="2.5"
                strokeDasharray="7 5"
                markerEnd="url(#arrow-dark)"
              />

              {/* x_k and xhat */}
              <circle cx={xk.x} cy={xk.y} r="8" fill="#2563eb" />
              <circle cx={xhat.x} cy={xhat.y} r="8" fill="#059669" />
              <text x={xk.x - 18} y={xk.y - 15} fontSize="16" fill="#2563eb" fontWeight="600">
                xₖ
              </text>
              <text x={xhat.x - 24} y={xhat.y + 26} fontSize="16" fill="#059669" fontWeight="600">
                x̂ₖ
              </text>

              {/* trajectory segment */}
              <line
                x1={xk.x}
                y1={xk.y}
                x2={xhat.x}
                y2={xhat.y}
                stroke="#059669"
                strokeWidth="3"
                markerEnd="url(#arrow-emerald)"
              />

              <text x={xhat.x + 18} y={xhat.y - 6} fontSize="15" fill="#059669" fontWeight="600">
                xₖ(t)
              </text>

              {/* moving point along xk -> xhat */}
              <motion.circle
                cx={xk.x}
                cy={xk.y}
                r="7"
                fill="#10b981"
                animate={{
                  cx: [xk.x, xhat.x, xk.x],
                  cy: [xk.y, xhat.y, xk.y],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* w_k direction note */}
              <text x="72" y="322" fontSize="14" fill="#737373">
                перенос массы внутри C₁
              </text>
            </svg>
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Допустимая траектория
              </div>
              <MBlock
                className="text-[1.12em]"
                math={String.raw`
                  x_k(t)=x_k-t\,u_k'(p_k'-p_k''), \qquad t\in[0,1]
                `}
              />
              <MBlock
                className="text-[1.12em]"
                math={String.raw`
                  w_k(t)=w_k-t\,u_k'(p_k'-p_k'')
                `}
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Минимизация на отрезке
              </div>
              <MBlock
                className="text-[1.08em]"
                math={String.raw`
                  \|w_k(t)\|^2
                  =
                  \|w_k\|^2
                  -2t\,u_k'\Delta_k
                  +t^2 (u_k')^2 \|p_k'-p_k''\|^2
                `}
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Выбор шага
              </div>
              <MBlock
                className="text-[1.12em]"
                math={String.raw`
                  \hat t_k=
                  \frac{\Delta_k}{u_k' \|p_k'-p_k''\|^2},
                  \qquad
                  t_k=\min\{1,\hat t_k\}
                `}
              />
              <MBlock
                className="text-[1.12em]"
                math={String.raw`
                  w_{k+1}=w_k(t_k)
                `}
              />
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-7 py-5 shadow-sm">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Интерпретация
          </div>
          <p className="text-[19px] leading-8 text-emerald-950">
            На \(k\)-й итерации часть коэффициента переносится от{" "}
            <MInline math={String.raw`p_k'`} /> к <MInline math={String.raw`p_k''`} />.
            Это задаёт допустимое движение точки <MInline math={String.raw`x_k(t)`} /> внутри{" "}
            <MInline math={String.raw`C_1`} /> и индуцированную траекторию{" "}
            <MInline math={String.raw`w_k(t)`} />, на которой выбирается план минимальной нормы.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}