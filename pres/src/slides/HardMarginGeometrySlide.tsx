import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function HardMarginGeometrySlide() {
  return (
    <SlideShell
      title="Условие линейной разделимости"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-8">
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Разделяющая гиперплоскость и условие разделимости
          </div>

          <MBlock math={String.raw`\langle w,p\rangle + \beta = 0`} />
          <MBlock
            math={String.raw`\xi_j\big(\langle w,p_j\rangle + \beta\big) > 0,\qquad j=1,\dots,m`}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-[28px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Параметры
            </div>
            <p className="text-[18px] leading-7 text-neutral-700">
              <MInline math={String.raw`w`} /> — вектор нормали к гиперплоскости,{" "}
              <MInline math={String.raw`\beta`} /> — её смещение.
            </p>
          </div>

          <div className="rounded-[28px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Смысл условия
            </div>
            <p className="text-[18px] leading-7 text-neutral-700">
              Все объекты обоих классов должны лежать по правильную сторону от
              разделяющей гиперплоскости.
            </p>
          </div>
        </div>

     
      </div>
    </SlideShell>
  );
}