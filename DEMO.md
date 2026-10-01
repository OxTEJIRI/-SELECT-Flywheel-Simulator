# Demo video script: $SELECT Flywheel Simulator

Goal: a viewer who has never heard of token.select finishes the video able to explain the flywheel in one sentence.

Audience: Select Foundation contest viewers and judges. Assume no prior knowledge.

Live app: https://select-flywheel-simulator.vercel.app/
Docs (source of truth): https://select.foundation/docs#select-token

Three cuts, all built from the same segments (see the end): **Full** (about 3:35, teaches everything), **Short** (about 1:30), **X** (about 35 seconds).

## The flywheel in one sentence

A launch succeeds and its price climbs, which pulls $SELECT off the open market into a locked pool, which makes the $SELECT every other launch is paired with stronger, and then the next launch does it again.

The video teaches it as **Migrate → Climb → Compound**, the same three words as the "How it works" section on the page. Every segment says which step it is on, so the viewer always knows where they are.

## Plain-language rules for the voiceover

- Say what a thing is the first time you use it. "Single-sided" means one token in the pool, waiting for buyers.
- One idea per segment. If a segment needs two ideas, split it.
- The same word for the same thing every time: **pool** (not vault or reactor), **locked**, **the centre** (the orange core), **launch** (one project).
- Short sentences. Speak at about 150 words a minute. The word counts below are sized to the timings.

## Setup

- Record at 1440×900 with sound on. The pool blips, the slider sweep, and the $GOOD chord are part of the show. Keep any music low so the voiceover stays clear.
- Start from `/?projects=1&multiple=1.0&preset=custom` so the first simulator frame is one empty pool. Open the page at the top for segment 1.
- Keyboard is the cleanest way to demo the sliders. Click the round **thumb** of a slider once to focus it (clicking anywhere else on the track jumps the value), then press the right-arrow key. Each press on **Launches** adds exactly one pool, with a sweep and a shockwave. On **Price multiple**, each press moves 0.1×.
- Move the cursor slowly. Pause on each readout for a full second. Reset to the start URL between takes.

## Full script

### Part 1: Introduction (what this is, and the roadmap)

| # | Time | On screen | Voiceover | Caption |
|---|---|---|---|---|
| 1 | 0:00–0:08 | Hero claim. The core fires a shockwave on load. | "Every successful launch is a permanent bid for $SELECT. In the next few minutes I'll show you exactly why." | None. The headline is on screen. |
| 2 | 0:08–0:27 | Scroll to **How it works** and rest on the **Migrate** card. | "token.select is a launchpad on Robinhood Chain. When a project launches and migrates, its liquidity allocation seeds two locked Uniswap pools. Ninety percent goes into a project-ETH pool. Ten percent goes into a project-$SELECT pool. That second pool is the whole story." | "90% project/ETH · 10% project/$SELECT" |
| 3 | 0:27–0:45 | Move across the three step cards as each word is said: Migrate, Climb, Compound. Then scroll back to the simulator. | "Here's the flywheel in three words. Migrate: the pools open. Climb: price rises and that second pool fills. Compound: the locked $SELECT strengthens the centre that every other launch is paired with. Then the next launch does it all again." | "Migrate → Climb → Compound" |
| 4 | 0:45–1:00 | Simulator at 1 launch, 1.0×. Move the cursor over the orange core, then one blue pool, then the legend, then the lock icon. | "Here's the simulator. The orange core is $SELECT. Each blue ring is one launch and its project-$SELECT pool. Orange squares are $SELECT leaving the open market. The lock means it can't be removed." | "Core = $SELECT · Ring = a launch · Lock = can't be removed" |

### Part 2: The flywheel, step by step

| # | Time | On screen | Voiceover | Caption |
|---|---|---|---|---|
| 5 | 1:00–1:17 | **Step 1, Migrate.** One pool: dashed red outline, empty. Readout **0**. Hover the pool so the tooltip shows. | "Step one, migrate. This launch has just migrated, and look at its pool: dashed red, empty. Zero $SELECT. It holds only the project's own token, set just above the launch price. That's what single-sided means: one token, waiting for buyers." | "Opens with 0 $SELECT" |
| 6 | 1:17–1:36 | **Step 2, Climb.** Click the **Price multiple** thumb, then press right-arrow 20 times, or drag, from 1.0× to 3.0×. Liquid rises, particles flow into the pool. Stop at **3.0m** pulled and **0.3%** of supply. | "Step two, climb. Now the price rises. Buyers push it up, and the pool pulls $SELECT off the open market to fill. Watch the orange rise and the counter climb. That much $SELECT has just left the market." | "Price climbs → $SELECT leaves the market" |
| 7 | 1:36–1:51 | Hold. Hover the lock in the legend, then the pool again. | "And it stays there. That liquidity is locked for the life of the project. It can't be pulled, shrunk, or burned. It isn't a treasury buy. It's the pool itself, filled by the market." | "Locked for life. Not a treasury buy." |
| 8 | 1:51–2:03 | **Step 3, Compound.** Click the **Launches** thumb and press right-arrow twice (1 to 3 launches). Each press adds a pool and a shockwave. Pause on 2 (**5.6m**) and on 3 (**7.8m**). | "Step three, compound. A second launch opens its own pool and repeats the loop. A third does it again. Each one adds another locked bid." | "Every launch adds another locked bid" |
| 9 | 2:03–2:26 | Click the **Ecosystem** chip. 8 pools at the same **3.0×**, readout jumps to **15.4m**, **1.5%**, lift index **101.5**. Point at the **Value lift** card. Then click the **Price multiple** thumb and press right-arrow 20 times to 5.0×: **30.8m**, **3.1%**, **103.1**. | "Here's a whole ecosystem: eight launches at the same price. The total pulled roughly doubles, because every pool is pulling. And the centre they all share gets tighter. So every other project paired with $SELECT is marked against a stronger centre. That's the lift. It's a relative index, not a price. Push the price higher and it keeps growing." | "8 launches · 1 shared centre" |

