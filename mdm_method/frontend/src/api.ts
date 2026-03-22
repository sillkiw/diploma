import type { PresetName, SessionResponse, StepResponse, GeometryResponse, StateResponse } from "./types";

async function jsonFetch<T>(url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return (await res.json()) as T;
}

export function createSession(preset: PresetName, n_per_class: number, seed: number | null) {
  return jsonFetch<SessionResponse>("/api/session", { preset, n_per_class, seed });
}

export function stepSession(session_id: string) {
  return jsonFetch<StepResponse>("/api/step", { session_id });
}

export function getGeometry(session_id: string, span = 8.0) {
  return jsonFetch<GeometryResponse>("/api/geometry", { session_id, span });
}

export function getState(session_id: string) {
  return jsonFetch<StateResponse>(`/api/state?session_id=${encodeURIComponent(session_id)}`);
}

export function resetSession(session_id: string) {
  return jsonFetch<{ session_id: string; state: unknown }>(`/api/reset?session_id=${encodeURIComponent(session_id)}`, {});
}