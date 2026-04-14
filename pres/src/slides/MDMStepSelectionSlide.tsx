import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMStepSelectionSlide() {
  return (
    <SlideShell title="Шаг обобщённого MDM-метода">
      <div className="flex h-full flex-col justify-center gap-5">
        <p className="max-w-5xl text-[18px] leading-7 text-neutral-700">
          Обобщённый MDM-метод строит последовательность приближений{" "}
          <MInline math={String.raw`w_k = A u_k`} />. Для перехода от{" "}
          <MInline math={String.raw`w_k`} /> к{" "}
          <MInline math={String.raw`w_{k+1}`} /> на k-й итерации выбираются
          специальные индексы в каждом из классов.
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3 rounded-[24px] border border-neutral-200 bg-white px-5 py-4 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Первый класс
            </div>

            <MBlock
              math={String.raw`
                j_k' \in M_1^+(u_k), \qquad j_k'' \in 1:s
              `}
            />

            <MBlock
              math={String.raw`
                \max_{i\in M_1^+(u_k)} \langle p_i,w_k\rangle
                =
                \langle p_{j_k'},w_k\rangle
              `}
            />

            <MBlock
              math={String.raw`
                \min_{i\in 1:s} \langle p_i,w_k\rangle
                =
                \langle p_{j_k''},w_k\rangle
              `}
            />
          </div>

          <div className="space-y-3 rounded-[24px] border border-neutral-200 bg-white px-5 py-4 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Второй класс
            </div>

            <MBlock
              math={String.raw`
                l_k' \in M_2^+(u_k), \qquad l_k'' \in (s+1):m
              `}
            />

            <MBlock
              math={String.raw`
                \max_{i\in M_2^+(u_k)} \langle p_i,-w_k\rangle
                =
                \langle p_{l_k'},-w_k\rangle
              `}
            />

            <MBlock
              math={String.raw`
                \min_{i\in (s+1):m} \langle p_i,-w_k\rangle
                =
                \langle p_{l_k''},-w_k\rangle
              `}
            />
          </div>
        </div>
      </div>
    </SlideShell>
  );
}