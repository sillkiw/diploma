import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMMatrixFormSlide() {
  return (
    <SlideShell title="Матричная форма задачи">
      <div className="flex h-full flex-col justify-center gap-6">
        <MBlock
          math={String.raw`
            A = [\xi_1 p_1,\dots,\xi_m p_m],
            \qquad
            w = Au,\quad u \in U
          `}
        />

        <MBlock
          math={String.raw`
            \frac{1}{2}\|w\|^2 \to \min,
            \qquad
            w = Au,\quad u \in U
          `}
        />

        <p className="text-[20px] leading-8 text-neutral-700">
          Матрица <MInline math={String.raw`A`} /> объединяет все точки с учётом
          их меток, поэтому задача сводится к минимизации нормы вектора{" "}
          <MInline math={String.raw`w`} /> при допустимых коэффициентах{" "}
          <MInline math={String.raw`u`} />.
        </p>
        <p className="text-[20px] leading-8 text-neutral-700">
  Здесь <MInline math={String.raw`U`} /> — множество допустимых коэффициентов{" "}
  <MInline math={String.raw`u`} />, задающих точки{" "}
  <MInline math={String.raw`w_1 \in C_1`} /> и{" "}
  <MInline math={String.raw`w_2 \in C_2`} /> как выпуклые комбинации.
</p>
      </div>
    </SlideShell>
  );
}