import { SlideShell } from "../components/SlideShell";
import { MBlock } from "../components/Math";

export function MDMStepChoiceSlide() {
  return (
    <SlideShell
      title="Выбор шага"
    
    >
      <div className="flex h-full flex-col justify-center gap-8">
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Квадратичная зависимость
          </div>
          <MBlock
            className="text-[1.15em]"
            math={String.raw`
              \|w_k(t)\|^2
              =
              \|w_k\|^2
              -2t\,u_k'\Delta_k
              +t^2 (u_k')^2 \|p_k'-p_k''\|^2
            `}
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Точка минимума на ℝ
          </div>
          <MBlock
            className="text-[1.15em]"
            math={String.raw`
              \hat t_k=
              \frac{\Delta_k}{u_k' \|p_k'-p_k''\|^2}
            `}
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Допустимый шаг
          </div>
          <MBlock
            className="text-[1.15em]"
            math={String.raw`
              t_k=\min\{1,\hat t_k\}
            `}
          />
          <MBlock
            className="text-[1.15em]"
            math={String.raw`
              w_{k+1}=w_k(t_k)
            `}
          />
        </div>
      </div>
    </SlideShell>
  );
}