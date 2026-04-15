import { useEffect, useState } from "react";

import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

import { motion, AnimatePresence, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};
function RevealSection({
  show,
  title,
  children,
}: {
  show: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={sectionVariants}
          className="space-y-3"
        >
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            {title}
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function MDMStepTrajectorySlide() {
  const [step, setStep] = useState(0);
  const maxStep = 3;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        if (step < maxStep) {
          e.preventDefault();
          setStep((prev) => Math.min(prev + 1, maxStep));
        }
      }

      if (e.key === "ArrowUp") {
        if (step > 0) {
          e.preventDefault();
          setStep((prev) => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [step]);

  return (
    <SlideShell title="Переход к следующему приближению">
      <div className="flex h-full flex-col justify-center gap-7">
        <RevealSection show={step >= 1} title="Движение вдоль отрезка в C₁">
          <MBlock
            className="text-[1.15em]"
            math={String.raw`
              x_k(t)=x_k+t(\hat x_k-x_k)
              =
              x_k-t\,u_k'(p_k'-p_k''),
              \qquad t\in[0,1]
            `}
          />

          <p className="text-[18px] leading-7 text-neutral-700">
            То есть точка <MInline math={String.raw`x_k`} /> перемещается по
            отрезку к <MInline math={String.raw`\hat x_k`} /> внутри{" "}
            <MInline math={String.raw`C_1`} />.
          </p>
        </RevealSection>

        <RevealSection show={step >= 2} title="Соответствующая траектория для w">
          <MBlock
            className="text-[1.15em]"
            math={String.raw`
              w_k(t)=x_k(t)-y_k
              =
              w_k-t\,u_k'(p_k'-p_k'')
            `}
          />
        </RevealSection>

        <RevealSection show={step >= 3} title="Выбор оптимального шага">
          <MBlock
            className="text-[1.15em]"
            math={String.raw`
              t_k=\arg\min_{t\in[0,1]} \|w_k(t)\|^2,
              \qquad
              w_{k+1}=w_k(t_k)
            `}
          />

          <p className="text-[18px] leading-7 text-neutral-700">
            Следующее приближение выбирается как точка траектории с минимальной
            нормой.
          </p>
        </RevealSection>
      </div>
    </SlideShell>
  );
}