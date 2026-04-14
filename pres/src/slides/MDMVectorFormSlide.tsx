import { SlideShell } from "../components/SlideShell";
import { MBlock} from "../components/Math";

export function MDMVectorFormSlide() {
  return (
    <SlideShell
      title="Переход к вектору w"
    >
      <div className="flex h-full flex-col justify-center gap-8">
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Разность двух точек
          </div>
          <MBlock
            math={String.raw`
              w = w_1 - w_2
              = \sum_{j=1}^{s} u_j p_j - \sum_{j=s+1}^{m} u_j p_j
            `}
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Введение меток
          </div>
          <MBlock
            math={String.raw`
              \xi_j =
              \begin{cases}
              1, & j=1,\dots,s,\\
              -1, & j=s+1,\dots,m
              \end{cases}
            `}
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Итоговая запись
          </div>
          <MBlock
            math={String.raw`
              w = \sum_{j=1}^{m} u_j \xi_j p_j
            `}
          />
        </div>

      </div>
    </SlideShell>
  );
}