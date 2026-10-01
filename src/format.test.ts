import { describe, expect, it } from 'vitest';
import { formatCompact, formatIndex, formatMultiple, formatPct } from './format';

describe('format', () => {
  it('formats compact amounts', () => {
    expect(formatCompact(30_000_000)).toBe('30.0m');
    expect(formatCompact(0)).toBe('0');
    expect(formatCompact(1_500)).toBe('1.5k');
  });
  it('formats percent, multiple, index', () => {
    expect(formatPct(0.03)).toBe('3.0%');
    expect(formatMultiple(2.5)).toBe('2.5×');
    expect(formatIndex(100)).toBe('100.0');
  });
});
