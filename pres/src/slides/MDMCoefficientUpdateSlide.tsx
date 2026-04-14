import { SlideShell } from "../components/SlideShell";
import { MBlock} from "../components/Math";

export function MDMCoefficientUpdateSlide() {
  return (
    <SlideShell
      title="Обновление коэффициентов"
    
    >
      <div className="flex h-full flex-col justify-center gap-8">
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Обозначение
          </div>
          <MBlock
            math={String.raw`
              u_k' = u_k[j_k']
            `}
          />
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Формула обновления
          </div>
          <MBlock
            math={String.raw`
              u_{k+1}[j]=
              \begin{cases}
              u_k[j], & j\neq j_k',\, j\neq j_k'',\\[4pt]
              (1-t_k)\,u_k[j_k'], & j=j_k',\\[4pt]
              u_k[j_k'']+t_k\,u_k[j_k'], & j=j_k''
              \end{cases}
            `}
          />
        </div>

       
      </div>
    </SlideShell>
  );
}