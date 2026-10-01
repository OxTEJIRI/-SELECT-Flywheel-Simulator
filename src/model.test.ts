import { describe, expect, it } from 'vitest';
import { CAP, GOOD_PULLED, SUPPLY, compute } from './model';

describe('model', () => {
  it('multiple 1.0 pulls exactly 0', () => {
    for (let projects = 1; projects <= 12; projects++) {
      const out = compute({ projects, multiple: 1.0, preset: 'custom' });
      expect(out.totalPulled).toBe(0);
      expect(out.perLaunchPulled).toBe(0);
      expect(out.liftIndex).toBe(100);
    }
  });

  it('GOOD preset equals 30_000_000 (3% of supply)', () => {
    const out = compute({ projects: 1, multiple: 1, preset: 'good' });
    expect(out.totalPulled).toBe(GOOD_PULLED);
    expect(out.shareOfSupply).toBeCloseTo(0.03, 10);
    expect(out.reported).toBe(true);
  });

  it('total never exceeds 25% of supply', () => {
    for (let projects = 1; projects <= 12; projects++) {
      for (let tenths = 10; tenths <= 100; tenths++) {
        const out = compute({ projects, multiple: tenths / 10, preset: 'custom' });
        expect(out.totalPulled).toBeLessThanOrEqual(0.25 * SUPPLY);
      }
    }
    // Beyond the slider range the clamp engages and is flagged.
    const out = compute({ projects: 12, multiple: 1000, preset: 'custom' });
    expect(out.totalPulled).toBe(CAP);
    expect(out.clamped).toBe(true);
  });
});
