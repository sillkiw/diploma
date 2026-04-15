import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function HardMarginOptimizationSlide() {
  return (
    <SlideShell
      title="Постановка hard-margin SVM"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-6">
        <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Оптимизационная задача
        </div>

        <MBlock math={String.raw`\min_{w,\beta}\frac{1}{2}\|w\|^2`} />

        <MBlock
          math={String.raw`\xi_j\big(\langle w,p_j\rangle + \beta\big)\ge 1,\qquad j=1,\dots,m`}
        />

        <div className="mt-2 grid grid-cols-2 gap-5">
          <div className="rounded-[24px] border border-neutral-200 bg-white px-5 py-4 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Ограничения
            </div>
            <p className="text-[17px] leading-7 text-neutral-700">
              Задают корректное разделение: все точки лежат по нужную сторону
              от границ полосы.
            </p>
          </div>

          <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Цель
            </div>
            <p className="text-[17px] leading-7 text-emerald-950">
              Минимизация <MInline math={String.raw`\|w\|^2`} /> выбирает
              гиперплоскость с максимальным зазором.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}