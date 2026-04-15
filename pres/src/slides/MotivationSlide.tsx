import { useEffect, useMemo, useState } from "react";
import { SlideShell } from "../components/SlideShell";
import { MInline } from "../components/Math";

type Point = readonly [number, number];

function cross(o: Point, a: Point, b: Point): number {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

function convexHull(points: readonly Point[]): Point[] {
  if (points.length <= 1) return [...points];

  const sorted = [...points].sort((p1, p2) => {
    if (p1[0] !== p2[0]) return p1[0] - p2[0];
    return p1[1] - p2[1];
  });

  const lower: Point[] = [];
  for (const p of sorted) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    ) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper: Point[] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    ) {
      upper.pop();
    }
    upper.push(p);
  }

  lower.pop();
  upper.pop();

  return [...lower, ...upper];
}

function hullPath(points: readonly Point[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) {
    const [x, y] = points[0];
    return `M ${x} ${y}`;
  }

  const hull = convexHull(points);
  return hull.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ") + " Z";
}

function DownArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-neutral-700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnimatedClassificationScene({
  startAutomatically = false,
}: {
  startAutomatically?: boolean;
}) {
  const leftMarginX = 330;
  const centerX = 390;
  const rightMarginX = 450;

  const blue = useMemo(
    () =>
      [
        [140, 300],
        [175, 235],
        [210, 355],
        [245, 255],
        [280, 320],
        [330, 220],
        [330, 315],
      ] as const satisfies readonly Point[],
    []
  );

  const red = useMemo(
    () =>
      [
        [450, 185],
        [450, 300],
        [560, 165],
        [610, 235],
        [650, 195],
        [685, 285],
        [620, 355],
      ] as const satisfies readonly Point[],
    []
  );

  const supportBlueIdx = useMemo(() => [5, 6], []);
  const supportRedIdx = useMemo(() => [0, 1], []);

  const trialLines = useMemo(
    () =>
      [
        { x1: 260, y1: 110, x2: 560, y2: 400 },
        { x1: 285, y1: 92, x2: 525, y2: 395 },
        { x1: 305, y1: 80, x2: 470, y2: 395 },
        { x1: 275, y1: 165, x2: 575, y2: 325 },
        { x1: 318, y1: 70, x2: 430, y2: 395 },
      ] as const,
    []
  );

  const stageLabels = [
    "",
    "1. Формируем геометрию классов",
    "2. Пробуем первое разделение",
    "3. Улучшаем положение гиперплоскости",
    "4. Рассматриваем ещё одно допустимое разделение",
    "5. Выделяем оптимальное разделение",
    "6. Показываем опорные точки",
    "7. Финальная геометрическая картина",
  ] as const;

  const blueHull = useMemo(() => hullPath(blue), [blue]);
  const redHull = useMemo(() => hullPath(red), [red]);

  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const maxStep = 7;

  useEffect(() => {
    if (startAutomatically && step === 0 && !isPlaying) {
      setIsPlaying(true);
    }
  }, [startAutomatically, step, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    if (step >= maxStep) {
      setIsPlaying(false);
      return;
    }

    const id = window.setTimeout(() => {
      setStep((s) => Math.min(s + 1, maxStep));
    }, 1900);

    return () => window.clearTimeout(id);
  }, [isPlaying, step]);

  return (
    <div className="relative w-full">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-neutral-500">
          {step > 0
            ? stageLabels[step]
            : startAutomatically
              ? "Запуск анимации..."
              : "Сначала откройте карточки справа"}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setStep(0);
              setIsPlaying(true);
            }}
            className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50"
          >
            Replay
          </button>
        </div>
      </div>

      <svg
        viewBox="0 0 820 500"
        className="w-full rounded-xl bg-white"
        role="img"
        aria-label="Иллюстрация идеи максимального зазора для линейно разделимых классов"
      >
        <rect x="0" y="0" width="820" height="500" fill="#fcfcfb" />

        <g opacity="0.08">
          {Array.from({ length: 18 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1="70"
              y1={50 + i * 22}
              x2="770"
              y2={50 + i * 22}
              stroke="#475569"
              strokeWidth="0.8"
            />
          ))}
          {Array.from({ length: 28 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={70 + i * 25}
              y1="50"
              x2={70 + i * 25}
              y2="430"
              stroke="#475569"
              strokeWidth="0.8"
            />
          ))}
        </g>

        <g opacity="0.92">
          <line x1="70" y1="430" x2="770" y2="430" stroke="#334155" strokeWidth="2.2" />
          <polygon points="764,425 774,430 764,435" fill="#334155" />
          <line x1="70" y1="430" x2="70" y2="50" stroke="#334155" strokeWidth="2.2" />
          <polygon points="65,56 70,46 75,56" fill="#334155" />

          <text
            x="780"
            y="436"
            fontSize="16"
            fill="#334155"
            fontFamily="serif"
            fontStyle="italic"
          >
            x₁
          </text>
          <text
            x="57"
            y="45"
            fontSize="16"
            fill="#334155"
            textAnchor="end"
            fontFamily="serif"
            fontStyle="italic"
          >
            x₂
          </text>
        </g>

        {step >= 1 && (
          <g style={{ animation: "fadeIn 0.8s ease-out both" }}>
            <path d={blueHull} fill="#dbeafe" stroke="#60a5fa" strokeWidth="2.2" opacity="0.9" />
            <path d={redHull} fill="#fee2e2" stroke="#f87171" strokeWidth="2.2" opacity="0.9" />
          </g>
        )}

        {step >= 1 && (
          <g style={{ animation: "fadeIn 0.8s ease-out both" }}>
            <text x="160" y="190" fontSize="20" fill="#1d4ed8" fontFamily="serif">
              conv P₁
            </text>
            <text x="590" y="148" fontSize="20" fill="#b91c1c" fontFamily="serif">
              conv P₂
            </text>
          </g>
        )}

        {step >= 2 && step <= 4 && (
          <g opacity="0.68">
            <line
              x1={trialLines[step - 2].x1}
              y1={trialLines[step - 2].y1}
              x2={trialLines[step - 2].x2}
              y2={trialLines[step - 2].y2}
              stroke="#c68a2b"
              strokeWidth="3"
              strokeDasharray="10 8"
              style={{ animation: "drawStroke 0.95s ease-out both" }}
            />
          </g>
        )}

        {step >= 5 && (
          <g opacity="0.28" style={{ animation: "fadeIn 0.7s ease-out both" }}>
            {trialLines.map((line, idx) => (
              <line
                key={`trial-${idx}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#c68a2b"
                strokeWidth="2.4"
                strokeDasharray="8 7"
              />
            ))}
          </g>
        )}

        {step >= 5 && (
          <g>
            <line
              x1={leftMarginX}
              y1="50"
              x2={leftMarginX}
              y2="430"
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="10 8"
              style={{ animation: "drawVertical 0.75s ease-out both" }}
            />

            <line
              x1={rightMarginX}
              y1="50"
              x2={rightMarginX}
              y2="430"
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="10 8"
              style={{ animation: "drawVertical 0.75s ease-out 0.12s both" }}
            />

            <line
              x1={centerX}
              y1="50"
              x2={centerX}
              y2="430"
              stroke="#0f172a"
              strokeWidth="4"
              style={{ animation: "drawVertical 0.75s ease-out 0.24s both" }}
            />
          </g>
        )}

        {step >= 5 && (
          <g style={{ animation: "fadeIn 0.7s ease-out both" }}>
            <text x="488" y="82" fontSize="22" fill="#059669" fontWeight="600">
              maximum margin
            </text>
          </g>
        )}

        {blue.map(([x, y], i) => {
          const isSupport = supportBlueIdx.includes(i);

          return (
            <circle
              key={`b-${i}`}
              cx={x}
              cy={y}
              r={isSupport && step >= 6 ? 13 : 11}
              fill="#2563eb"
              stroke={isSupport && step >= 6 ? "#059669" : "#1e40af"}
              strokeWidth={isSupport && step >= 6 ? 3 : 2}
              style={{
                animation: `fadeInScale 0.55s ease-out ${i * 0.1}s both`,
              }}
            />
          );
        })}

        {red.map(([x, y], i) => {
          const isSupport = supportRedIdx.includes(i);

          return (
            <circle
              key={`r-${i}`}
              cx={x}
              cy={y}
              r={isSupport && step >= 6 ? 13 : 11}
              fill="#dc2626"
              stroke={isSupport && step >= 6 ? "#059669" : "#991b1b"}
              strokeWidth={isSupport && step >= 6 ? 3 : 2}
              style={{
                animation: `fadeInScale 0.55s ease-out ${(i + blue.length) * 0.1}s both`,
              }}
            />
          );
        })}

        {step >= 6 && (
          <g style={{ animation: "fadeIn 0.7s ease-out both" }}>
            <text
              x="410"
              y="452"
              fontSize="15"
              fill="#047857"
              textAnchor="middle"
              fontFamily="serif"
            >
              опорные точки лежат на границах разделяющей полосы
            </text>
          </g>
        )}

        {step >= 7 && (
          <g style={{ animation: "fadeInUp 0.7s ease-out both" }}>
            <text
              x="410"
              y="478"
              fontSize="15"
              fill="#166534"
              textAnchor="middle"
              fontFamily="serif"
            >
              среди всех допустимых разделений выбирается гиперплоскость с максимальным зазором
            </text>
          </g>
        )}
      </svg>

      <div className="absolute bottom-2 right-4 flex gap-1.5">
        {Array.from({ length: maxStep }, (_, idx) => idx + 1).map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= i ? "w-4 bg-emerald-500" : "w-1.5 bg-neutral-300"
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.72);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes drawStroke {
          from {
            stroke-dashoffset: 120;
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 0.65;
          }
        }

        @keyframes drawVertical {
          from {
            opacity: 0;
            stroke-dashoffset: 380;
          }
          to {
            opacity: 1;
            stroke-dashoffset: 0;
          }
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateX(28px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

type InfoCard = {
  text: React.ReactNode;
  accent?: "default" | "success";
};
export function MotivationSlide() {
  const cards: InfoCard[] = [
    {
      text: (
        <>
          Рассматриваются два линейно разделимых класса в пространстве{" "}
          <MInline math={String.raw`\mathbb{R}^2`} />.
        </>
      ),
      accent: "default",
    },
    {
      text: (
        <>
          Для таких данных существует не одна, а множество допустимых
          разделяющих гиперплоскостей.
        </>
      ),
      accent: "default",
    },
    {
      text: (
        <>
          Требуется выбрать не произвольное разделение, а гиперплоскость с
          максимальным зазором между классами.
        </>
      ),
      accent: "success",
    },
  ];

  const [visibleCards, setVisibleCards] = useState(0);
  const [startGraph, setStartGraph] = useState(false);

  const allCardsVisible = visibleCards >= cards.length;

  const handleNextCard = () => {
    if (allCardsVisible) return;

    const next = visibleCards + 1;
    setVisibleCards(next);

    if (next >= cards.length) {
      window.setTimeout(() => {
        setStartGraph(true);
      }, 450);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        handleNextCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visibleCards, allCardsVisible]);

  return (
    <SlideShell title="Линейная классификация">
      <div className="grid h-full grid-cols-[1.2fr_0.8fr] items-start gap-8">
        <AnimatedClassificationScene startAutomatically={startGraph} />

        <div className="relative mt-2 flex min-h-[520px] flex-col gap-4">
          {cards.slice(0, visibleCards).map((card, idx) => {
            const isSuccess = card.accent === "success";

            return (
              <div
                key={idx}
                className={[
                  "rounded-[28px] px-6 py-5 shadow-sm",
                  isSuccess
                    ? "border border-emerald-200 bg-emerald-50"
                    : "border border-neutral-200 bg-white",
                ].join(" ")}
                style={{ animation: "cardIn 0.55s ease-out both" }}
              >
                <p
                  className={[
                    "text-[18px] leading-7",
                    isSuccess ? "text-emerald-950" : "text-neutral-700",
                  ].join(" ")}
                >
                  {card.text}
                </p>
              </div>
            );
          })}

          <div className="mt-auto flex justify-center pt-2">
            <button
              type="button"
              onClick={handleNextCard}
              disabled={allCardsVisible}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50 disabled:cursor-default disabled:opacity-35"
              aria-label="Показать следующую карточку"
            >
              <DownArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}