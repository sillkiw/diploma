import { motion } from "framer-motion";
import { SlideShell } from "../components/SlideShell";
import { MInline } from "../components/Math";

export function MDMWeightTransferSlide() {
  return (
    <SlideShell
      title="Перенос веса на итерации"
      subtitle="Наглядная схема обновления коэффициентов"
    >
      <div className="flex h-full flex-col justify-center gap-10">
        <div className="relative mx-auto h-[280px] w-full max-w-5xl rounded-[32px] border border-neutral-200 bg-white shadow-sm">
          <div className="absolute left-[14%] top-1/2 -translate-y-1/2 text-center">
            <motion.div
              className="mx-auto h-16 w-16 rounded-full border-4 border-neutral-900 bg-neutral-100"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
            <div className="mt-4 text-lg font-semibold text-neutral-900">
              <MInline math={String.raw`p_k'`} />
            </div>
            <motion.div
              className="mt-2 text-base text-neutral-600"
              animate={{ opacity: [1, 0.45, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              вес: <span className="font-semibold">уменьшается</span>
            </motion.div>
          </div>

          <div className="absolute right-[14%] top-1/2 -translate-y-1/2 text-center">
            <motion.div
              className="mx-auto h-16 w-16 rounded-full border-4 border-emerald-700 bg-emerald-50"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }}
            />
            <div className="mt-4 text-lg font-semibold text-neutral-900">
              <MInline math={String.raw`p_k''`} />
            </div>
            <motion.div
              className="mt-2 text-base text-emerald-700"
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              вес: <span className="font-semibold">увеличивается</span>
            </motion.div>
          </div>

          <div className="absolute left-[28%] right-[28%] top-1/2 h-[2px] -translate-y-1/2 bg-neutral-300" />

          <motion.div
            className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-emerald-600 shadow-lg"
            initial={{ left: "28%" }}
            animate={{ left: ["28%", "70%", "28%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute left-1/2 top-[24%] -translate-x-1/2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            переносится доля <MInline math={String.raw`t_k u_k'`} />
          </motion.div>
        </div>

        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-7 py-5 shadow-sm">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Интерпретация
          </div>
          <p className="text-[20px] leading-8 text-emerald-950">
            На шаге метода часть коэффициента переносится от точки{" "}
            <MInline math={String.raw`p_k'`} /> к точке{" "}
            <MInline math={String.raw`p_k''`} />, что приводит к уменьшению нормы
            текущего вектора <MInline math={String.raw`w_k`} />.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}