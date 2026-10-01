import { describe, expect, it } from 'vitest';
import { goodMultiple } from './model';
import { parseState, serializeState } from './useSimState';

describe('share url state', () => {
  it('round-trips custom state', () => {
    const s = { projects: 6, multiple: 4.2, preset: 'custom' as const };
    expect(serializeState(s)).toBe('projects=6&multiple=4.2&preset=custom');
    expect(parseState(serializeState(s))).toEqual(s);
  });
  it('restores presets', () => {
    expect(parseState('?preset=ecosystem')).toEqual({ projects: 8, multiple: 3, preset: 'ecosystem' });
    expect(parseState('?preset=good')).toEqual({ projects: 1, multiple: goodMultiple(), preset: 'good' });
  });
  it('clamps and falls back to defaults', () => {
    expect(parseState('?projects=99&multiple=-3')).toEqual({ projects: 12, multiple: 1, preset: 'custom' });
    expect(parseState('')).toEqual({ projects: 4, multiple: 2.5, preset: 'custom' });
    expect(parseState('?projects=abc&multiple=x')).toEqual({ projects: 4, multiple: 2.5, preset: 'custom' });
  });
});
