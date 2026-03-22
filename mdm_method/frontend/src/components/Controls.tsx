import type { PresetName } from "../types";

type Props = {
  preset: PresetName;
  setPreset: (p: PresetName) => void;
  nPerClass: number;
  setNPerClass: (n: number) => void;
  seed: number;
  setSeed: (s: number) => void;
  eps: number;
  setEps: (e: number) => void;
  speedMs: number;
  setSpeedMs: (v: number) => void;

  running: boolean;
  onCreate: () => void;
  onStep: () => void;
  onRunToggle: () => void;
  onReset: () => void;
  disabled?: boolean;
};

export function Controls(props: Props) {
  const {
    preset, setPreset, nPerClass, setNPerClass, seed, setSeed,
    eps, setEps, speedMs, setSpeedMs,
    running, onCreate, onStep, onRunToggle, onReset,
    disabled,
  } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Набор данных</div>
        <select
          value={preset}
          onChange={(e) => setPreset(e.target.value as PresetName)}
          disabled={disabled}
          style={{ width: "100%", padding: 8 }}
        >
          <option value="separable_blobs">Разделимые облака</option>
          <option value="noisy_outlier">Выбросы (ломают hard-margin)</option>
          <option value="xor">XOR (нелинейная задача)</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <label>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Точек/класс</div>
          <input
            type="number"
            min={5}
            max={500}
            value={nPerClass}
            onChange={(e) => setNPerClass(Number(e.target.value))}
            disabled={disabled}
            style={{ width: "100%", padding: 8 }}
          />
        </label>
        <label>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Seed</div>
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            disabled={disabled}
            style={{ width: "100%", padding: 8 }}
          />
        </label>
      </div>

      <label>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Точность ε (критерий остановки)</div>
        <input
          type="number"
          step="0.000001"
          value={eps}
          onChange={(e) => setEps(Number(e.target.value))}
          disabled={disabled}
          style={{ width: "100%", padding: 8 }}
        />
      </label>

      <label>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Скорость (мс между шагами)</div>
        <input
          type="number"
          min={30}
          max={2000}
          value={speedMs}
          onChange={(e) => setSpeedMs(Number(e.target.value))}
          disabled={disabled}
          style={{ width: "100%", padding: 8 }}
        />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <button onClick={onCreate} style={{ padding: 10 }} disabled={disabled}>
          Новая сессия
        </button>
        <button onClick={onReset} style={{ padding: 10 }} disabled={disabled}>
          Сброс
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <button onClick={onStep} style={{ padding: 10 }} disabled={disabled}>
          Шаг
        </button>
        <button onClick={onRunToggle} style={{ padding: 10 }} disabled={disabled}>
          {running ? "Пауза" : "Запуск"}
        </button>
      </div>

    
    </div>
  );
}