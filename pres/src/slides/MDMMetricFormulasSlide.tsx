import { SlideShell } from "../components/SlideShell";
import { MBlock } from "../components/Math";

export function MDMMetricFormulasSlide() {
  return (
    <SlideShell title="Основные метрики">
      <div className="flex h-full flex-col justify-center gap-7">

        <MBlock
          math={String.raw`
            \text{cos}(w_1, w_2)
            =
            \frac{\langle w_1, w_2\rangle}{\|w_1\|\|w_2\|}
          `}
        />

        <MBlock
          math={String.raw`
            \text{margin}
            =
            \frac{2}{\|w\|}
          `}
        />

        <MBlock
          math={String.raw`
            y_i(\langle w, x_i\rangle + b)
          `}
        />

      </div>
    </SlideShell>
  );
}