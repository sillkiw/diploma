import { SlideShell } from "../components/SlideShell";
import { MBlock} from "../components/Math";

export function MDMMatrixFormSlide() {
  return (
    <SlideShell
      title="Матричная форма задачи"
    >
      <div className="flex h-full flex-col justify-center gap-8">
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Матрица A
          </div>
          <MBlock
            math={String.raw`
              A = [\xi_1 p_1,\dots,\xi_m p_m]
            `}
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Компактная запись
          </div>
          <MBlock
            math={String.raw`
              w = Au,\qquad u\in U
            `}
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Эквивалентная задача
          </div>
          <MBlock
            math={String.raw`
              \frac{1}{2}\|w\|^2 \to \min,
              \qquad
              w = Au,\quad u\in U
            `}
          />
        </div>
      </div>
    </SlideShell>
  );
}