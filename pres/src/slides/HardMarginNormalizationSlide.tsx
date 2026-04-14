import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function HardMarginNormalizationSlide() {
  return (
    <SlideShell
      title="Каноническая нормировка"
      centerContent={false}
      contentClassName="pt-4"
    >
      <div className="flex h-full flex-col gap-8">
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Минимальное значение
          </div>
          <MBlock
            math={String.raw`m=\min_{j=1,\dots,m}\xi_j\big(\langle w,p_j\rangle+\beta\big)>0`}
          />
          <p className="mt-2 text-lg leading-7 text-neutral-700">
            Для линейно разделимой выборки все величины
            <span className="mx-1">
              <MInline math={String.raw`\xi_j(\langle w,p_j\rangle+\beta)`} />
            </span>
            положительны, поэтому их минимум также положителен.
          </p>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Нормировка
          </div>
          <MBlock
            math={String.raw`\tilde w=\frac{w}{m},\qquad \tilde\beta=\frac{\beta}{m}`}
          />
          <MBlock
            math={String.raw`\xi_j\big(\langle \tilde w,p_j\rangle+\tilde\beta\big)\ge 1,\qquad j=1,\dots,m`}
          />
        </div>

     
      </div>
    </SlideShell>
  );
}