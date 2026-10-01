# DESIGN.md — $SELECT Flywheel Simulator

Interactive single-page explainer for Select Foundation’s Week 3 contest.
Goal: make the structural bid for $SELECT undeniable. One successful launch pulls $SELECT off the market into a locked pool; that bid lifts every other launch paired with $SELECT.

Public claim (must appear above the fold):
“Every successful launch is a permanent bid for $SELECT.”

Accuracy rules (do not violate):
- Total $SELECT supply is 1,000,000,000. Network is Robinhood Chain.
- At migration each project seeds two locked Uniswap pools from its LP allocation: 90% project/ETH, 10% project/$SELECT.
- The project/$SELECT pool starts single-sided: only the project’s tokens, concentrated just above the launch price, holding 0 $SELECT.
- As the project price climbs, buying pulls $SELECT from the open market into that pool. The pool does not start with $SELECT.
- Liquidity in both pools stays locked for the life of the project. It cannot be pulled, shrunk, or burned.
- Fees on the project/$SELECT pool accrue to the protocol (in project tokens and $SELECT).
- Contributors earn a pro-rata share of trading fees on the project/ETH pool for the life of the token. Fees come from real trading, not emissions.
- Official proof point: $GOOD alone has pulled 30,000,000 $SELECT into its pool (3% of supply). Use this as a preset, not as a live claim that the simulator is reading chain state.
- Do not invent APYs, price targets, or guarantees. The simulator shows the mechanism, labeled as a model.
- Source of truth: https://select.foundation/docs#select-token and the contest post by @selectfdn.

Stack:
- Vite + React + TypeScript
- No backend. All state is client-side.
- Animation: CSS + a small requestAnimationFrame loop, or Framer Motion if already justified. Prefer CSS for the token particles.
- Fonts: "Geist" or "Inter" for UI, "Geist Mono" or "IBM Plex Mono" for numbers. Load from Fontshare or Google Fonts.
- Deploy target: Vercel. Repo: GitHub.
- Responsive: desktop-first (1440), solid at 1280, usable at 390. The contest entry will be screen-recorded on desktop.

Out of scope:
- Wallet connect, real swaps, live chain reads, auth, CMS.
- More than one route. Optional hash routes only: #simulator (default), #how, #proof.

---

## 1. Information architecture

Single page, three regions stacked. No marketing nav clutter.

1. Header (sticky, 64px)
2. Hero claim + simulator stage (the product)
3. Proof + how-it-works strip (accuracy footer so a judge can verify)

