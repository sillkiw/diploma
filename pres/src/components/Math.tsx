import { BlockMath, InlineMath } from "react-katex";
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

function inspectMath(kind: "inline" | "block", math: string) {
  const problems: string[] = [];

  if (/[А-Яа-яЁё]/.test(math)) problems.push("cyrillic");
  if (/\\text\s*\{/.test(math)) problems.push("\\text{...}");
  if (/\\r(?![a-zA-Z])/.test(math) || /\\r[А-Яа-яЁё]/.test(math)) problems.push("\\r");
  if (/\\qquad[А-Яа-яЁёA-Za-z]/.test(math)) problems.push("\\qquad glued text");
  if (/\\[a-zA-Z]+[А-Яа-яЁё]/.test(math)) problems.push("command glued to cyrillic");

  if (problems.length) {
    console.error(`[${kind}] suspicious math`, { math, problems });
  }
}

export function MInline({ math, className = "" }: MathInlineProps) {
  inspectMath("inline", math);
  return (
    <span className={className}>
      <InlineMath math={math} />
    </span>
  );
}

export function MBlock({ math, className = "" }: MathBlockProps) {
  inspectMath("block", math);
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