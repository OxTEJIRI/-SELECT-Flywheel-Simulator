import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { formatCompact, formatMultiple, formatPct } from '../format';
import { type Inputs, type Outputs } from '../model';
import * as sfx from '../sound';
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
const POOL_R = 28;
// Visual scale only: a pool vessel reads "full" at this much $SELECT per launch.
const POOL_VISUAL_FULL = 15_000_000;

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
  const level = Math.max(0, useTween(Math.min(1, out.perLaunchPulled / POOL_VISUAL_FULL)));

  // Shockwave rings from the core whenever a control moves (and once on load).
  const [shock, setShock] = useState(1);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setShock((s) => s + 1);
  }, [projects, multiple, preset]);

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

  // One soft blip per pool fill while $SELECT is flowing.
  const levelRef = useRef(level);
  levelRef.current = level;
  useEffect(() => {
    if (!flowing) return;
    const perSecond = (projects * count) / dur;
    const id = window.setInterval(() => sfx.blip(levelRef.current), Math.max(130, 1000 / perSecond));
    return () => window.clearInterval(id);
  }, [flowing, projects, count, dur]);

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
  const glow = 0.05 + Math.min(0.3, share * 2.2);

  return (
    <div>
      <div className="canvas" style={{ '--glow': glow } as CSSProperties}>
        <i className="bracket tl" /><i className="bracket tr" /><i className="bracket bl" /><i className="bracket br" />
        <span className="annotation">project/$SELECT pool opens single-sided</span>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Diagram: $SELECT pulled from the open market into project pools">
          <defs>
            <radialGradient id="core-fill" cx="42%" cy="38%" r="70%">
              <stop offset="0%" stopColor="#ffe2c4" />
              <stop offset="45%" stopColor="#ff8a3d" />
              <stop offset="100%" stopColor="#d44a00" />
            </radialGradient>
            <radialGradient id="halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff6a1a" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ff6a1a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffb36b" />
              <stop offset="100%" stopColor="#ff6a1a" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {nodes.map((n, i) => (
              <clipPath id={`pool-${i}`} key={i}><circle cx={n.x} cy={n.y} r={POOL_R - 2} /></clipPath>
            ))}
          </defs>

          <ellipse className="orbit" cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="rgba(244,239,230,0.12)" strokeDasharray="2 10" />
          <text className="svg-label" x={16} y={CY - 8}>Open market</text>

          {nodes.map((n, i) => (
            <g key={`l${i}`} stroke="rgba(244,239,230,0.08)" strokeWidth="1">
              <line x1={MARKET_X} y1={CY} x2={n.x} y2={n.y} />
              <line x1={n.x} y1={n.y} x2={CX} y2={CY} />
            </g>
          ))}

          {particles.map((p) => (
            <rect
              key={p.key} className="particle" fill="#ffb36b"
              x={-p.size / 2} y={-p.size / 2} width={p.size} height={p.size}
              style={{
                '--x0': p.x0, '--y0': p.y0, '--x1': p.x1, '--y1': p.y1,
                '--dur': `${p.dur}s`, '--delay': `${p.delay}s`,
              } as CSSProperties}
            />
          ))}

          {/* Core */}
          <circle cx={CX} cy={CY} r={96} fill="url(#halo)" opacity={0.35 + Math.min(0.65, share * 4)} />
          {shock > 0 && (
            <>
              <circle key={`s1-${shock}`} className="shock" cx={CX} cy={CY} r={48} fill="none" stroke="#ff6a1a" strokeWidth="2" />
              <circle key={`s2-${shock}`} className="shock s2" cx={CX} cy={CY} r={48} fill="none" stroke="#ffb36b" strokeWidth="1" />
            </>
          )}
          <circle className="spin" cx={CX} cy={CY} r={62} fill="none" stroke="rgba(255,179,107,0.55)" strokeWidth="1" strokeDasharray="4 9" />
          <g className={flowing ? 'breathe' : undefined}>
            <circle cx={CX} cy={CY} r={48} fill="url(#core-fill)" filter="url(#glow)" />
            <text x={CX} y={CY + 6} textAnchor="middle" fill="#1a0e04" fontFamily="var(--font-ui)" fontWeight="700" fontSize="17">$SELECT</text>
          </g>
          <text className="svg-mono" x={CX} y={CY + 80} textAnchor="middle">{formatPct(share)} of supply</text>
          <text className="svg-dim" x={CX} y={CY + 100} textAnchor="middle">Locked in pools. Not a treasury buy.</text>

          {/* Project pools */}
          {nodes.map((n, i) => {
            const top = n.y + POOL_R - 2 - (POOL_R - 2) * 2 * level;
            return (
              <g
                key={`n${i}`} className="node" tabIndex={0}
                aria-label={`${n.ticker}: pool opened with 0 $SELECT`}
                onMouseEnter={() => { setHover(i); sfx.tick(); }} onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)} onBlur={() => setHover(null)}
              >
                {flowing && (
                  <circle
                    className="absorb" cx={n.x} cy={n.y} r={POOL_R} fill="none" stroke="#ff6a1a" strokeWidth="2"
                    style={{ '--p': `${dur / count}s`, '--d': `${(i * 0.17) % 1}s` } as CSSProperties}
                  />
                )}
                <circle cx={n.x} cy={n.y} r={POOL_R} fill="#0c0b0a" />
                {level > 0.004 && (
                  <g clipPath={`url(#pool-${i})`}>
                    <rect x={n.x - POOL_R} y={top} width={POOL_R * 2} height={POOL_R * 2} fill="url(#liquid)" />
                    <path
                      className="wave" fill="url(#liquid)"
                      d={`M${n.x - 56},${top} q14,-5 28,0 t28,0 t28,0 t28,0 t28,0 V${n.y + POOL_R} H${n.x - 56} Z`}
                    />
                  </g>
                )}
                <circle
                  className="node-ring" cx={n.x} cy={n.y} r={POOL_R} fill="none" strokeWidth="1.5"
                  stroke={level === 0 ? '#e85d4c' : '#7eb6ff'} strokeDasharray={level === 0 ? '3 3' : undefined}
                />
                <text
                  x={n.x} y={n.y + 4} textAnchor="middle" fill="#f4efe6" fontFamily="var(--font-mono)" fontSize="12"
                  stroke="#000" strokeWidth="3" paintOrder="stroke"
                >
                  {n.ticker}
                </text>
                <g transform={`translate(${n.x - BAR_W / 2}, ${n.y + 38})`}>
                  <rect width={BAR_W * 0.9} height={6} rx={3} fill="#c8cdd6" />
                  <rect
                    x={BAR_W * 0.9} width={BAR_W * 0.1} height={6} rx={3} fill="none"
                    stroke={level === 0 ? '#e85d4c' : 'rgba(244,239,230,0.18)'} strokeWidth="1"
                  />
                  <rect className="bar-fill" x={BAR_W * 0.9} width={BAR_W * 0.1 * level} height={6} rx={3} fill="#ff6a1a" />
                  <text className="svg-label" x={0} y={20}>ETH 90</text>
                  <text className="svg-label" x={BAR_W} y={20} textAnchor="end">SELECT</text>
                </g>
              </g>
            );
          })}
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
