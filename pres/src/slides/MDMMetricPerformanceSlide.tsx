import { SlideShell } from "../components/SlideShell";

export function MDMMetricPerformanceSlide() {
  return (
    <SlideShell title="Вычислительная эффективность">
      <div className="flex h-full flex-col justify-center gap-5">
        <div className="rounded-[26px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Число итераций
          </div>
          <div className="text-[18px] leading-7 text-neutral-700">
            Показывает, за сколько шагов метод достигает решения.
            <br />
            Характеризует скорость сходимости алгоритма.
          </div>
        </div>

        <div className="rounded-[26px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Время работы
          </div>
          <div className="text-[18px] leading-7 text-neutral-700">
            Общее время выполнения алгоритма.
            <br />
            Используется для сравнения эффективности MDM и SVM.
          </div>
        </div>
      </div>
    </SlideShell>
  );
}