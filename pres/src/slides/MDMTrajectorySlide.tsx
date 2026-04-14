import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMTrajectorySlide() {
  return (
    <SlideShell
      title="Допустимая траектория"
     
    >
      <div className="flex h-full flex-col justify-center gap-7">
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Перенос коэффициента
          </div>
          <MBlock
            className="text-[1.12em]"
            math={String.raw`
              \hat x_k = x_k - u_k'(p_k' - p_k'')
            `}
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Отрезок в C₁
          </div>
          <MBlock
            className="text-[1.12em]"
            math={String.raw`
              x_k(t)=x_k+t(\hat x_k-x_k), \qquad t\in[0,1]
            `}
          />
          <p className="text-[18px] leading-7 text-neutral-700">
            По выпуклости множества <MInline math={String.raw`C_1`} /> все точки
            отрезка <MInline math={String.raw`x_k(t)`} /> являются допустимыми.
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Индуцированная траектория
          </div>
          <MBlock
            className="text-[1.12em]"
            math={String.raw`
              w_k(t)=x_k(t)-y_k
            `}
          />
          <MBlock
            className="text-[1.12em]"
            math={String.raw`
              w_k(t)=w_k-t\,u_k'(p_k'-p_k'')
            `}
          />
        </div>

        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-5 shadow-sm">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Что изменяется на шаге
          </div>
          <div className="space-y-2 text-[18px] leading-7 text-emerald-950">
            <div>
              <MInline math={String.raw`u_k[j_k']`} /> уменьшается
            </div>
            <div>
              <MInline math={String.raw`u_k[j_k'']`} /> увеличивается
            </div>
            <div>
              <MInline math={String.raw`x_k`} /> переходит в{" "}
              <MInline math={String.raw`\hat x_k`} />
            </div>
            <div>
              <MInline math={String.raw`w_k`} /> переходит в семейство{" "}
              <MInline math={String.raw`w_k(t)`} />
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}