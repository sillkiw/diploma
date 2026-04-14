import { SlideShell } from "../components/SlideShell";
import { MBlock} from "../components/Math";

export function MDMStepTrajectorySlide() {
  return (
    <SlideShell title="Переход к следующему приближению">
      <div className="flex h-full flex-col justify-center gap-8">
        <div className="space-y-5">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Отрезок в C₁
          </div>

          <MBlock
            math={String.raw`
              x_k(t)=x_k+t(\hat x_k-x_k)
              =
              x_k-t\,u_k'(p_k'-p_k''),
              \qquad t\in[0,1]
            `}
          />
        </div>

        <div className="space-y-5">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Траектория
          </div>

          <MBlock
            math={String.raw`
              w_k(t)=x_k(t)-y_k
              =
              w_k-t\,u_k'(p_k'-p_k'')
            `}
          />
        </div>

        <div className="space-y-5">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Выбор следующего шага
          </div>

          <MBlock
            math={String.raw`
              \|w_k(t_k)\|^2
              =
              \min_{t\in[0,1]} \|w_k(t)\|^2
            `}
          />

          <MBlock
            math={String.raw`
              w_{k+1}=w_k(t_k)
            `}
          />
        </div>

   
      </div>
    </SlideShell>
  );
}