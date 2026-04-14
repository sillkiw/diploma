import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMTheoryIntroSlide() {
  return (
    <SlideShell title="Обобщённый MDM-метод">
      <div className="flex h-full flex-col justify-center gap-10">
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Представление точек оболочек
          </div>
          <MBlock
            math={String.raw`
              w_1=\sum_{j=1}^{s}u_jp_j,
              \qquad
              w_2=\sum_{j=s+1}^{m}u_jp_j
            `}
          />
          <MBlock
            math={String.raw`
              \sum_{j=1}^{s}u_j=1,\quad u_j\ge 0;
              \qquad
              \sum_{j=s+1}^{m}u_j=1,\quad u_j\ge 0
            `}
          />
        </div>

        <p className="text-[20px] leading-8 text-emerald-950">
  Коэффициенты <MInline math={String.raw`u_j`} /> задают точки{" "}
  <MInline math={String.raw`w_1 \in C_1`} /> и{" "}
  <MInline math={String.raw`w_2 \in C_2`} /> как выпуклые комбинации.
</p>
      </div>
    </SlideShell>
  );
}