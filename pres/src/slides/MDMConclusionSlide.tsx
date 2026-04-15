import { SlideShell } from "../components/SlideShell";

export function MDMConclusionSlide() {
  return (
    <SlideShell
      title="Вывод"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-6">
     <div className="rounded-[30px] border border-neutral-200 bg-white px-7 py-6 shadow-sm">
  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
    Основной результат
  </div>
  <div className="text-[24px] leading-9 font-semibold text-neutral-900">
    Обобщённый MDM-метод приводит к тому же линейному разделению,
    что и hard-margin SVM.
  </div>
</div>

        <div className="grid flex-1 grid-cols-2 gap-6">
          <div className="rounded-[28px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Что показал эксперимент
            </div>
            <div className="space-y-3 text-[19px] leading-8 text-neutral-700">
              <div>• Accuracy в экспериментах совпадает</div>
              <div>• Направления нормалей практически одинаковы</div>
              <div>• Ширина разделяющей полосы отличается незначительно</div>
            </div>
          </div>

          <div className="rounded-[28px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Практический вывод
            </div>
            <div className="space-y-3 text-[19px] leading-8 text-neutral-700">
              <div>• MDM имеет наглядную геометрическую интерпретацию</div>
              <div>• Метод удобен для анализа задачи через выпуклые оболочки</div>
              <div>• По времени уступает специализированным SVM-решателям</div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}