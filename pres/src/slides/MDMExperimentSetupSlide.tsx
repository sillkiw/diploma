import { SlideShell } from "../components/SlideShell";
import { MInline } from "../components/Math";

export function MDMExperimentSetupSlide() {
  const pythonVersion = "3.14.4";
  const sklearnVersion = "1.8.0";

  return (
    <SlideShell title="Постановка эксперимента">
      <div className="flex h-full flex-col justify-center gap-5">
        <div className="rounded-[26px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Что сравнивалось
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 px-4 py-4">
              <div className="text-[19px] font-semibold text-neutral-900">
                Обобщённый MDM-метод
              </div>
              <div className="mt-1 text-[16px] text-neutral-600">
                собственная реализация
              </div>
            </div>

            <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 px-4 py-4">
              <div className="text-[19px] font-semibold text-neutral-900">
                Линейный SVM
              </div>
              <div className="mt-1 text-[16px] text-neutral-600">
                sklearn, <MInline math={String.raw`C \gg 1`} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1.05fr_0.95fr] gap-5">
          <div className="rounded-[26px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Данные
            </div>
            <div className="space-y-2 text-[18px] leading-7 text-neutral-700">
              <div>• Два класса <MInline math={String.raw`P_1`} /> и <MInline math={String.raw`P_2`} /></div>
              <div>• Нормальные распределения</div>
              <div>• 200–2000 точек в каждом классе</div>
              <div>• Несколько независимых запусков</div>
            </div>
          </div>

          <div className="rounded-[26px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Среда
            </div>
            <div className="space-y-3 text-[18px] leading-7 text-neutral-700">
              <div>
                <span className="font-medium text-neutral-900">Python:</span>{" "}
                {pythonVersion}
              </div>
              <div>
                <span className="font-medium text-neutral-900">scikit-learn:</span>{" "}
                {sklearnVersion}
              </div>
              <div>
                <span className="font-medium text-neutral-900">SVM:</span>{" "}
                <code className="rounded bg-neutral-100 px-2 py-0.5 text-[15px]">
                  SVC(kernel="linear")
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}