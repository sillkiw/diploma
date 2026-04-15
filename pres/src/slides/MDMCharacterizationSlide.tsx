import { SlideShell } from "../components/SlideShell";
import { MBlock } from "../components/Math";
import type { ReactNode } from "react";

type TheorySectionProps = {
  title: string;
  children: ReactNode;
};

function TheorySection({ title, children }: TheorySectionProps) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
        {title}
      </div>
      {children}
    </div>
  );
}

export function MDMCharacterizationSlide() {
  return (
    <SlideShell title="Характеризация решения">
      <div className="flex h-full flex-col justify-center gap-7">
        <TheorySection title="Носители вектора u">
          <MBlock
            math={String.raw`
              M_1^+(u)=\{j\in 1:s \mid u[j]>0\},
              \qquad
              M_2^+(u)=\{j\in (s+1):m \mid u[j]>0\}
            `}
          />
        </TheorySection>

        <TheorySection title="Критериальные величины">
          <MBlock
            math={String.raw`
              \Delta_1(u)=
              \max_{j\in M_1^+(u)} \langle p_j,w\rangle
              -
              \min_{j\in 1:s}\langle p_j,w\rangle
            `}
          />
          <MBlock
            math={String.raw`
              \Delta_2(u)=
              \max_{j\in M_2^+(u)} \langle p_j,-w\rangle
              -
              \min_{j\in (s+1):m}\langle p_j,-w\rangle
            `}
          />
          <MBlock
            math={String.raw`
              \Delta(u)=\max\{\Delta_1(u),\Delta_2(u)\}
            `}
          />
        </TheorySection>
      </div>
    </SlideShell>
  );
}