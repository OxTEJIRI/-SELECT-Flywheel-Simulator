// Pure model for the $SELECT flywheel simulator. See DESIGN.md section 4.
// Model, not a quote: no ETH amounts, market cap, or APY.

export const SUPPLY = 1_000_000_000;
export const SELECT_POOL_SHARE = 0.1; // protocol constant: 10% of LP seeds project/$SELECT
export const GOOD_PULLED = 30_000_000; // reported by Select, not simulated

// $SELECT pulled per launch per 1.0x of price climb, before dampening.
export const BASE_UNIT = 1_500_000;
// Model-wide cap on total pulled, as a share of supply.
export const CAP_SHARE = 0.25;
export const CAP = SUPPLY * CAP_SHARE;
// Dampener slope: each extra launch reduces per-launch fill.
export const DAMPENER_SLOPE = 0.08;

export type Preset = 'custom' | 'good' | 'ecosystem';

export interface Inputs {
  projects: number; // 1-12
  multiple: number; // 1.0-10.0
  preset: Preset;
}

export interface Outputs {
  perLaunchPulled: number;
  totalPulled: number;
  shareOfSupply: number; // 0..1
  liftIndex: number;
  clamped: boolean;
  reported: boolean; // true when the figure is Select's reported number, not simulated
}

// dampener = 1 / (1 + 0.08 * (projects - 1))
export function dampener(projects: number): number {
  return 1 / (1 + DAMPENER_SLOPE * (projects - 1));
}

// Per launch: 0 if multiple <= 1, else BASE_UNIT * (multiple - 1) * dampener.
export function perLaunchPulled(multiple: number, projects: number): number {
  if (multiple <= 1) return 0;
  return BASE_UNIT * (multiple - 1) * dampener(projects);
}

// Multiple at which the formula would give GOOD_PULLED for a single launch
// (dampener = 1 at projects = 1): 1 + GOOD_PULLED / BASE_UNIT.
export function goodMultiple(): number {
  return 1 + GOOD_PULLED / BASE_UNIT;
}

// lift = 100 + (totalPulled / SUPPLY) * 100. Relative index, not a price.
export function liftIndex(totalPulled: number): number {
  return 100 + (totalPulled / SUPPLY) * 100;
}

export const PRESETS: Record<Exclude<Preset, 'custom'>, { projects: number; multiple: number }> = {
  good: { projects: 1, multiple: goodMultiple() },
  ecosystem: { projects: 8, multiple: 3 },
};

export function compute({ projects, multiple, preset }: Inputs): Outputs {
  if (preset === 'good') {
    // Bypasses the formula: one launch, reported figure.
    return {
      perLaunchPulled: GOOD_PULLED,
      totalPulled: GOOD_PULLED,
      shareOfSupply: GOOD_PULLED / SUPPLY,
      liftIndex: liftIndex(GOOD_PULLED),
      clamped: false,
      reported: true,
    };
  }

  const per = perLaunchPulled(multiple, projects);
  const raw = per * projects;
  const clamped = raw > CAP;
  const totalPulled = clamped ? CAP : raw;
  return {
    perLaunchPulled: clamped ? CAP / projects : per,
    totalPulled,
    shareOfSupply: totalPulled / SUPPLY,
    liftIndex: liftIndex(totalPulled),
    clamped,
    reported: false,
  };
}
