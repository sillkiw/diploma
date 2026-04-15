import { SlideShell } from "../components/SlideShell";

export function ReferencesSlide() {
  return (
    <SlideShell title="Список использованных источников">
      <div className="flex h-full flex-col justify-center gap-5 text-[22px] leading-9 text-neutral-800">
        <div>
          1. Малозёмов В. Н., Соловьева Н. А. МДМ-метод для решения общей
          квадратичной задачи математической диагностики.
        </div>
            <div>
          2. Малозёмов В. Н., Плоткин А. В. SVM-метод строгого линейного
          отделения двух конечных множеств.
        </div>
        <div>
          3. Документация scikit-learn. SVC(kernel=\"linear\").
        </div>
      </div>
    </SlideShell>
  );
}