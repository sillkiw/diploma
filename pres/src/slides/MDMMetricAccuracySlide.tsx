import { SlideShell } from "../components/SlideShell";
import { MInline } from "../components/Math";

export function MDMMetricAccuracySlide() {
  return (
    <SlideShell title="Качество классификации">
      <div className="flex h-full flex-col justify-center gap-5">
        <div className="rounded-[26px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Accuracy
          </div>
          <div className="text-[18px] leading-7 text-neutral-700">
            Доля правильно классифицированных объектов:
            <br />
            сравниваются предсказанные и истинные метки классов.
          </div>
        </div>

        <div className="rounded-[26px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Минимальный зазор
          </div>
          <div className="text-[18px] leading-7 text-neutral-700">
            Рассматривается величина{" "}
            <MInline math={String.raw`y_i(\langle w,x_i\rangle + b)`} />.
            <br />
            Минимум по всем точкам показывает, насколько близко объекты подходят к разделяющей гиперплоскости.
          </div>
        </div>
      </div>
    </SlideShell>
  );
}