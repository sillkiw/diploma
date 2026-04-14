import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMReductionSlide() {
  return (
    <SlideShell
      title="Эквивалентная форма задачи"
      
    >
      <div className="flex h-full flex-col justify-center gap-8">
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Разность двух точек оболочек
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
            Введение меток классов
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
            Матричная запись
          </div>
          <MBlock
            math={String.raw`
              A = \bigl[\xi_1 p_1,\dots,\xi_m p_m\bigr],
              \qquad
              w = \sum_{j=1}^{m} u_j \xi_j p_j = Au
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
              w = Au,\quad u \in U
            `}
          />
        </div>

        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-7 py-5 shadow-sm">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Интерпретация
          </div>
          <p className="text-[20px] leading-8 text-emerald-950">
            Тем самым задача поиска ближайших точек выпуклых оболочек сводится к
            минимизации нормы вектора <MInline math={String.raw`w=Au`} /> по
            допустимым коэффициентам <MInline math={String.raw`u`} />.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}