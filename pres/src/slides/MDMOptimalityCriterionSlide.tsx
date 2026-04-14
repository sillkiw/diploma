import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMOptimalityCriterionSlide() {
  return (
    <SlideShell
      title="Критерий оптимальности"
    >
     <div className="flex h-full flex-col justify-center gap-8">
  <div className="space-y-4">
    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
      Оценка отклонения
    </div>

    <p className="text-[20px] leading-8 text-neutral-700">
      Пусть <MInline math={String.raw`w^*`} /> — оптимальный план задачи.
    </p>

    <MBlock
      math={String.raw`
        \|w-w^*\|^2 \le 2\Delta(u)
      `}
    />
  </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Критерий
          </div>
          <MBlock
            math={String.raw`
              \Delta(u)=0
              \iff
              w=Au \text{ является решением задачи}
            `}
          />
        </div>

                <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-7 py-5 shadow-sm">
  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
    Интерпретация
  </div>
  <p className="text-[20px] leading-8 text-emerald-950">
    Величина <MInline math={String.raw`\Delta(u)`} /> является мерой
    неоптимальности текущего плана. Условие{" "}
    <MInline math={String.raw`\Delta(u)=0`} /> служит критерием остановки
    метода.
  </p>
</div>
      </div>
      
    </SlideShell>
  );
}