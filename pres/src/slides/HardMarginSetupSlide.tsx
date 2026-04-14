import { SlideShell } from "../components/SlideShell";
import { MBlock} from "../components/Math";

export function HardMarginSetupSlide() {
  return (
    <SlideShell
      title="Постановка задачи линейной классификации"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-10">
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Обучающая выборка
          </div>

          <MBlock math={String.raw`(p_j,\xi_j),\qquad j=1,\dots,m`} />
          <MBlock math={String.raw`p_j \in \mathbb{R}^n,\qquad \xi_j \in \{-1,+1\}`} />
        </div>

    

        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-5 shadow-sm">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Цель
          </div>
          <p className="text-[18px] leading-7 text-emerald-950">
            Требуется построить линейное правило, разделяющее объекты двух
            классов.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}