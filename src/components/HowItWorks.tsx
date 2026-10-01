const STEPS = [
  {
    title: 'Migrate',
    body: '90% of LP seeds project/ETH. 10% seeds project/$SELECT. The $SELECT side holds only the project token, set just above launch price.',
  },
  {
    title: 'Climb',
    body: 'Buys route through the project pools. As price rises, the single-sided pool pulls $SELECT off the market to fill.',
  },
  {
    title: 'Compound',
    body: 'That $SELECT is locked. The bid is protocol-made, not treasury-bought. Every other launch paired with $SELECT is marked against a stronger centre.',
  },
];

const ROWS: [string, string, string][] = [
  ['Liquidity', 'Can leave', 'Locked for life'],
  ['Entry', 'Curve, snipers, bundles', 'Flat price, per-wallet cap, refundable until target'],
  ['Community', 'Holds the bag', 'Earns trading fees for life'],
  ['Shared demand', 'None', '10% of every LP is a $SELECT pool that fills on the way up'],
];

export default function HowItWorks() {
  return (
    <section className="how" id="how" aria-labelledby="how-title">
      <h2 className="section-title" id="how-title">How it works</h2>
      <div className="steps">
        {STEPS.map((s, i) => (
          <div className="panel step" key={s.title}>
            <span className="label num">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      <div className="panel" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr><th /><th>Typical launchpad</th><th>token.select</th></tr>
          </thead>
          <tbody>
            {ROWS.map(([k, a, b]) => (
              <tr key={k}><th scope="row">{k}</th><td>{a}</td><td>{b}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="source">
        Mechanics from{' '}
        <a href="https://select.foundation/docs#select-token" target="_blank" rel="noopener noreferrer">Select Foundation docs</a>.
        {' '}$GOOD figure from @selectfdn, 28 Sep 2026: 30m $SELECT, 3% of supply.
      </p>
    </section>
  );
}
