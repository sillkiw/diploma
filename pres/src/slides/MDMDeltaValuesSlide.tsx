import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMDeltaValuesSlide() {
  return (
    <SlideShell title="Вычисление величин Δ">
      <div className="flex h-full flex-col justify-center gap-6">
        <p className="max-w-5xl text-[20px] leading-8 text-neutral-700">
          После выбора индексов вычисляются величины, характеризующие, в каком
          из двух классов перенос коэффициента даёт наибольшее улучшение.
        </p>

  <div className="space-y-4">
  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
    Определения
  </div>





  <MBlock
    math={String.raw`
      \Delta_1(u_k)
      =
      \langle p_{j_k'},w_k\rangle
      -
      \langle p_{j_k''},w_k\rangle
      =
      \langle p_{j_k'}-p_{j_k''},\,w_k\rangle
    `}
  />



  <MBlock
    math={String.raw`
      \Delta_2(u_k)
      =
      \langle p_{l_k'},-w_k\rangle
      -
      \langle p_{l_k''},-w_k\rangle
      =
      \langle p_{l_k'}-p_{l_k''},\,-w_k\rangle
    `}
  />

  <MBlock
    math={String.raw`
      \Delta(u_k)=\max\{\Delta_1(u_k),\Delta_2(u_k)\}
    `}
  />
</div>

      
          
<p className="text-[20px] leading-8 text-emerald-950">
  Если <MInline math={String.raw`\Delta(u_k)=0`} />, то текущий план уже
  является оптимальным и алгоритм завершается.
  <br />
  Если <MInline math={String.raw`\Delta(u_k)=\Delta_1(u_k)`} />, то перенос
  выполняется внутри <MInline math={String.raw`C_1`} />.
  <br />
  Если <MInline math={String.raw`\Delta(u_k)=\Delta_2(u_k)`} />, то перенос
  выполняется внутри <MInline math={String.raw`C_2`} />.
</p>
      
      </div>
    </SlideShell>
  );
}