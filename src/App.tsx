import { useCallback, useEffect, useRef, useState } from 'react';
import ControlPanel from './components/ControlPanel';
import Header from './components/Header';
import HowItWorks from './components/HowItWorks';
import MetricRail from './components/MetricRail';
import Stage from './components/Stage';
import { compute, type Preset } from './model';
import * as sfx from './sound';
import { useSimState } from './useSimState';

const SOUND_KEY = 'flywheel-sound';

function readSound(): boolean {
  try {
    return window.localStorage.getItem(SOUND_KEY) !== 'off';
  } catch {
    return true;
  }
}

export default function App() {
  const { state, setProjects, setMultiple, setPreset, reset, share } = useSimState();
  const out = compute(state);

  const [soundOn, setSoundOn] = useState(readSound);
  useEffect(() => {
    sfx.installUnlock();
  }, []);
  useEffect(() => {
    sfx.setEnabled(soundOn);
  }, [soundOn]);
  const toggleSound = () => {
    const next = !soundOn;
    sfx.setEnabled(next);
    setSoundOn(next);
    try {
      window.localStorage.setItem(SOUND_KEY, next ? 'on' : 'off');
    } catch {
      // Preference just won't persist.
    }
    if (next) window.setTimeout(sfx.chime, 0);
  };

  // Sweep while a slider moves (not for preset jumps, which get their own sound).
  const fromPreset = useRef(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (fromPreset.current) { fromPreset.current = false; return; }
    sfx.sweep(state.multiple);
  }, [state.projects, state.multiple]);

  const onPreset = useCallback((p: Preset) => {
    fromPreset.current = true;
    if (p === 'good') sfx.bid();
    else sfx.chime();
    setPreset(p);
  }, [setPreset]);

  const onShare = () => {
    sfx.chime();
    return share();
  };

  const onReset = () => {
    fromPreset.current = true;
    sfx.down();
    reset();
  };

  return (
    <>
      <Header onShare={onShare} soundOn={soundOn} onToggleSound={toggleSound} />
      <main className="wrap" id="simulator">
        <section className="hero">
          <h1>Every successful launch is a permanent bid for <em>$SELECT</em>.</h1>
          <p>
            The project/$SELECT pool starts empty of $SELECT. Price climbing is what fills it. One winner tightens the
            float for every other launch.
          </p>
        </section>

        <div className="sim">
          <div className="stage-col">
            <Stage inputs={state} out={out} />
            <MetricRail out={out} />
          </div>
          <ControlPanel
            state={state}
            onProjects={setProjects}
            onMultiple={setMultiple}
            onPreset={onPreset}
            onReset={onReset}
          />
        </div>

        <HowItWorks />

        <footer className="footer" id="proof">
          <p className="disclaimer">
            Educational model of the mechanism described in the Select Foundation docs. Not an offer, not a forecast, not
            chain data. Liquidity lock, 90/10 split, and single-sided open are protocol rules. The $GOOD 30m figure is
            Select’s reported example.
          </p>
        </footer>
      </main>
    </>
  );
}
