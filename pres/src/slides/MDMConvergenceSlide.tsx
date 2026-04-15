import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMConvergenceSlide() {
  return (
    <SlideShell title="Сходимость">
      <div className="flex h-full flex-col justify-center gap-5">
        <div className="space-y-1">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Пусть
          </div>
          <MBlock
            className="text-[1.02em]"
            math={String.raw`\Delta(u_k)>0,\qquad k=0,1,2,\dots`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-[24px] border border-neutral-200 bg-white px-5 py-4 shadow-sm">
            <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Убывание нормы
            </div>
            <MBlock
              className="text-[0.98em]"
              math={String.raw`\|w_{k+1}\|^2<\|w_k\|^2`}
            />
            <p className="mt-2 text-[16px] leading-6 text-neutral-700">
              Поэтому <MInline math={String.raw`\{\|w_k\|^2\}`} /> строго
              убывает и ограничена снизу нулём.
            </p>
          </div>

          <div className="rounded-[24px] border border-neutral-200 bg-white px-5 py-4 shadow-sm">
            <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Неусечённые шаги
            </div>
            <MBlock
              className="text-[0.98em]"
              math={String.raw`t_k=1`}
            />
            <p className="mt-2 text-[16px] leading-6 text-neutral-700">
              Число подряд идущих усечённых итераций ограничено, значит
              неусечённые шаги встречаются бесконечно часто.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}