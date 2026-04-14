import { SlideShell } from "../components/SlideShell";
import { MBlock } from "../components/Math";

export function HardMarginMarginSlide() {
  return (
    <SlideShell
      title="Разделяющая полоса"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-8">
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Центральная гиперплоскость
          </div>
          <MBlock math={String.raw`\langle w,x\rangle + \beta = 0`} />
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Границы полосы
          </div>
          <MBlock math={String.raw`\langle w,x\rangle + \beta = 1`} />
          <MBlock math={String.raw`\langle w,x\rangle + \beta = -1`} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-[28px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Смысл
            </div>
            <p className="text-[18px] leading-7 text-neutral-700">
              После канонической нормировки ближайшие к разделяющей
              гиперплоскости точки лежат на этих двух границах.
            </p>
          </div>

          <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-5 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Опорные векторы
            </div>
            <p className="text-[18px] leading-7 text-emerald-950">
              Точки, для которых достигается равенство, определяют положение
              оптимальной гиперплоскости.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}