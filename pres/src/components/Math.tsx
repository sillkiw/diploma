import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import type { ReactNode } from "react";

type MathInlineProps = {
  math: string;
  className?: string;
};

type MathBlockProps = {
  math: string;
  className?: string;
};

type MathParagraphProps = {
  children: ReactNode;
  className?: string;
};

export function MInline({ math, className = "" }: MathInlineProps) {
  return (
    <span className={className}>
      <InlineMath math={math} />
    </span>
  );
}

export function MBlock({ math, className = "" }: MathBlockProps) {
  return (
    <div className={`overflow-x-auto py-0.1 text-[1.25em] text-neutral-990 ${className}`}>
      <BlockMath math={math} />
    </div>
  );
}

export function MathParagraph({
  children,
  className = "",
}: MathParagraphProps) {
  return (
    <p className={`text-xl leading-8 text-neutral-700 ${className}`}>
      {children}
    </p>
  );
}