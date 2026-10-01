import { formatMultiple } from '../format';
import type { Inputs, Preset } from '../model';
import { MAX_MULTIPLE, MAX_PROJECTS, MIN_MULTIPLE, MIN_PROJECTS } from '../useSimState';

interface Props {
  state: Inputs;
  onProjects: (n: number) => void;
  onMultiple: (n: number) => void;
  onPreset: (p: Preset) => void;
  onReset: () => void;
}

export function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export default function ControlPanel({ state, onProjects, onMultiple, onPreset, onReset }: Props) {
  const isGood = state.preset === 'good';
  const chip = (preset: Preset, text: string, note?: string) => (
    <div className="chip-wrap">
      <button className="chip" aria-pressed={state.preset === preset} onClick={() => onPreset(preset)}>
        {text}
      </button>
      {note && <span className="chip-note">{note}</span>}
    </div>
  );

  return (
    <section className="panel controls" aria-labelledby="panel-title">
      <div>
        <h2 className="section-title" id="panel-title">Model a launch</h2>
        <p className="sub">Single-sided at open. Fills only as price climbs.</p>
      </div>

      <div className="chips" role="group" aria-label="Presets">
        {chip('custom', 'Custom')}
        {chip('good', '$GOOD · 30m pulled', '30m $SELECT · 3% of supply')}
        {chip('ecosystem', 'Ecosystem')}
      </div>

      <div className="field">
        <div className="field-head">
          <label className="label" htmlFor="projects">Launches pairing with $SELECT</label>
          <span className="num field-value">{state.projects}</span>
        </div>
        <input
          id="projects" type="range" min={MIN_PROJECTS} max={MAX_PROJECTS} step={1}
          value={state.projects} disabled={isGood}
          aria-valuetext={`${state.projects} ${state.projects === 1 ? 'launch' : 'launches'}`}
          onChange={(e) => onProjects(Number(e.target.value))}
        />
        <span className="caption">Each launch opens its own project/$SELECT pool.</span>
      </div>

      <div className="field">
        <div className="field-head">
          <label className="label" htmlFor="multiple">Price multiple from launch</label>
          <span className="num field-value">{formatMultiple(state.multiple)}</span>
        </div>
        <input
          id="multiple" type="range" min={MIN_MULTIPLE} max={MAX_MULTIPLE} step={0.1}
          value={Math.min(state.multiple, MAX_MULTIPLE)} disabled={isGood}
          aria-valuetext={`${state.multiple.toFixed(1)} times launch price`}
          onChange={(e) => onMultiple(Number(e.target.value))}
        />
        <span className="caption">1.0× is migration. The $SELECT side still holds nothing.</span>
      </div>

      <div className="field">
        <span className="label">Share of LP seeded to $SELECT</span>
        <div
          className="locked" tabIndex={0}
          title="Set by the factory. 90% seeds project/ETH. 10% seeds project/$SELECT."
        >
          <LockIcon />
          <span className="num">10% — protocol constant</span>
        </div>
      </div>

      <button className="reset" onClick={onReset}>Reset</button>
    </section>
  );
}
