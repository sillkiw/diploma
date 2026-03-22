import { useMemo } from "react";
import Plot from "react-plotly.js";
import type { Layout } from "plotly.js";
import type { GeometryResponse, RunHistoryItem } from "../types";
import { convexHull } from "../utils/convexHull";
import type { Pt } from "../utils/convexHull";

type Props = {
  P1: number[][];
  P2: number[][];
  geometry: GeometryResponse | null;
  lastStep: RunHistoryItem | null;
  history: RunHistoryItem[]; // нужно для траекторий
};

function closeLoop(poly: Pt[]): Pt[] {
  if (poly.length === 0) return poly;
  const first = poly[0];
  const last = poly[poly.length - 1];
  if (first[0] === last[0] && first[1] === last[1]) return poly;
  return poly.concat([first]);
}

function trailLast(points: number[][], keep: number): number[][] {
  if (points.length <= keep) return points;
  return points.slice(points.length - keep);
}

export function GeometryPlot({ P1, P2, geometry, lastStep, history }: Props) {
  const p1: Pt[] = useMemo(() => P1.map((p) => [p[0], p[1]] as Pt), [P1]);
  const p2: Pt[] = useMemo(() => P2.map((p) => [p[0], p[1]] as Pt), [P2]);

  const hull1 = useMemo(() => closeLoop(convexHull(p1)), [p1]);
  const hull2 = useMemo(() => closeLoop(convexHull(p2)), [p2]);

  const p1x = P1.map((p) => p[0]);
  const p1y = P1.map((p) => p[1]);
  const p2x = P2.map((p) => p[0]);
  const p2y = P2.map((p) => p[1]);

  // Trails from history
  const w1Trail = trailLast(history.map((h) => h.w1), 80);
  const w2Trail = trailLast(history.map((h) => h.w2), 80);

  const traces: any[] = [];

  // --- points with “waу” encoding ---
  if (geometry?.extras) {
    const { s1, s2, u, v } = geometry.extras;

    const size1 = u.map((ui) => 6 + 30 * Math.sqrt(Math.max(ui, 0)));
    const size2 = v.map((vi) => 6 + 30 * Math.sqrt(Math.max(vi, 0)));

    traces.push({
      type: "scatter",
      mode: "markers",
      name: "Класс +1 (цвет=⟨p,w⟩, размер=вес)",
      x: p1x,
      y: p1y,
      marker: {
        size: size1,
        color: s1,
        colorscale: "RdBu",
        reversescale: false,
        colorbar: { title: { text: "⟨p,w⟩" }, x: 1.05, y: 0.80, len: 0.55 },
        opacity: 0.95,
      },
    });

    traces.push({
      type: "scatter",
      mode: "markers",
      name: "Класс -1 (цвет=⟨q,-w⟩, размер=вес)",
      x: p2x,
      y: p2y,
      marker: {
        size: size2,
        color: s2,
        colorscale: "RdBu",
        reversescale: false,
        colorbar: { title: { text: "⟨q,-w⟩" }, x: 1.05, y: 0.20, len: 0.55 },
        opacity: 0.95,
      },
    });
  } else {
    // fallback (если extras нет)
    traces.push({ type: "scatter", mode: "markers", name: "Класс +1", x: p1x, y: p1y, marker: { size: 7 } });
    traces.push({ type: "scatter", mode: "markers", name: "Класс -1", x: p2x, y: p2y, marker: { size: 7 } });
  }

  // --- convex hull with fill ---
  if (hull1.length >= 3) {
    traces.push({
      type: "scatter",
      mode: "lines",
      name: "Оболочка conv(P1)",
      x: hull1.map((p) => p[0]),
      y: hull1.map((p) => p[1]),
      fill: "toself",
      fillcolor: "rgba(59,130,246,0.08)",
      line: { width: 2 },
    });
  }
  if (hull2.length >= 3) {
    traces.push({
      type: "scatter",
      mode: "lines",
      name: "Оболочка conv(P2)",
      x: hull2.map((p) => p[0]),
      y: hull2.map((p) => p[1]),
      fill: "toself",
      fillcolor: "rgba(239,68,68,0.08)",
      line: { width: 2 },
    });
  }

  // --- trails (w1,w2 paths) ---
  if (w1Trail.length >= 2) {
    traces.push({
      type: "scatter",
      mode: "lines",
      name: "траектория w1",
      x: w1Trail.map((p) => p[0]),
      y: w1Trail.map((p) => p[1]),
      line: { width: 2, dash: "solid" },
      opacity: 0.65,
    });
  }
  if (w2Trail.length >= 2) {
    traces.push({
      type: "scatter",
      mode: "lines",
      name: "траектория w2",
      x: w2Trail.map((p) => p[0]),
      y: w2Trail.map((p) => p[1]),
      line: { width: 2, dash: "solid" },
      opacity: 0.65,
    });
  }

  // --- current geometry primitives ---
  if (geometry) {
    const w1 = geometry.state.w1;
    const w2 = geometry.state.w2;
    const sep = geometry.geometry.separable;

    traces.push({
      type: "scatter",
      mode: "markers+text",
      name: "w1",
      x: [w1[0]],
      y: [w1[1]],
      text: ["w1"],
      textposition: "top center",
      marker: { size: 13, symbol: "diamond" },
    });

    traces.push({
      type: "scatter",
      mode: "markers+text",
      name: "w2",
      x: [w2[0]],
      y: [w2[1]],
      text: ["w2"],
      textposition: "top center",
      marker: { size: 13, symbol: "diamond" },
    });

    traces.push({
      type: "scatter",
      mode: "lines",
      name: "вектор w",
      x: [w2[0], w1[0]],
      y: [w2[1], w1[1]],
    });

    if (sep && geometry.geometry.line) {
      const L = geometry.geometry.line;
      traces.push({
        type: "scatter",
        mode: "lines",
        name: "разделитель",
        x: [L.p0[0], L.p1[0]],
        y: [L.p0[1], L.p1[1]],
      });
    }
    if (sep && geometry.geometry.margin_plus) {
      const M = geometry.geometry.margin_plus;
      traces.push({
        type: "scatter",
        mode: "lines",
        name: "опорная линия через w1",
        x: [M.p0[0], M.p1[0]],
        y: [M.p0[1], M.p1[1]],
        line: { dash: "dot" },
      });
    }
    if (sep && geometry.geometry.margin_minus) {
      const M = geometry.geometry.margin_minus;
      traces.push({
        type: "scatter",
        mode: "lines",
        name: "опорная линия через w2",
        x: [M.p0[0], M.p1[0]],
        y: [M.p0[1], M.p1[1]],
        line: { dash: "dot" },
      });
    }
  }

  // --- donor/receiver highlight + arrow ---
  if (lastStep && geometry) {
    const cls = lastStep.updated_class;

    if (cls === 1) {
      const donor = P1[lastStep.donor_index];
      const recv = P1[lastStep.receiver_index];

      traces.push({
        type: "scatter",
        mode: "markers",
        name: "донор",
        x: [donor[0]],
        y: [donor[1]],
        marker: { size: 16, symbol: "circle-open" },
      });

      traces.push({
        type: "scatter",
        mode: "markers",
        name: "получатель",
        x: [recv[0]],
        y: [recv[1]],
        marker: { size: 16, symbol: "x" },
      });

      // arrow line
      traces.push({
        type: "scatter",
        mode: "lines",
        name: "перенос массы",
        x: [donor[0], recv[0]],
        y: [donor[1], recv[1]],
        line: { width: 2, dash: "dash" },
        opacity: 0.75,
      });
    } else if (cls === 2) {
      const donor = P2[lastStep.donor_index];
      const recv = P2[lastStep.receiver_index];

      traces.push({
        type: "scatter",
        mode: "markers",
        name: "донор",
        x: [donor[0]],
        y: [donor[1]],
        marker: { size: 16, symbol: "circle-open" },
      });

      traces.push({
        type: "scatter",
        mode: "markers",
        name: "получатель",
        x: [recv[0]],
        y: [recv[1]],
        marker: { size: 16, symbol: "x" },
      });

      traces.push({
        type: "scatter",
        mode: "lines",
        name: "перенос массы",
        x: [donor[0], recv[0]],
        y: [donor[1], recv[1]],
        line: { width: 2, dash: "dash" },
        opacity: 0.75,
      });
    }
  }

  // axis ranges fixed
  const allX = [...p1x, ...p2x];
  const allY = [...p1y, ...p2y];
  const pad = 1.5;
  const xmin = Math.min(...allX) - pad;
  const xmax = Math.max(...allX) + pad;
  const ymin = Math.min(...allY) - pad;
  const ymax = Math.max(...allY) + pad;

  const layout: Partial<Layout> = {
    margin: { l: 50, r: 10, t: 40, b: 45 },
    title: { text: "MDM: оболочки + веса + объяснение шага" },
    paper_bgcolor: "#ffffff",
    plot_bgcolor: "#ffffff",
    xaxis: {
      title: { text: "x₁" },
      range: [xmin, xmax],
      zeroline: false,
      gridcolor: "#eef2f7",
      showline: true,
      linecolor: "#cbd5e1",
      ticks: "outside",
    },
    yaxis: {
      title: { text: "x₂" },
      range: [ymin, ymax],
      zeroline: false,
      gridcolor: "#eef2f7",
      scaleanchor: "x",
      showline: true,
      linecolor: "#cbd5e1",
      ticks: "outside",
    },
    legend: { orientation: "h" },
    transition: { duration: 300, easing: "cubic-in-out" },
  };

  return (
    <Plot
      data={traces}
      layout={layout}
      style={{ width: "100%", height: "560px" }}
      config={{ displayModeBar: true, responsive: true }}
    />
  );
}