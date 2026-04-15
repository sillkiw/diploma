import { SlideShell } from "../components/SlideShell";
import { MBlock } from "../components/Math";

export function MDMStepChoiceSlide() {
  return (
    <SlideShell title="Выбор шага">
      <div className="flex h-full flex-col justify-center gap-6">
        <div className="space-y-5">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Минимизация по параметру t
          </div>

          <MBlock
            className="text-[1.08em]"
            math={String.raw`
              \|w_k(t)\|^2
              =
              \|w_k\|^2
              -2t\,u_k'\Delta_k
              +t^2 (u_k')^2 \|p_k'-p_k''\|^2
            `}
          />

          <MBlock
            className="text-[1.08em]"
            math={String.raw`
              \hat t_k=
              \frac{\Delta_k}{u_k' \|p_k'-p_k''\|^2}
            `}
          />

          <MBlock
            className="text-[1.08em]"
            math={String.raw`
              t_k=\min\{1,\hat t_k\},
              \qquad
              w_{k+1}=w_k(t_k)
            `}
          />
        </div>
      </div>
    </SlideShell>
  );
}