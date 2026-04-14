import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function HardMarginScaleSlide() {
  return (
    <SlideShell
      title="Проблема масштаба"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-8">
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Разделяющая гиперплоскость
          </div>
          <MBlock math={String.raw`\langle w,x\rangle + \beta = 0`} />
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Инвариантность масштаба
          </div>
          <MBlock
            math={String.raw`(w,\beta)\sim(\lambda w,\lambda\beta),\qquad \lambda>0`}
          />
          <p className="mt-2 text-lg leading-7 text-neutral-700">
            Пары <MInline math={String.raw`(w,\beta)`} /> и{" "}
            <MInline math={String.raw`(\lambda w,\lambda\beta)`} /> задают одну и
            ту же гиперплоскость.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-[28px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Следствие
            </div>
            <p className="text-[18px] leading-7 text-neutral-700">
              Условие
              <span className="mx-1">
                <MInline math={String.raw`\xi_j(\langle w,p_j\rangle+\beta)>0`} />
              </span>
              задаёт разделимость, но не фиксирует масштаб параметров.
            </p>
          </div>

          <div className="rounded-[28px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Проблема
            </div>
            <p className="text-[18px] leading-7 text-neutral-700">
              Без фиксации масштаба нельзя корректно сравнивать разные записи
              одной и той же гиперплоскости и минимизировать{" "}
              <MInline math={String.raw`\|w\|`} />.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}