import { SlideShell } from "../components/SlideShell";

export function MDMResultsSpeedSlide() {
  return (
    <SlideShell title="Результаты: вычислительная эффективность">
      <div className="flex h-full flex-col justify-center gap-6 text-[19px] leading-8 text-neutral-700">

        <ul className="space-y-2">
          <li>• Время MDM растёт с размером выборки</li>
          <li>• sklearn SVM работает значительно быстрее</li>
          <li>• Количество итераций MDM ≈ 2n</li>
        </ul>

        <div className="pt-3 text-neutral-900 font-medium">
          ⇒ MDM уступает специализированным SVM-решателям по скорости
        </div>

      </div>
    </SlideShell>
  );
}