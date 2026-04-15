import { SlideShell } from "../components/SlideShell";
import { MInline } from "../components/Math";

export function MDMMetricGeometrySlide() {
  return (
    <SlideShell title="Геометрия решения">
      <div className="flex h-full flex-col justify-center gap-5">
        
        
        <div className="rounded-[26px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Косинус между нормалями
          </div>

          <div className="text-[18px] leading-7 text-neutral-700">
            Сравниваются нормали гиперплоскостей MDM и SVM.
          </div>

          {/* Формула как отдельный блок */}
          <div className="my-3 flex justify-center">
            <div className="rounded-[18px] bg-neutral-50 px-5 py-3">
              <span className="text-[22px]">
                <MInline
                  math={String.raw`
                  \frac{\langle w_{\mathrm{MDM}},\, w_{\mathrm{SVM}} \rangle}
                  {\|w_{\mathrm{MDM}}\|\,\|w_{\mathrm{SVM}}\|}
                  `}
                />
              </span>
            </div>
          </div>

          <div className="text-[18px] leading-7 text-neutral-700">
            Значение, близкое к 1, означает совпадение направлений нормалей.
          </div>
        </div>

        <div className="rounded-[26px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Ширина разделяющей полосы
          </div>
          <div className="text-[18px] leading-7 text-neutral-700">
            Для линейного SVM определяется как{" "}
            <MInline math={String.raw`\frac{2}{\|w\|}`} />.
            <br />
            Позволяет сравнить не только направление, но и масштаб решения.
          </div>
        </div>
      </div>
    </SlideShell>
  );
}