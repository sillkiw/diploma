import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function HardMarginWidthSlide() {
  return (
    <SlideShell
      title="Ширина зазора"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-8">
    

       <div>
  <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
    Расстояние до центральной гиперплоскости
  </div>

  <MBlock
    math={String.raw`\operatorname{dist}(x,\ \langle w,x\rangle+\beta=0)=\frac{|\langle w,x\rangle+\beta|}{\|w\|}`}
  />

  <MBlock
    math={String.raw`\langle w,x\rangle+\beta=\pm1 \;\Longrightarrow\; \operatorname{dist}=\frac{1}{\|w\|}`}
  />

  <p className="mt-2 text-lg leading-7 text-neutral-700">
    Следовательно, каждая из граничных гиперплоскостей находится на расстоянии{" "}
    <MInline math={String.raw`\frac{1}{\|w\|}`} /> от центральной.
  </p>
</div>

        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Ширина разделяющей полосы
          </div>
          <MBlock math={String.raw`\gamma=\frac{1}{\|w\|}+\frac{1}{\|w\|}=\frac{2}{\|w\|}`} />
               <MBlock math={String.raw`\max \gamma \quad \Longleftrightarrow \quad \min \|w\|^2`} />
        </div>

       
      </div>
    </SlideShell>
  );
}