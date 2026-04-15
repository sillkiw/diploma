import { useEffect, useMemo, useState } from "react";



import { HardMarginGeometrySlide } from "./slides/HardMarginGeometrySlide";
import { HardMarginNormalizationSlide } from "./slides/HardMarginNormalizationSlide";
import { HardMarginOptimizationSlide } from "./slides/HardMarginOptimizationSlide";
import { HardMarginSetupSlide } from "./slides/HardMarginSetupSlide";
import { InteractiveMDMSlide } from "./slides/InteractiveMDMSlide";
import { MDMBridgeSlide } from "./slides/MDMBridgeSlide";
import { MDMTheoryIntroSlide } from "./slides/MDMTheoryIntroSlide";
import { MDMVectorFormSlide } from "./slides/MDMVectorFormSlide";
import { MDMMatrixFormSlide } from "./slides/MDMMatrixFormSlide";
import { MDMCharacterizationSlide } from "./slides/MDMCharacterizationSlide";
import { MDMCoefficientUpdateSlide } from "./slides/MDMCoefficientUpdateSlide";
import { MDMOptimalityCriterionSlide } from "./slides/MDMOptimalityCriterionSlide";
import { MDMStepSelectionSlide } from "./slides/MDMStepSelectionSlide";
import { MDMStepC1Slide } from "./slides/MDMStepC1Slide";
import { MDMStepTrajectorySlide} from "./slides/MDMStepTrajectorySlide";
import { MDMStepChoiceSlide } from "./slides/MDMStepChoiceSlide";
import { MotivationSlide } from "./slides/MotivationSlide";
import { HardMarginScaleSlide } from "./slides/HardMarginScaleSlide";
import { HardMarginMarginSlide } from "./slides/HardMarginMarginSlide";
import { HardMarginWidthSlide } from "./slides/HardMarginWidthSlide";
import { MDMStepAnimationSlide } from "./slides/MDMStepAnimationSlide";
import { MDMStepTrajectoryVisualSlide} from "./slides/MDMStepTrajectoryVisualSlide";
import { TitleSlide } from "./slides/TitleSlide";
import {MDMConvergenceSlide} from "./slides/MDMConvergenceSlide"
import {MDMConvergenceSlide2} from "./slides/MDMConvergenceSlide2"
import {MDMStepDecisionSlide} from "./slides/MDMStepDecisionSlide"

import { MDMExperimentSetupSlide } from "./slides/MDMExperimentSetupSlide";


import { MDMMetricMarginDiffSlide } from "./slides/MDMMetricMarginDiffSlide";
import { MDMMetricGeometrySlide } from "./slides/MDMMetricGeometrySlide";

import { MDMRecoveredNormalSlide} from "./slides/MDMRecoveredNormalSlide";
import { MDMConclusionSlide } from "./slides/MDMConclusionSlide";
import { MDMResultsTableSlide } from "./slides/MDMResultsTableSlide";
import { MDMFutureWorkSlide } from "./slides/MDMFutureWorkSlide";
import { ReferencesSlide } from "./slides/ReferencesSlide";
const slides = [
  { id: "title", component: <TitleSlide /> },
  { id: "motivation", component: <MotivationSlide /> },

  { id: "hard-margin-setup", component: <HardMarginSetupSlide /> },
  { id: "hard-margin-geometry", component: <HardMarginGeometrySlide /> },
  { id: "hard-margin-scale", component: <HardMarginScaleSlide /> },
  { id: "hard-margin-normalization", component: <HardMarginNormalizationSlide /> },
  { id: "hard-margin-margin", component: <HardMarginMarginSlide /> },
  { id: "hard-margin-width", component: <HardMarginWidthSlide /> },
  { id: "hard-margin-optimization", component: <HardMarginOptimizationSlide /> },


  { id: "mdm-bridge", component: <MDMBridgeSlide /> },
  { id: "mdm-theory-intro", component: <MDMTheoryIntroSlide /> },
  { id: "mdm-vector-form", component: <MDMVectorFormSlide /> },
  { id: "mdm-matrix-form", component: <MDMMatrixFormSlide /> },
  { id: "mdm-characterization", component: <MDMCharacterizationSlide /> },
  { id: "mdm-optimality", component: <MDMOptimalityCriterionSlide /> },
  { id: "mdm-step-selection", component: <MDMStepSelectionSlide /> },
   { id: "mdm-anim-step-form", component: <MDMStepAnimationSlide /> },
   { id: "mdm-des-step-form", component: <MDMStepDecisionSlide /> },
  { id: "mdm-step-c1", component: <MDMStepC1Slide /> },
  { id: "mdm-trajectory", component: <MDMStepTrajectorySlide/> },
  { id: "mdm-vistrajectory", component: <MDMStepTrajectoryVisualSlide/> },
  { id: "mdm-update-w", component: <MDMCoefficientUpdateSlide/>},
  { id: "mdm-step-choice", component: <MDMStepChoiceSlide /> },
  { id: "interactive", component: <InteractiveMDMSlide /> },
  { id: "conv", component: <MDMConvergenceSlide/> },
  { id: "conv2", component: <MDMConvergenceSlide2/> },

  { id: "exp-setup", component: <MDMExperimentSetupSlide /> },
  { id: "exp-conasfclusion", component: <MDMRecoveredNormalSlide /> },
  { id: "exp-metrics2", component: <MDMMetricGeometrySlide /> },
  { id: "metric-margin-diff", component: <MDMMetricMarginDiffSlide /> },
  { id: "results-table", component: <MDMResultsTableSlide /> },
  { id: "exp-conclusion", component: <MDMConclusionSlide /> },
  { id: "exp-conclusion2", component: <MDMFutureWorkSlide/> },
  { id: "exp-conclusion3", component: <ReferencesSlide/> },
];
export default function App() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [animKey, setAnimKey] = useState(0);

  const total = slides.length;

  const goTo = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= total || nextIndex === index) return;
    setDirection(nextIndex > index ? 1 : -1);
    setIndex(nextIndex);
    setAnimKey((k) => k + 1);
  };

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      }
      if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, total]);

  const animationClass = useMemo(
    () => (direction === 1 ? "animate-slide-in-right" : "animate-slide-in-left"),
    [direction]
  );

 return (
  <div className="relative min-h-screen overflow-hidden bg-[#f7f7f5] text-neutral-950">
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f5] p-2">
      <div
        key={animKey}
        className={`aspect-video h-[96vh] overflow-hidden ${animationClass}`}
      >
        {slides[index].component}
      </div>
    </main>

    <div className="fixed bottom-3 right-3 z-40 flex items-center gap-2 text-[11px] font-medium text-neutral-500">
      <span>
        {index + 1}/{total}
      </span>

      <button
        onClick={prev}
        disabled={index === 0}
        className="px-1.5 py-0.5 text-neutral-500 transition hover:text-neutral-900 disabled:opacity-25"
        aria-label="Предыдущий слайд"
      >
        ←
      </button>

      <button
        onClick={next}
        disabled={index === total - 1}
        className="px-1.5 py-0.5 text-neutral-500 transition hover:text-neutral-900 disabled:opacity-25"
        aria-label="Следующий слайд"
      >
        →
      </button>
    </div>
  </div>
);
}

