import { SlideShell } from "../components/SlideShell";
import { MBlock} from "../components/Math";

export function MDMStepC1Slide() {
  return (
    <SlideShell title="Перенос коэффициента">
      <div className="flex h-full flex-col justify-center gap-8">
        <div className="space-y-5">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Обозначения
          </div>

          <MBlock
            className="text-[1.25em]"
            math={String.raw`
              p_k' := p_{j_k'},
              \qquad
              p_k'' := p_{j_k''}
            `}
          />

          <MBlock
          className="text-[1.25em]"
            math={String.raw`
              \Delta(u_k)=\langle p_k'-p_k'',\,w_k\rangle
            `}
          />
        </div>

        <div className="space-y-5">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Разложение текущего плана
          </div>

          <MBlock
          className="text-[1.25em]"
            math={String.raw`
              w_k = x_k - y_k,
              \qquad
              x_k \in C_1,\; y_k \in C_2
            `}
          />
        </div>

        <div className="space-y-5">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Перенос коэффициента
          </div>

          <MBlock
          className="text-[1.25em]"
            math={String.raw`
              \hat x_k = x_k - u_k'(p_k'-p_k''),
              \qquad
              u_k' = u_k[j_k']
            `}
          />

       
        </div>
      </div>
    </SlideShell>
  );
}