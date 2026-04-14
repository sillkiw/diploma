import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMBridgeSlide() {
  return (
    <SlideShell
      title="Обобщенный MDM-метод"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-8">
        <div className="space-y-5">
          <p className="text-[22px] leading-9 text-neutral-800">
            Пусть в пространстве <MInline math={String.raw`\mathbb{R}^n`} /> заданы
            два конечных множества
          </p>

          <MBlock
            math={String.raw`
              P_1=\{p_j\}_{j=1}^{s},
              \qquad
              P_2=\{p_j\}_{j=s+1}^{m},
              \qquad
              s\in 1:m-1
            `}
          />


          <MBlock
            math={String.raw`
              C_1=\operatorname{conv}(P_1),
              \qquad
              C_2=\operatorname{conv}(P_2)
            `}
          />
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Квадратичная задача математической диагностики
          </div>

          <MBlock
            math={String.raw`
              \min_{w_1\in C_1,\; w_2\in C_2}
              \frac{1}{2}\|w_1-w_2\|^2
            `}
          />
          <p className="text-[18px] leading-7 text-emerald-950">
  Тем самым задача линейного разделения сводится к поиску минимального
  расстояния между двумя выпуклыми оболочками, а вектор{" "}
  <MInline math={String.raw`w^* = w_1^* - w_2^*`} /> естественно возникает
  как разность ближайших точек этих оболочек.
</p>
        </div>
      
      </div>
    </SlideShell>
  );
}