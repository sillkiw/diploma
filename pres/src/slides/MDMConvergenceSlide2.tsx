import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMConvergenceSlide2() {
  return (
    <SlideShell title="Сходимость: завершение доказательства">
      <div className="flex h-full flex-col justify-center gap-4">
        <div className="rounded-[24px] border border-neutral-200 bg-white px-5 py-4 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Неусечённые итерации
          </div>
          <MBlock
            className="text-[0.98em]"
            math={String.raw`
              \|w_k\|^2-\|w_{k+1}\|^2
              \ge
              \frac{\Delta_k^2}{D^2}
            `}
          />
          <p className="mt-2 text-[16px] leading-6 text-neutral-700">
            Так как <MInline math={String.raw`\|w_k\|^2-\|w_{k+1}\|^2`} />
            {" "}стремится к нулю, то на неусечённых шагах
            {" "}<MInline math={String.raw`\Delta_k\to0`} />.
          </p>
        </div>

        <div className="rounded-[24px] border border-neutral-200 bg-white px-5 py-4 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Оценка расстояния до решения
          </div>
          <MBlock
            className="text-[0.98em]"
            math={String.raw`\|w_k-w^*\|^2\le 2\Delta_k`}
          />
          <p className="mt-2 text-[16px] leading-6 text-neutral-700">
            Отсюда из <MInline math={String.raw`\Delta_k\to0`} /> следует
            сходимость
          </p>
          <MBlock
            className="text-[1.02em]"
            math={String.raw`w_k\to w^*`}
          />
        </div>
      </div>
    </SlideShell>
  );
}