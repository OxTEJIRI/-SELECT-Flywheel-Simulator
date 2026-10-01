# Demo video script: $SELECT Flywheel Simulator

Target: about 85 seconds, desktop screen recording with voiceover. Audience: Select Foundation contest viewers and judges who may not know the mechanism yet.

Live app: https://select-flywheel-simulator.vercel.app/

## The flywheel in one breath

A launch succeeds and its price climbs. That climb pulls $SELECT off the open market into the launch's locked project/$SELECT pool. Locked $SELECT is out of circulation for good, so every other launch paired with $SELECT is marked against a stronger centre. The next launch does the same thing again. Each turn adds another permanent bid.

Say it in four beats, in this order, and the demo shows each one on screen:

1. **Opens empty.** The project/$SELECT pool starts with 0 $SELECT.
2. **Price fills it.** Buying as price climbs pulls $SELECT off the market into the pool.
3. **It stays locked.** Liquidity cannot be pulled, shrunk, or burned. It is not a treasury buy.
4. **Every launch repeats it.** More launches means more locked pools, and a stronger centre for all of them.

## Why this order demos well

Start with one launch so the viewer sees a single pool, one slider, and one clear cause and effect. Only then add launches. Adding launches one at a time is the flywheel turning, and the counters make it visible: each new pool adds to the same running total.

## Setup

- Record at 1440×900 with sound on. The pool blips, the slider sweep, and the $GOOD chord are part of the show. Keep any music low.
- Start from `/?projects=1&multiple=1.0&preset=custom` so the first frame is one empty pool.
- Use the mouse for the price slider. For launches, click the slider once, then tap the right-arrow key. Each tap adds exactly one pool, with a sweep and a shockwave. That is the cleanest way to show the loop repeating.
- Move slowly. Pause on each readout for a full second.

## Script

| Time | On screen | Voiceover | Caption |
|---|---|---|---|
| 0:00–0:06 | Hero claim. The core fires a shockwave on load. | "Every successful launch is a permanent bid for $SELECT. Here is how that works, in under two minutes." | None. The headline is on screen. |
| 0:06–0:18 | One pool, empty, dashed red outline. Hover it so the tooltip shows. | "Every token.select launch opens a project/$SELECT pool. And it opens with zero $SELECT in it. Single-sided: only the project's own token, just above launch price." | "Opens with 0 $SELECT" |
| 0:18–0:34 | Drag **Price multiple** from 1.0× to 5.0×. Liquid rises, particles flow into the pool, then into the core. Pause when "$SELECT pulled from market" reads **6.0m** and share reads **0.6%**. | "Price climbing is what fills it. As buyers push the price up, the pool pulls $SELECT off the open market. Watch the amount pulled count up. That is real demand for $SELECT, created by one launch doing well." | "Price climbs → $SELECT leaves the market" |
| 0:34–0:44 | Hold. Point at the lock in the legend, then hover the pool again. | "And it doesn't come back. That liquidity is locked for the life of the project. It can't be pulled, shrunk, or burned. This isn't a treasury buy. The protocol makes the bid." | "Locked for life. Not a treasury buy." |
| 0:44–1:02 | Click the Launches slider and tap right-arrow seven times, pausing briefly on 2, 4, and 8. Each tap adds a pool and a shockwave. End on 8 launches: **30.8m**, **3.1%**, lift index **103.1**. | "Now the flywheel. Every new launch repeats the loop. Another pool, another locked bid. The pulled total keeps growing, and the $SELECT at the centre gets tighter. Every other project paired with $SELECT is marked against a stronger centre. That's the value lift. It's a relative index, not a price." | "Every launch adds another locked bid" |
| 1:02–1:14 | Click **$GOOD · 30m pulled**. Chord plays. Hold on **30.0m** and **3.0%** with "Reported by Select, not simulated" visible. | "And this isn't only a model. $GOOD alone has pulled 30 million $SELECT into its pool. That's 3% of supply. That number is Select's reported figure, and the simulator labels it that way." | "$GOOD: 30m $SELECT · 3% of supply" |
| 1:14–1:24 | Scroll to **How it works**: Migrate, Climb, Compound. Scroll back up and click **Share this state** so "Link copied" shows. End card: URL and @selectfdn. | "Migrate, climb, compound. Liquidity locked, contributors earning fees for life. Model it yourself. The link is below." | "Model, not a quote." |

The readouts above are what the model produces at those settings, so you can check each take against them.

## Accuracy rules for the voiceover

- Say "model" at least once. Keep "Model, not a quote" on screen at the end.
- Never say APY, price target, "guaranteed", or "will". Use "can" and "when price climbs".
- The pool opens with **zero** $SELECT. Never imply it starts funded.
- The 90/10 split is a protocol rule, not a setting. Don't describe the 10% as adjustable.
- Only the $GOOD segment uses the 30m and 3% figures, and always as "reported by Select".
- Fees: contributors earn fees on the project/ETH pool for the life of the token. Fees on the project/$SELECT pool accrue to the protocol.

## Short cut (about 30 seconds, for X)

Use these segments with their same voiceover lines: 0:06–0:18 (opens empty), 0:18–0:34 (price fills it), 0:44–1:02 trimmed to 2 to 8 launches (every launch repeats it), and 1:02–1:14 (the $GOOD proof). Drop the lock beat and the how-it-works scroll, and say "locked" in the climb line instead.

## If someone asks

- **Why do larger launch counts pull less per launch?** The model damps fill as launches increase so the total stays plausible. It is capped at 25% of supply, and the page says "Capped for the model" if that happens.
- **Is this live chain data?** No. It is an educational model. Only the $GOOD figure is a reported real-world number.

## Post caption

The bid is structural. Every token.select launch opens a project/$SELECT pool with zero $SELECT in it. As the project climbs, buying pulls $SELECT off the market into a locked pool. $GOOD alone: 30m $SELECT, 3% of supply. Model it: https://select-flywheel-simulator.vercel.app/ @selectfdn
