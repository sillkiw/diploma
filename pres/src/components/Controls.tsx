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
    preset,
    setPreset,
    nPerClass,
    setNPerClass,
    eps,
    setEps,
    speedMs,
    setSpeedMs,
    running,
    onCreate,
    onStep,
    onRunToggle,
    onReset,
    disabled,
  } = props;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="flex min-w-[170px] flex-col gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Набор
        </span>
        <select
          value={preset}
          onChange={(e) => setPreset(e.target.value as PresetName)}
          disabled={disabled}
          className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none"
        >
          <option value="separable_blobs">Разделимые облака</option>
          <option value="noisy_outlier">Выброс</option>
          <option value="xor">XOR</option>
        </select>
      </label>

      <label className="flex w-[120px] flex-col gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Точек
        </span>
        <input
          type="number"
          min={5}
          max={500}
          value={nPerClass}
          onChange={(e) => setNPerClass(Number(e.target.value))}
          disabled={disabled}
          className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none"
        />
      </label>

      <label className="flex w-[140px] flex-col gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
          ε
        </span>
        <input
          type="number"
          step="0.000001"
          value={eps}
          onChange={(e) => setEps(Number(e.target.value))}
          disabled={disabled}
          className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none"
        />
      </label>

      <label className="flex w-[150px] flex-col gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Скорость, мс
        </span>
        <input
          type="number"
          min={30}
          max={2000}
          value={speedMs}
          onChange={(e) => setSpeedMs(Number(e.target.value))}
          disabled={disabled}
          className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none"
        />
      </label>

      <div className="ml-auto flex flex-wrap gap-2">
        <button
          onClick={onCreate}
          disabled={disabled}
          className="rounded-xl border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 disabled:opacity-50"
        >
          Новая
        </button>

        <button
          onClick={onReset}
          disabled={disabled}
          className="rounded-xl border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 disabled:opacity-50"
        >
          Сброс
        </button>

        <button
          onClick={onStep}
          disabled={disabled}
          className="rounded-xl border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 disabled:opacity-50"
        >
          Шаг
        </button>

        <button
          onClick={onRunToggle}
          disabled={disabled}
          className="rounded-xl border border-neutral-900 bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
        >
          {running ? "Пауза" : "Запуск"}
        </button>
      </div>
    </div>
  );
}