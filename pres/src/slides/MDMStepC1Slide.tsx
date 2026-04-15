import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlideShell } from "../components/SlideShell";
import { MBlock, MInline } from "../components/Math";

export function MDMStepC1Slide() {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setStep((prev) => Math.min(prev + 1, totalSteps - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setStep((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <SlideShell title="Перенос коэффициента">
      <div className="flex h-full flex-col justify-center gap-7">
        <AnimatePresence mode="wait">
          {step >= 0 && (
            <motion.div
              key="step0"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Выбранная пара точек
              </div>
              <MBlock
                className="text-[1.2em]"
                math={String.raw`
                  p_k' := p_{j_k'},
                  \qquad
                  p_k'' := p_{j_k''},
                  \qquad
                  \Delta(u_k)=\langle p_k'-p_k'',\,w_k\rangle
                `}
              />
            </motion.div>
          )}

          {step >= 1 && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Разложение текущего приближения
              </div>
              <MBlock
                className="text-[1.2em]"
                math={String.raw`
                  w_k = x_k - y_k,
                  \qquad
                  x_k \in C_1,\; y_k \in C_2
                `}
              />
            </motion.div>
          )}

          {step >= 2 && (
            <motion.div
              key="step2"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Обновление в C₁
              </div>
              <MBlock
                className="text-[1.2em]"
                math={String.raw`
                  \hat x_k = x_k - u_k'(p_k'-p_k''),
                  \qquad
                  u_k' = u_k[j_k']
                `}
              />
              <p className="text-[18px] leading-7 text-neutral-700">
                То есть коэффициент переносится от точки{" "}
                <MInline math={String.raw`p_k'`} /> к точке{" "}
                <MInline math={String.raw`p_k''`} /> внутри оболочки{" "}
                <MInline math={String.raw`C_1`} />.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideShell>
  );
}