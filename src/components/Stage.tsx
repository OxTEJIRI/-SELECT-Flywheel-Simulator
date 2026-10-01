import { useMemo, useState, type CSSProperties } from 'react';
import { formatCompact, formatMultiple, formatPct } from '../format';
import { CAP, type Inputs, type Outputs } from '../model';
import { useTween } from '../useTween';
import { LockIcon } from './ControlPanel';

const W = 960;
const H = 640;
const CX = W / 2;
const CY = H / 2;
const RX = 340;
const RY = 215;
const MARKET_X = 70;
const BAR_W = 96; // 90% ETH / 10% $SELECT, drawn to scale

interface Particle {
  key: string;
  x0: number; y0: number; x1: number; y1: number;
  size: number; dur: number; delay: number;
}

// Particle count and speed scale with (multiple - 1). Zero at 1.0x.
function particlesPerStream(multiple: number): number {
  if (multiple <= 1) return 0;
  return Math.min(6, Math.ceil((multiple - 1) / 1.5));
}
// 2.4s linear, slowed when multiple is near 1.
function flowDuration(multiple: number): number {
  return 2.4 * (1 + Math.max(0, 2 - multiple));
}

export default function Stage({ inputs, out }: { inputs: Inputs; out: Outputs }) {
  const { projects, multiple, preset } = inputs;
  const [hover, setHover] = useState<number | null>(null);
  const share = useTween(out.shareOfSupply);
  // Visual scale only: each bar fills as the model total approaches its cap.
  const fill = useTween(Math.min(1, out.totalPulled / CAP));

  const nodes = useMemo(
    () =>
      Array.from({ length: projects }, (_, i) => {
        const a = -Math.PI / 2 + (2 * Math.PI * i) / projects;
        return {
          x: CX + RX * Math.cos(a),
          y: CY + RY * Math.sin(a),
          ticker: preset === 'good' ? 'GOOD' : `P${i + 1}`,
        };
      }),
    [projects, preset],
  );

  const count = particlesPerStream(multiple);
  const dur = flowDuration(multiple);
  const flowing = count > 0;

  const particles = useMemo(() => {
    const list: Particle[] = [];
    nodes.forEach((n, i) => {
      for (let k = 0; k < count; k++) {
        const delay = -(k / count) * dur;
        list.push({ key: `m${i}-${k}`, x0: MARKET_X, y0: CY, x1: n.x, y1: n.y, size: 4, dur, delay });
        list.push({ key: `c${i}-${k}`, x0: n.x, y0: n.y, x1: CX, y1: CY, size: 2, dur, delay });
      }
    });
    return list;
  }, [nodes, count, dur]);

  const hovered = hover !== null ? nodes[hover] : null;

  return (
    <div>
      <div className="canvas">
        <span className="annotation">project/$SELECT pool opens single-sided</span>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Diagram: $SELECT pulled from the open market into project pools">
          <text className="svg-label" x={16} y={CY - 8}>Open market</text>

          {nodes.map((n, i) => (
            <g key={`l${i}`} stroke="rgba(255,255,255,0.08)" strokeWidth="1">
              <line x1={MARKET_X} y1={CY} x2={n.x} y2={n.y} />
              <line x1={n.x} y1={n.y} x2={CX} y2={CY} />
            </g>
          ))}

          {particles.map((p) => (
            <rect
              key={p.key} className="particle" fill="#e7ff3d"
              x={-p.size / 2} y={-p.size / 2} width={p.size} height={p.size}
              style={{
                '--x0': p.x0, '--y0': p.y0, '--x1': p.x1, '--y1': p.y1,
                '--dur': `${p.dur}s`, '--delay': `${p.delay}s`,
              } as CSSProperties}
            />
          ))}

          {flowing && <circle className="pulse" cx={CX} cy={CY} r={48} fill="none" stroke="#e7ff3d" strokeWidth="2" />}
          <circle cx={CX} cy={CY} r={48} fill="#e7ff3d" />
          <text x={CX} y={CY + 5} textAnchor="middle" fill="#07080a" fontFamily="var(--font-ui)" fontWeight="500" fontSize="16">$SELECT</text>
          <text className="svg-mono" x={CX} y={CY + 76} textAnchor="middle">{formatPct(share)} of supply</text>
          <text className="svg-dim" x={CX} y={CY + 96} textAnchor="middle">Locked in pools. Not a treasury buy.</text>

          {nodes.map((n, i) => (
            <g
              key={`n${i}`} className="node" tabIndex={0}
              aria-label={`${n.ticker}: pool opened with 0 $SELECT`}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)} onBlur={() => setHover(null)}
            >
              <circle className="node-ring" cx={n.x} cy={n.y} r={28} fill="#101216" stroke="#7eb6ff" strokeWidth="1" />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#f4f1ea" fontFamily="var(--font-mono)" fontSize="12">{n.ticker}</text>
              <g transform={`translate(${n.x - BAR_W / 2}, ${n.y + 38})`}>
                <rect width={BAR_W * 0.9} height={6} fill="#c8cdd6" />
                <rect
                  x={BAR_W * 0.9} width={BAR_W * 0.1} height={6} fill="none"
                  stroke={out.totalPulled === 0 ? '#e85d4c' : 'rgba(255,255,255,0.16)'} strokeWidth="1"
                />
                <rect className="bar-fill" x={BAR_W * 0.9} width={BAR_W * 0.1 * Math.max(0, fill)} height={6} fill="#e7ff3d" />
                <text className="svg-label" x={0} y={20}>ETH 90</text>
                <text className="svg-label" x={BAR_W} y={20} textAnchor="end">SELECT</text>
              </g>
            </g>
          ))}
        </svg>

        {hovered && (
          <div className="tooltip" style={{ left: `${(hovered.x / W) * 100}%`, top: `${(hovered.y / H) * 100}%` }} role="tooltip">
            Pool opened with 0 $SELECT. At <span className="num">{formatMultiple(multiple)}</span> this model holds{' '}
            <span className="num">{formatCompact(out.perLaunchPulled)}</span> $SELECT, locked.
          </div>
        )}
      </div>

      <div className="legend">
        <span><i className="sw-square" /> $SELECT pulled from market</span>
        <span><i className="sw-ring" /> a launch</span>
        <span><LockIcon /> liquidity cannot be removed</span>
      </div>
    </div>
  );
}
