import { useCallback, useState } from 'react';
import { PRESETS, type Inputs, type Preset } from './model';

export const DEFAULTS: Inputs = { projects: 4, multiple: 2.5, preset: 'custom' };
export const MIN_PROJECTS = 1;
export const MAX_PROJECTS = 12;
export const MIN_MULTIPLE = 1;
export const MAX_MULTIPLE = 10;

const round1 = (n: number) => Math.round(n * 10) / 10;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

// Share URL keys: projects, multiple (one decimal), preset.
export function serializeState(s: Inputs): string {
  return `projects=${s.projects}&multiple=${s.multiple.toFixed(1)}&preset=${s.preset}`;
}

export function parseState(search: string): Inputs {
  const q = new URLSearchParams(search);
  const rawPreset = q.get('preset');
  if (rawPreset === 'good' || rawPreset === 'ecosystem') {
    return { ...PRESETS[rawPreset], preset: rawPreset };
  }
  const projects = Number(q.get('projects'));
  const multiple = Number(q.get('multiple'));
  return {
    projects: Number.isFinite(projects) && q.has('projects')
      ? clamp(Math.round(projects), MIN_PROJECTS, MAX_PROJECTS)
      : DEFAULTS.projects,
    multiple: Number.isFinite(multiple) && q.has('multiple')
      ? round1(clamp(multiple, MIN_MULTIPLE, MAX_MULTIPLE))
      : DEFAULTS.multiple,
    preset: 'custom',
  };
}

export function useSimState() {
  const [state, setState] = useState<Inputs>(() => parseState(window.location.search));

  const setProjects = useCallback(
    (projects: number) => setState((s) => ({ ...s, projects, preset: 'custom' })),
    [],
  );
  const setMultiple = useCallback(
    (multiple: number) => setState((s) => ({ ...s, multiple, preset: 'custom' })),
    [],
  );
  const setPreset = useCallback((preset: Preset) => {
    setState((s) => (preset === 'custom' ? { ...s, preset } : { ...PRESETS[preset], preset }));
  }, []);
  const reset = useCallback(() => setState(DEFAULTS), []);

  // Writes the current controls into the query string and returns the URL.
  const share = useCallback(() => {
    const url = `${window.location.origin}${window.location.pathname}?${serializeState(state)}`;
    window.history.replaceState(null, '', `?${serializeState(state)}${window.location.hash}`);
    return url;
  }, [state]);

  return { state, setProjects, setMultiple, setPreset, reset, share };
}
