import { SlideShell } from "../components/SlideShell";
import { MInline } from "../components/Math";

export function MDMRecoveredNormalSlide() {
  return (
    <SlideShell title="Восстановление нормали">
      <div className="flex h-full flex-col justify-center items-center gap-6">
        <div className="text-[20px] text-neutral-600">
          Сначала в MDM находится вектор между ближайшими точками оболочек
        </div>

        
          <span className="text-[28px]">
            <MInline math={String.raw`w^* = w_1^* - w_2^*`} />
          </span>
        

        <div className="text-[20px] text-neutral-700">
          <MInline math={String.raw`w_1^* \in C_1`} />,{" "}
          <MInline math={String.raw`w_2^* \in C_2`} />
        </div>

        <div className="text-[18px] text-neutral-500">
          ближайшие точки выпуклых оболочек
        </div>

        <div className="text-[20px] text-neutral-600">
          Нормаль hard-margin SVM восстанавливается по формуле
        </div>

        
          <span className="text-[28px]">
            <MInline
              math={String.raw`
                w_{\mathrm{SVM}}=
                \frac{2w^*}{\|w^*\|^2}
              `}
            />
          </span>
        
      </div>
    </SlideShell>
  );
}