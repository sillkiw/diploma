import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMOptimalityCriterionSlide() {
  return (
    <SlideShell title="Критерий оптимальности">
      <div className="flex h-full flex-col justify-center gap-10">
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Оценка отклонения
          </div>

          <p className="text-[20px] leading-8 text-neutral-700">
            Если <MInline math={String.raw`w^*`} /> — оптимальное решение, то
            отклонение текущего плана оценивается через{" "}
            <MInline math={String.raw`\Delta(u)`} />.
          </p>

          <MBlock
            math={String.raw`
              \|w-w^*\|^2 \le 2\Delta(u)
            `}
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Критерий оптимальности
          </div>

          <MBlock
            math={String.raw`
              \Delta(u)=0
              \iff
              w \text{ является решением задачи}
            `}
          />

          <p className="text-[20px] leading-8 text-neutral-700">
            Таким образом, величина <MInline math={String.raw`\Delta(u)`} /> служит
            мерой неоптимальности и одновременно критерием остановки метода.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}