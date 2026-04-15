import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMVectorFormSlide() {
  return (
    <SlideShell title="Переход к вектору w">
      <div className="flex h-full flex-col justify-center gap-8">
        <div className="space-y-5">
          <MBlock
            math={String.raw`
              w = w_1 - w_2
              = \sum_{j=1}^{s} u_j p_j - \sum_{j=s+1}^{m} u_j p_j
            `}
          />

          <MBlock
            math={String.raw`
              \xi_j =
              \begin{cases}
                1, & j=1,\dots,s,\\
               -1, & j=s+1,\dots,m
              \end{cases}
              \qquad \Longrightarrow \qquad
              w = \sum_{j=1}^{m} u_j \xi_j p_j
            `}
          />
        </div>
           <p className="text-[20px] leading-8 text-neutral-700">
  Метки <MInline math={String.raw`\xi_j`} /> кодируют принадлежность точки к
  множествам <MInline math={String.raw`P_1`} /> и{" "}
  <MInline math={String.raw`P_2`} />.
</p>    
     
      </div>
    </SlideShell>
  );
}