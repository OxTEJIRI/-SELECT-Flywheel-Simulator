// Display formatting. Pair with the .num class (mono, tabular-nums) in tokens.css.

// 30_000_000 -> "30.0m". Below 1m falls back to k, below 1k to a whole number.
export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(Math.round(n));
}

// 0.03 -> "3.0%"
export function formatPct(share: number): string {
  return `${(share * 100).toFixed(1)}%`;
}

export function formatMultiple(multiple: number): string {
  return `${multiple.toFixed(1)}×`;
}

export function formatIndex(index: number): string {
  return index.toFixed(1);
}
