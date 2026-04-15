import { SlideShell } from "../components/SlideShell";

export function MDMResultsQualitySlide() {
  return (
    <SlideShell title="Результаты: качество решения">
      <div className="flex h-full flex-col justify-center gap-6 text-[19px] leading-8 text-neutral-700">

        <ul className="space-y-2">
          <li>• Accuracy = 1.0 для всех экспериментов</li>
          <li>• Косинус ≈ 1 (совпадение направлений)</li>
          <li>• Разница margin ≈ 10⁻⁴</li>
          <li>• Минимальный зазор ≈ 1</li>
        </ul>

        <div className="pt-3 text-neutral-900 font-medium">
          ⇒ MDM даёт то же решение, что и SVM
        </div>

      </div>
    </SlideShell>
  );
}