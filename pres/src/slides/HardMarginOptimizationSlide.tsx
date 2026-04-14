import { SlideShell } from "../components/SlideShell";
import { MBlock} from "../components/Math";

export function HardMarginOptimizationSlide() {
  return (
    <SlideShell
      title="Постановка hard-margin SVM"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-8">
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Оптимизационная задача
          </div>
          <MBlock math={String.raw`\min_{w,\beta}\frac{1}{2}\|w\|^2`} />
          <MBlock
            math={String.raw`\xi_j\big(\langle w,p_j\rangle + \beta\big)\ge 1,\qquad j=1,\dots,m`}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-[28px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Ограничения
            </div>
            <p className="text-[18px] leading-7 text-neutral-700">
              Все объекты обучающей выборки должны удовлетворять каноническому
              условию разделимости.
            </p>
          </div>

          <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-5 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Цель
            </div>
            <p className="text-[18px] leading-7 text-emerald-950">
              Среди всех разделяющих гиперплоскостей выбирается гиперплоскость
              с максимальным зазором.
            </p>
          </div>
        </div>

        <div>
          <p className="text-[18px] leading-7 text-neutral-700">
            Тем самым hard-margin SVM сводится к задаче квадратичной
            оптимизации с линейными ограничениями.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}