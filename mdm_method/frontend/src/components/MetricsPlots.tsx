import Plot from "react-plotly.js";
import type { Layout } from "plotly.js";
import type { RunHistoryItem } from "../types";

type Props = { history: RunHistoryItem[] };

export function MetricsPlots({ history }: Props) {
  const x = history.map((_, i) => i + 1);
  const delta = history.map((h) => h.delta);
  const obj = history.map((h) => h.objective);

  const layoutBase: Partial<Layout> = {
    margin: { l: 55, r: 10, t: 35, b: 40 },
    xaxis: { title: "итерация", gridcolor: "#eef2f7" },
    paper_bgcolor: "#ffffff",
    plot_bgcolor: "#ffffff",
    legend: { orientation: "h" },
    transition: { duration: 250, easing: "cubic-in-out" },
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <div>
        <Plot
          data={[{ type: "scatter", mode: "lines", name: "Δ", x, y: delta }]}
          layout={{
            ...layoutBase,
            title: { text: "Невязка Δ(k)" },
            yaxis: { title: "Δ", type: "log", gridcolor: "#eef2f7" },
          }}
          style={{ width: "100%", height: "260px" }}
          config={{ displayModeBar: false, responsive: true }}
        />
        <div className="muted">
          <b>Δ(k)</b> — мера неоптимальности: если Δ→0, перенос массы больше не улучшает решение.
        </div>
      </div>

      <div>
        <Plot
          data={[{ type: "scatter", mode: "lines", name: "цель", x, y: obj }]}
          layout={{
            ...layoutBase,
            title: { text: "Целевая функция 0.5‖w‖²" },
            yaxis: { title: "значение", type: "log", gridcolor: "#eef2f7" },
          }}
          style={{ width: "100%", height: "260px" }}
          config={{ displayModeBar: false, responsive: true }}
        />
        <div className="muted">
          <b>0.5‖w‖²</b> — целевая функция: минимум соответствует расстоянию между выпуклыми оболочками.
        </div>
      </div>
    </div>
  );
}