import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

type FormulaBlockProps = {
  title?: string;
  formula?: string;
  inline?: string;
  description?: string;
};

export function FormulaBlock({ title, formula, inline, description }: FormulaBlockProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      {title && <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">{title}</div>}
      {formula && (
        <div className="overflow-x-auto text-lg text-neutral-950">
          <BlockMath math={formula} />
        </div>
      )}
      {inline && (
        <div className="text-base text-neutral-900">
          <InlineMath math={inline} />
        </div>
      )}
      {description && <div className="mt-3 text-sm leading-6 text-neutral-600">{description}</div>}
    </div>
  );
}