### Part 3: Who earns, why it's different, and the proof

| # | Time | On screen | Voiceover | Caption |
|---|---|---|---|---|
| 10 | 2:26–2:41 | Point at the **Protocol fee side** card. | "Who earns? Contributors earn a share of the trading fees on the project-ETH pool, for the life of the token. Those fees come from real trading, not emissions. Fees on the project-$SELECT pool go to the protocol." | "Contributors: ETH-pool fees for life · Protocol: $SELECT-pool fees" |
| 11 | 2:41–3:03 | Scroll to the comparison table. Move down the rows: Liquidity, Entry, Community, Shared demand. | "Compare that with a typical launchpad. There, liquidity can leave, you buy on a curve with snipers and bundles, and the community holds the bag. Here, liquidity is locked. Entry is a flat price with a per-wallet cap, refundable until the target is hit. The community earns fees, and every LP adds a $SELECT pool." | "Locked · Flat price · Fees for life" |
| 12 | 3:03–3:18 | Scroll back up. Click **$GOOD · 30m pulled**. The chord plays. Hold on **30.0m** and **3.0%** with "Reported by Select, not simulated." visible. | "Is this just theory? $GOOD alone has pulled thirty million $SELECT into its pool. That's three percent of supply. That figure is reported by Select, not simulated, and the simulator says so." | "$GOOD: 30m $SELECT · 3% of supply (reported by Select)" |
| 13 | 3:18–3:36 | Click **Share this state** so "Link copied" shows. End card: the URL and @selectfdn. | "So that's the flywheel. A launch succeeds. Price climbs. $SELECT leaves the market into a locked pool. The centre tightens for every paired launch. Then the next launch does it again. This is a model, not a quote. Try it yourself, link below." | "Model, not a quote." |

Readouts to expect on each take (these come from the model at those settings): 1 launch at 3.0× reads 3.0m / 0.3% / 100.3. 2 launches at 3.0×: 5.6m / 0.6% / 100.6. 3 launches: 7.8m / 0.8% / 100.8. Ecosystem (8 at 3.0×): 15.4m / 1.5% / 101.5. 8 at 5.0×: 30.8m / 3.1% / 103.1. $GOOD: 30.0m / 3.0% / 103.0.

## Short cut (about 1:30)

Segments 1, 4, 5, 6, 7, 9, 12, 13. Trim segment 1 to the claim, skip the How it works scroll, and in segment 6 add "The pool is locked for life" to the end of the voiceover so the lock beat is not lost.

## X cut (about 35 seconds)

Segments 5 (first two sentences only), 6, 9 (to the Ecosystem readout), and 12. Add the caption from the end of this file.

## Coverage check: every protocol rule in the app and where the video says it

| Rule (from DESIGN.md) | Said in segment |
|---|---|
| Hero claim: "Every successful launch is a permanent bid for $SELECT." | 1 |
| Network is Robinhood Chain | 2 |
| At migration, two locked Uniswap pools from the LP allocation: 90% project/ETH, 10% project/$SELECT | 2, 3 |
| project/$SELECT pool starts single-sided, only project tokens just above launch price, 0 $SELECT | 5 |
| As price climbs, buying pulls $SELECT from the open market into the pool | 6 |
| The pool does not start with $SELECT | 5 |
| Liquidity in both pools is locked for life: can't be pulled, shrunk, or burned | 2, 7 |
| The bid is protocol-made, not treasury-bought | 7 |
| Every other launch paired with $SELECT is marked against a stronger centre (value lift, relative index, not a price) | 9 |
| Fees on the project/$SELECT pool accrue to the protocol | 10 |
| Contributors earn a pro-rata share of project/ETH trading fees for life, from real trading, not emissions | 10 |
| Typical launchpad vs token.select (liquidity, entry, community, shared demand) | 11 |
| $GOOD: 30,000,000 $SELECT, 3% of supply, reported by Select, not simulated | 12 |
| Model, not a quote | 13 (and on the end card) |

## Accuracy rules for the voiceover

- Say "model" at least once and keep "Model, not a quote" on the end card.
- Never say APY, price target, or "guaranteed". Don't promise outcomes. Say "when price climbs", not "it will".
- The pool opens with **zero** $SELECT. Never imply it starts funded.
- The 90/10 split is a protocol rule, not a setting. Don't describe the 10% as adjustable. The app shows it locked.
- Only the $GOOD segment uses the 30m and 3% figures, and always as "reported by Select".
- The simulator shows no ETH amounts, market cap, or APY. Don't add any in narration.
- Don't claim the bid attracts more launches. The docs don't say that.

## If someone asks

- **Why does each launch pull less when there are many?** The model damps fill as launches increase so the total stays plausible, and caps total pulled at 25% of supply. The page says "Capped for the model" if the cap is hit.
- **Is this live chain data?** No. It is an educational model. Only the $GOOD figure is a reported real-world number.
- **Where does the 21.0× on the $GOOD preset come from?** It's the price multiple at which the model's formula would give 30m for one launch. The preset itself skips the formula and shows Select's reported number.

## Post caption

The bid is structural. Every token.select launch opens a project/$SELECT pool with zero $SELECT in it. As the project climbs, buying pulls $SELECT off the market into a locked pool. $GOOD alone: 30m $SELECT, 3% of supply. Model it: https://select-flywheel-simulator.vercel.app/ @selectfdn
