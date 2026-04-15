import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMStepDecisionSlide() {
  return (
    <SlideShell title="Переход после вычисления Δ">
      <div className="flex h-full flex-col justify-center gap-8">
        <MBlock
          className="text-[1.15em]"
          math={String.raw`
            \Delta_1(u_k)=\langle p_{j_k'}-p_{j_k''},\,w_k\rangle,
            \qquad
            \Delta_2(u_k)=\langle p_{l_k'}-p_{l_k''},\,-w_k\rangle
          `}
        />

        <MBlock
          className="text-[1.15em]"
          math={String.raw`
            \Delta(u_k)=\max\{\Delta_1(u_k),\,\Delta_2(u_k)\}
          `}
        />

        <div className="space-y-4 rounded-[24px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
          <p className="text-[20px] leading-8 text-neutral-700">
            <MInline math={String.raw`\Delta(u_k)=0`} /> 
            {" "}⇒ процесс завершён.
          </p>

          <p className="text-[20px] leading-8 text-neutral-700">
            <MInline math={String.raw`\Delta(u_k)>0`} /> 
            {" "}⇒ переходим к случаю максимума.
          </p>

          <p className="text-[20px] leading-8 text-neutral-700">
            Далее рассматриваем ветвь{" "}
            <MInline math={String.raw`\Delta(u_k)=\Delta_1(u_k)`} />.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}