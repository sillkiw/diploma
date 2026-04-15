import { SlideShell } from "../components/SlideShell";
import { MBlock } from "../components/Math";

export function HardMarginWidthSlide() {
  return (
    <SlideShell
      title="Ширина зазора"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-5">
       
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Расстояние до центральной гиперплоскости
          </div>

          <MBlock
            className="text-[1.06em]"
            math={String.raw`
              \operatorname{dist}(x,\ \langle w,x\rangle+\beta=0)
              =
              \frac{|\langle w,x\rangle+\beta|}{\|w\|}
            `}
          />

          <MBlock
            className="text-[1.06em]"
            math={String.raw`
              \langle w,x\rangle+\beta=\pm1
              \;\Longrightarrow\;
              \operatorname{dist}=\frac{1}{\|w\|}
            `}
          />
     

      
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Ширина полосы
          </div>

          <MBlock
            className="text-[1.08em]"
            math={String.raw`
              \gamma
              =
              \frac{2}{\|w\|}
              \qquad
              \Longrightarrow
              \qquad
              \max \gamma \iff \min \|w\|
            `}
          />
        </div>
      
    </SlideShell>
  );
}