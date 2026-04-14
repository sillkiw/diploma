import type { ReactNode } from "react";

type SlideShellProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  centerContent?: boolean;
  contentClassName?: string;
  headerClassName?: string;
};

export function SlideShell({
  eyebrow,
  title,
  subtitle,
  children,
  centerContent = true,
  contentClassName = "",
  headerClassName = "",
}: SlideShellProps) {
  return (
    <section className="mx-auto flex h-full w-full max-w-7xl flex-col px-10 py-10 lg:px-14 lg:py-12">
      {(eyebrow || title || subtitle) && (
        <div className={`mb-8 ${headerClassName}`}>
          {eyebrow && (
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              {eyebrow}
            </div>
          )}

          {title && (
           <h1 className="max-w-5xl text-2xl font-semibold tracking-tight text-neutral-950 lg:text-4xl">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600 lg:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div
        className={`flex flex-1 flex-col ${
          centerContent ? "justify-center" : "justify-start"
        } ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  );
}