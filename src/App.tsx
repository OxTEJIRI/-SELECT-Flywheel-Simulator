import ControlPanel from './components/ControlPanel';
import Header from './components/Header';
import HowItWorks from './components/HowItWorks';
import MetricRail from './components/MetricRail';
import Stage from './components/Stage';
import { compute } from './model';
import { useSimState } from './useSimState';

export default function App() {
  const { state, setProjects, setMultiple, setPreset, reset, share } = useSimState();
  const out = compute(state);

  return (
    <>
      <Header onShare={share} />
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
            onPreset={setPreset}
            onReset={reset}
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
