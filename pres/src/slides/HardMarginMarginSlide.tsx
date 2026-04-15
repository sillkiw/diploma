import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function HardMarginMarginSlide() {
  return (
    <SlideShell
      title="Разделяющая полоса"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-6">
       
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Каноническая нормировка
          </div>
          <MBlock
            math={String.raw`
              \langle w,x\rangle + \beta = 0,
              \qquad
              \langle w,x\rangle + \beta = \pm 1
            `}
            className="text-[1.15em]"
          />
          <p className="mt-3 text-[17px] leading-7 text-neutral-700">
            Центральная гиперплоскость задаёт середину полосы, а две крайние
            гиперплоскости проходят через ближайшие точки классов.
          </p>
        

        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-[28px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Геометрический смысл
            </div>
            <p className="text-[17px] leading-7 text-neutral-700">
              После нормировки ближайшие точки удовлетворяют условиям{" "}
              <MInline math={String.raw`\langle w,x\rangle+\beta=\pm 1`} />.
            </p>
          </div>

          <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-5 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Опорные векторы
            </div>
            <p className="text-[17px] leading-7 text-emerald-950">
              Именно точки, лежащие на границах полосы, определяют положение
              оптимальной разделяющей гиперплоскости.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}