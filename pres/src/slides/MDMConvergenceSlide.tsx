import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMConvergenceSlide() {
  return (
    <SlideShell
      title="Сходимость метода"
      subtitle="Последовательность приближений сходится к оптимальному решению"
    >
      <div className="flex h-full flex-col justify-center gap-8">
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Уменьшение функционала
          </div>
          <MBlock
            math={String.raw`
              \|w_k\|^2 - \|w_{k+1}\|^2 \ge \frac{\Delta_k^2}{D^2}
            `}
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Следствие
          </div>
          <MBlock
            math={String.raw`
              \Delta_k \to 0
            `}
          />
          <MBlock
            math={String.raw`
              w_k \to w^*
            `}
          />
        </div>

        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-7 py-5 shadow-sm">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Смысл результата
          </div>
          <p className="text-[20px] leading-8 text-emerald-950">
            Обобщённый MDM-метод строит последовательность допустимых планов,
            которая сходится к оптимальному вектору{" "}
            <MInline math={String.raw`w^*`} />.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}