Header left: wordmark “SELECT” + small label “Flywheel simulator”.
Header right: text button “How it works” (scrolls to #how), text button “Docs” (external, select.foundation/docs#select-token, new tab), primary button “Share this state”.

Share writes the current controls into the query string and copies the URL.
Example: `/?projects=6&multiple=4.2&preset=custom`

---

## 2. Visual system

Aesthetic: institutional dark terminal, not a meme coin. Quiet, precise, high contrast. Think trading desk, not neon casino.

UPDATE (restyle to match token.select; supersedes the original dark-slate + yellow tokens below):
- Font: Figtree for UI (free stand-in for token.select's Roobert), IBM Plex Mono for numbers.
- Display claim 70/72, weight 700, tracking -0.035em. Body 17/26. Max content width 1240.
- Primary button: pill, linear-gradient(100deg, #A9BCE8, #F3ECE4 38%, #FF9A4A 74%, #FF6A1A), ink #1A0E04, orange glow shadow.
- Orange accent, numbered step labels, hairline header border, faint starfield background.

Color:
- bg: #000
- bg-elevated: #0C0B0A
- bg-panel: #0F0E0D
- line: rgba(244,239,230,0.10)
- line-strong: rgba(244,239,230,0.18)
- text: #F4EFE6
- text-dim: rgba(244,239,230,0.70)
- text-faint: rgba(244,239,230,0.45)
- accent (SELECT): #FF6A1A (orange, used for $SELECT, the bid, and the primary button)
- project: #7EB6FF (cool blue, project tokens)
- eth: #C8CDD6
- danger/empty: #E85D4C only for the “0 $SELECT at open” state
- positive: #B6F27A

Do not use purple gradients, glassmorphism blur stacks, or rainbow charts.

Big Bro:
Type:
- Display claim: 56/60, weight 500, tracking -0.03em
- Section title: 28/32, weight 500
- Body: 15/24, weight 400, color text-dim
- Numbers: mono, tabular-nums, 28–40px depending on role
- Labels: 11/16, uppercase, tracking 0.12em, color text-faint

Radius: 12px panels, 999px pills, 8px inputs.
Shadow: none. Separation is border + 1px inner highlight rgba(255,255,255,0.04).
Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64.

Motion:
- 180ms ease-out for control changes.
- Particle flow 2.4s linear, slowed when multiple is near 1.
- Number counters tween over 400ms. Never jump.
- Reduced motion: disable particles, keep number tweens.

---

## 3. Simulator stage (the only screen that matters)

Layout at ≥1180px: 12-column grid.
- Left 4 columns: control panel.
- Right 8 columns: canvas + metric rail.

Below 1180px: canvas first, controls second, metrics as a 2-column wrap.

### 3.1 Control panel

Title: “Model a launch”
Sub: “Single-sided at open. Fills only as price climbs.”

Controls, in order:

1. Preset chips
- Custom (default)
- $GOOD proof — locks projects=1, multiple=derived so SELECT pulled = 30,000,000, label under chip “30m $SELECT · 3% of supply”
- Ecosystem — projects=8, multiple=3

2. Launches pairing with $SELECT
- Slider 1–12, step 1, default 4
- Caption: “Each launch opens its own project/$SELECT pool.”

3. Price multiple from launch
- Slider 1.0–10.0, step 0.1, default 2.5
- Caption: “1.0× is migration. The $SELECT side still holds nothing.”
- At 1.0 the pulled amount must be exactly 0.

4. Share of LP seeded to $SELECT
- Locked display, not a free slider: “10% — protocol constant”
- Small lock icon. Tooltip: “Set by the factory. 90% seeds project/ETH. 10% seeds project/$SELECT.”
- Do not let the user change 10%. Accuracy matters more than toys.

5. Reset link, bottom of panel.

### 3.2 Canvas

Background #07080A, subtle dot grid at 24px, 8% white.

Center: $SELECT node.
- 96px circle, fill #E7FF3D, text #07080A, label “$SELECT”
- Under it, mono: supply locked by this model, e.g. “4.8% of supply”
- Soft ring pulse only while particles are flowing.

Around it, on an ellipse: one node per launch (max 12).
- 56px circles, fill #101216, 1px #7EB6FF border, ticker “P1”…“P12” or “GOOD” on the proof preset.
- Under each node a thin dual bar: left segment eth-colored labeled ETH 90, right segment starts empty (danger outline) and fills accent as multiple rises, labeled SELECT.

Particles:
- Small 4px squares in accent, moving from a faint “open market” label at the left edge into each project node, then a thinner stream from the project node into the center $SELECT node.
- Count and speed scale with (multiple - 1). At 1.0×, zero particles.
- This visual encodes the docs: buying pulls $SELECT off the market into the pool; the pool is the bid.

Corner annotation, top-left of canvas, 12px mono:
“project/$SELECT pool opens single-sided”

A thin legend under the canvas:
- yellow square = $SELECT pulled from market
- blue ring = a launch
- lock icon = liquidity cannot be removed

### 3.3 Metric rail

Four cards under or beside the canvas. All values derived, all tabular.

1. $SELECT pulled from market
- Big mono number
- Sub: “into locked project pools”
2. Share of 1B supply
3. Value lift to other paired pools
- Copy: “A higher $SELECT bid reprices every other project/$SELECT pool.”
- Show a relative index, base 100 at 1.0×, not a dollar price.
4. Protocol fee side
- Static truth, not a fake number: “Fees on the $SELECT pool accrue to the protocol. Contributor fees sit on the ETH pool, for the life of the token.”

Footer line of the rail, always visible:
“Model, not a quote. Pool opens with 0 $SELECT. Fill is a function of price climbing after migration.”

---

## 4. Model (implement exactly)

Keep it transparent. Comment the formulas in src/model.ts.

Constants:
- SUPPLY = 1_000_000_000
- SELECT_POOL_SHARE = 0.10
- GOOD_PULLED = 30_000_000

Per launch, SELECT pulled:
- if multiple <= 1: 0
- else: BASE_UNIT * (multiple - 1) * dampener

Big Bro:
BASE_UNIT default = 1_500_000 SELECT per 1.0× of climb per launch.
Dampener = 1 / (1 + 0.08 * (projects - 1)) so 12 launches do not absurdly exceed supply.
Clamp total pulled at 25% of supply and show a note if clamped: “Capped for the model. Real fill depends on liquidity range, volume, and routing.”

$GOOD preset bypasses the formula and sets pulled = 30_000_000 for one launch. Label it “reported by Select, not simulated.”

Lift index:
- 100 at multiple 1
- 100 + (totalPulled / SUPPLY) * 100
- Label: “Relative bid index. Not a price.”

Do not display ETH amounts, market cap, or APY.

Share URL keys: projects, multiple (one decimal), preset.

---

## 5. How it works (#how)

Three columns, then a full-width comparison.

Steps:
1. Migrate
“90% of LP seeds project/ETH. 10% seeds project/$SELECT. The $SELECT side holds only the project token, set just above launch price.”
2. Climb
“Buys route through the project pools. As price rises, the single-sided pool pulls $SELECT off the market to fill.”
3. Compound
“That $SELECT is locked. The bid is protocol-made, not treasury-bought. Every other launch paired with $SELECT is marked against a stronger centre.”

Comparison table, two columns, no slogans:

| | Typical launchpad | token.select |
| Liquidity | Can leave | Locked for life |
| Entry | Curve, snipers, bundles | Flat price, per-wallet cap, refundable until target |
| Community | Holds the bag | Earns trading fees for life |
| Shared demand | None | 10% of every LP is a $SELECT pool that fills on the way up |

Source line under the table:
“Mechanics from Select Foundation docs. $GOOD figure from @selectfdn, 28 Sep 2026: 30m $SELECT, 3% of supply.”

---

## 6. Components to build

- App.tsx — layout only
- Header.tsx
- ControlPanel.tsx
- Stage.tsx — canvas, nodes, particles
- MetricRail.tsx
- HowItWorks.tsx
- model.ts — pure functions, unit-testable
- useSimState.ts — reads/writes query string
- format.ts — 30,000,000 → “30.0m”, always tabular

Empty, loading, and error states are unnecessary. The page is static.

Hover on a project node: tooltip “Pool opened with 0 $SELECT. At {multiple}× this model holds {n} $SELECT, locked.”

Keyboard: sliders are native inputs type=range with aria-valuetext.

---

## 7. Copy deck (use verbatim)

Hero:
“Every successful launch is a permanent bid for $SELECT.”
Sub: “The project/$SELECT pool starts empty of $SELECT. Price climbing is what fills it. One winner tightens the float for every other launch.”

Panel title: “Model a launch”
Primary button: “Share this state”
Secondary: “How it works”

Proof chip: “$GOOD · 30m pulled”
Canvas label: “Open market”
Center caption: “Locked in pools. Not a treasury buy.”

Disclaimer, 12px, text-faint, under the fold:
“Educational model of the mechanism described in the Select Foundation docs. Not an offer, not a forecast, not chain data. Liquidity lock, 90/10 split, and single-sided open are protocol rules. The $GOOD 30m figure is Select’s reported example.”

Contest post caption (for the human, not the UI):
“The bid is structural. Every token.select launch opens a project/$SELECT pool with zero $SELECT in it. As the project climbs, buying pulls $SELECT off the market into a locked pool. $GOOD alone: 30m $SELECT, 3% of supply. Model it: {url} @selectfdn”

---

## 8. GitHub and Claude Code

Repo name: select-flywheel
Default branch: main
README first screen: one sentence, screenshot, link to docs, “model not a quote”.

Ask Claude Code to:
1. Read DESIGN.md before writing code.
2. Implement model.ts first and add three tests: multiple 1.0 pulls 0; GOOD preset equals 30_000_000; total never exceeds 25% of supply.
3. Only then build UI.
4. Do not add wallet libraries, analytics, or extra pages.
5. Match the color and type tokens exactly. No new accent colors.

File tree:

src/
  main.tsx
  App.tsx
  model.ts
  model.test.ts
  components/
    Header.tsx
    ControlPanel.tsx
    Stage.tsx
    MetricRail.tsx
    HowItWorks.tsx
  styles/tokens.css
DESIGN.md
index.html

Done when:
- At 1.0×, pulled is 0 and particles are absent.
- GOOD preset shows 30.0m and 3.0% of supply.
- Share URL restores sliders on reload.
- A judge can verify every claim against the docs without leaving the page.