import { SlideShell } from "../components/SlideShell";

export function TitleSlide() {
  return (
    <SlideShell title="" subtitle="">
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="w-full max-w-5xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
              Выпускная квалификационная работа
            </div>

            <h1 className="mt-8 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 lg:text-6xl">
              Сравнительный анализ SMO, MDM и SVM-Light алгоритмов машинного обучения
            </h1>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-12 border-t border-neutral-300 pt-10 lg:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-neutral-500">
                Подготовил
              </div>
              <div className="mt-4 text-xl font-medium text-neutral-950">
                Коваленко Анатолий Фёдорович
              </div>
              <div className="mt-2 text-base text-neutral-600">
                Группа ПМ-2201
              </div>
            </div>

            <div className="lg:text-right">
              <div className="text-xs uppercase tracking-[0.24em] text-neutral-500">
                Научный руководитель
              </div>
              <div className="mt-4 text-xl font-medium text-neutral-950">
                Соловьева Наталья Анатольевна
              </div>
               <div className="mt-2 text-base text-neutral-600">
                Доцент кафедры прикладной математики и экономико-математических методов
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}