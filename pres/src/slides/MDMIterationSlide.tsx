import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMIterationSlide() {
  return (
    <SlideShell
      title="Шаг обобщённого MDM-метода"
      subtitle="На каждой итерации выбирается направление, уменьшающее норму"
    >
      <div className="flex h-full flex-col justify-center gap-8">
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Текущее приближение
          </div>
          <MBlock
            math={String.raw`
              w_k = A u_k
            `}
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Выбор индексов
          </div>
          <MBlock
            math={String.raw`
              \Delta_k = \max\{\Delta_1(u_k),\Delta_2(u_k)\}
            `}
          />
          <MBlock
            math={String.raw`
              p_k',\,p_k''
              \text{ выбираются из условия максимального уменьшения}
            `}
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Обновление
          </div>
          <MBlock
            math={String.raw`
              w_k(t)=w_k \mp t\,u_k'(p_k'-p_k''), \qquad t\in[0,1]
            `}
          />
          <MBlock
            math={String.raw`
              \|w_k(t_k)\|^2=\min_{t\in[0,1]}\|w_k(t)\|^2,
              \qquad
              w_{k+1}=w_k(t_k)
            `}
          />
        </div>

        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-7 py-5 shadow-sm">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Интерпретация
          </div>
          <p className="text-[20px] leading-8 text-emerald-950">
            Метод переносит часть коэффициента от менее выгодной точки к более
            выгодной и тем самым уменьшает норму текущего вектора{" "}
            <MInline math={String.raw`w_k`} />.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}