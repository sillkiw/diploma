import { SlideShell } from "../components/SlideShell";

export function MDMFutureWorkSlide() {
  return (
    <SlideShell
      title="Дальнейшие направления работы"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-6">
      <div className="rounded-[30px] border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 px-7 py-6 shadow-sm">
  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
    развитие
  </div>
  <div className="text-[24px] leading-9 font-semibold text-neutral-900">
    Дальнейшая работа связана с расширением модели, ускорением алгоритма
    и более полным экспериментальным исследованием.
  </div>
</div>

        <div className="grid flex-1 grid-cols-2 gap-6">
          <div className="rounded-[28px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Теоретическое развитие
            </div>
            <div className="space-y-3 text-[19px] leading-8 text-neutral-700">
              <div>• Реализация MDM-метода для мягкого разделения</div>
              <div>• Распространение подхода на многоклассовую задачу</div>
            </div>
          </div>

          <div className="rounded-[28px] border border-neutral-200 bg-white px-6 py-5 shadow-sm">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Вычислительный аспект
            </div>
            <div className="space-y-3 text-[19px] leading-8 text-neutral-700">
              <div>• Исследование модификаций, ускоряющих сходимость метода</div>
              <div>• Расширение набора метрик для сравнения с другими алгоритмами</div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}