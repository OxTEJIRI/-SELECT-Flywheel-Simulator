import { formatCompact, formatIndex, formatPct } from '../format';
import type { Outputs } from '../model';
import { useTween } from '../useTween';

export default function MetricRail({ out }: { out: Outputs }) {
  const pulled = useTween(out.totalPulled);
  const share = useTween(out.shareOfSupply);
  const lift = useTween(out.liftIndex);

  return (
    <div className="rail" aria-label="Metrics">
      <div className="panel card">
        <span className="label">$SELECT pulled from market</span>
        <span className="num big accent">{formatCompact(pulled)}</span>
        <p>into locked project pools</p>
        {out.reported && <p className="note">Reported by Select, not simulated.</p>}
        {out.clamped && (
          <p className="note">Capped for the model. Real fill depends on liquidity range, volume, and routing.</p>
        )}
      </div>

      <div className="panel card">
        <span className="label">Share of 1B supply</span>
        <span className="num big">{formatPct(share)}</span>
      </div>

      <div className="panel card">
        <span className="label">Value lift to other paired pools</span>
        <span className="num big">{formatIndex(lift)}</span>
        <p>Relative bid index. Not a price.</p>
        <p>A higher $SELECT bid reprices every other project/$SELECT pool.</p>
      </div>

      <div className="panel card">
        <span className="label">Protocol fee side</span>
        <p>
          Fees on the $SELECT pool accrue to the protocol. Contributor fees sit on the ETH pool, for the life of the token.
        </p>
      </div>

      <p className="rail-foot">
        Model, not a quote. Pool opens with 0 $SELECT. Fill is a function of price climbing after migration.
      </p>
    </div>
  );
}
