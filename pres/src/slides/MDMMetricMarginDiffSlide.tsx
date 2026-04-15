import { SlideShell } from "../components/SlideShell";
import { MInline } from "../components/Math";

export function MDMMetricMarginDiffSlide() {
  return (
    <SlideShell title="Разность ширины разделяющей полосы">
      <div className="flex h-full flex-col justify-center gap-5">
       
        <div className="rounded-[26px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Определение метрики
          </div>

          <div className="text-[18px] leading-7 text-neutral-700">
            Сравнивается ширина разделяющей полосы для нормали,
            восстановленной из MDM, и нормали, найденной SVM.
          </div>

          <div className="my-3 flex justify-center">
          
              <span className="text-[22px]">
                <MInline
                  math={String.raw`
                    \left|
                    \frac{2}{\|\widetilde w_{\mathrm{MDM}}\|}
                    -
                    \frac{2}{\|w_{\mathrm{SVM}}\|}
                    \right|
                  `}
                />
              </span>
            
          </div>

          <div className="text-[18px] leading-7 text-neutral-700">
            Здесь{" "}
            <MInline math="\widetilde w_{\mathrm{MDM}}" />
            {" "}— нормаль, восстановленная из решения MDM, а{" "}
            <MInline math="w_{\mathrm{SVM}}" />
            {" "}— нормаль, найденная методом SVM.
          </div>
        </div>

        <div className="rounded-[26px] border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 px-6 py-5 shadow-sm">
          <div className="text-[18px] leading-7 text-neutral-700">
            Малое значение метрики означает, что после восстановления нормали
            метод MDM даёт практически ту же ширину margin, что и SVM.
          </div>
        </div>
      </div>
    </SlideShell>
  );
}