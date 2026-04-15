import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMBridgeSlide() {
  return (
    <SlideShell
      title="Обобщенный MDM-метод"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-5">
   

        <MBlock
          math={String.raw`
            P_1=\{p_j\}_{j=1}^{s}, \qquad
            P_2=\{p_j\}_{j=s+1}^{m}
          `}
        />

        <MBlock
          math={String.raw`
            C_1=\operatorname{conv}(P_1), \qquad
            C_2=\operatorname{conv}(P_2)
          `}
        />

        <div>
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Квадратичная задача математической диагностики
          </div>

          <MBlock
            math={String.raw`
              \min_{w_1\in C_1,\; w_2\in C_2}
              \frac{1}{2}\|w_1-w_2\|^2
            `}
          />
        </div>

   <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-6 py-4 shadow-sm">
  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
    Геометрический смысл
  </div>
  <p className="text-[17px] leading-7 text-emerald-950">
    Задача линейного разделения сводится к поиску минимального расстояния между{" "}
    <MInline math={String.raw`C_1`} /> и <MInline math={String.raw`C_2`} />, а
    вектор <MInline math={String.raw`w^*=w_1^*-w_2^*`} /> возникает как
    разность ближайших точек этих оболочек.
  </p>
</div>
      </div>
    </SlideShell>
  );
}