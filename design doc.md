# Direct answer

Here's your **one, cohesive, end-to-end design doc** for a fully working **mock FairFlow site** (no code) — including IA, visual system (dark mode w/ Wells Fargo-inspired colors), flows, acceptance criteria, content, accessibility, telemetry, performance budget, demo plan, and presenter notes. Use this as the single source of truth for build + pitch.

---

## FairFlow — Cohesive Design Doc (Mock Website)

**Theme fit:** fast + fair access that builds confidence instead of stress.
**Build assumption:** mock-only; free to run; solo; Astro/Bun or similar, but framework-agnostic here.

---

## 0. Goals, Constraints, Success Criteria

### Goals

* Deliver **instant, fair micro-relief** and a **clear plan** in < 5 minutes.
* Make fairness **undeniable**: show **flat fee + APR-equivalent together**, **no late fees**, **hardship extension**.
* Demonstrate **cash-flow-based eligibility** and **bill smoothing** to align costs to income.
  **Confidence: 95%**

### Constraints & assumptions

* Mock data only (deposits, bills, NSF counts).
* No real bank rails; simulate open-banking + instant payout UX.
* Judging values: clarity, fairness, realism, polish, measurable impact.
  **Confidence: 90%**

### Demo success criteria (measurable)

* Offer appears **< 1 second** after “Check eligibility”.
* **Fee + APR-equivalent + “No late fees”** visible on one line (always).
* **Hardship** extends time **without increasing cost**.
* Two polished flows: **Instant Cushion** and **BillBridge**.
  **Confidence: 95%**

---

## 1. Audience, Personas, JTBD

* **Alex (26, hourly)** — car repair + rent collision → small buffer now + fee clarity.
* **Riley (20, student)** — \$90 urgent bill; irregular deposits → tiny advance, transparency.
* **Sam (41, caregiver)** — juggling utilities/medical bills → bill smoothing + printable plan.
  **Empathy anchor:** shift from **panic → plan** in under five minutes.
  **Confidence: 90%**

---

## 2. Value Proposition & Design Principles

* **Replace panic with a plan** (tone, visuals, copy reassure).
* **Fair by default** (fee cap, APR-equiv, no late fees, hardship pause).
* **Explain, don’t mystify** (“why approved,” plain language, glossary).
* **Do less, better** (2–3 flows, finished; no half-built extras).
  **Confidence: 95%**

---

## 3. Brand-Aligned Dark Mode (Wells-inspired)

Use these **design tokens** consistently.

### Core neutrals

* Background/App `#0C0F12`
* Surface/Card `#141A22`
* Elevated Surface `#1B2230`
* Border/Hairline `#2A3344`
* Text Primary `#E7ECF2` · Secondary `#A8B2C3` · Muted `#8C97A9`

### Brand accents

* Primary CTA Red `#C51111` (hover `#AD0F10`, focus ring deep `#8F0D0E`)
* Gold (Highlight/Secondary CTA) `#F2B72A` (hover `#D9A324`, deep `#B9891E`)

### Semantics

* Success `#16A34A` · Warning `#F59E0B` · Error = Brand Red `#C51111` · Info `#3B82F6`

### Interactions

* Focus ring `#F2B72A` 2px (meets AA)
* Disabled text `#6B7280` · Disabled surface `#11161E`
* Modal scrim `rgba(12,15,18,.6)`

### Gradients (sparingly)

* Brand sweep: `135° #C51111 → #F2B72A`
* Gold glow bg band: `180° rgba(242,183,42,.16) → 0`

**Accessibility checks:**

* `#E7ECF2` on `#141A22` ✔︎; `#F2B72A` on `#141A22` ✔︎ (headings/badges, not long body); white text on `#C51111` ✔︎.
  **Usage guidance:** red = primary/critical; gold = emphasis/secondary; keep backgrounds deep neutral.
  **Confidence: 92%**

---

## 4 Information Architecture (IA) & Sitemap

```markdown
/                Home: Triage → Offer → Plan (primary demo)
/bill-bridge     Choose bill → split or shift → preview → add to plan
/comparison      FairFlow vs payday total cost (delta callout)
/legal           Plain-language disclosures + glossary
/api/*           Mock endpoints (offer, bills)—implementation-agnostic
```

**Nav:** Home · BillBridge · Compare · Disclosures. Footer repeats links + micro-disclosures.
**Confidence: 95%**

---

## 5 Page-Level Specs (What each must show)

### Home `/` (primary demo path)

**Sections & order**:

1. **Hero/Hook** — one sentence + CTA “Check eligibility”.
2. **OfferCard** — **Limit**, **Flat fee + APR-equiv + “No late fees” chip**, ETA, “Why approved” chips (2–3).
3. **Amount → Plan** — amount ≤ limit → **Plan Timeline** aligned to next deposits (dates + amounts).
4. **Hardship Toggle** — “Need more time? Shift one pay cycle — **no extra fee**.”
5. **Coach Summary** — 3 bullets (what you get now; what/when you pay; total cost) + “Export plan” (mock).
   **States:** idle → loading (skeleton < 800ms) → offer\_ready → plan\_ready → hardship\_on.
   **Judge overlay (`?judge=1`)**: time-to-offer ms, APR chip highlight, event log.
   **Confidence: 95%**

### BillBridge `/bill-bridge`

* **BillPicker** (name, due, amount) → **SplitControl** (2–4 splits) **or** “Shift to payday”.
* **Timeline Preview** shows new installments; **Add to plan** merges schedule.
  **Acceptance:** totals match; due-date collision visibly resolved.
  **Confidence: 90%**

### Compare `/comparison`

* Inputs: amount + days; Outputs: two tiles **FairFlow vs Payday** totals with **Savings \$Δ** and APR-equiv footnote.
  **Confidence: 85%**

### Disclosures `/legal`

* Short cards: **No late fees**, **Fee cap**, **APR-equivalent explainer**, **Privacy shortform**, **Fairness note** (cash-flow-based eligibility, ECOA-aware stance for production).
  **Confidence: 85%**

---

## 6 Key Flows & Acceptance Criteria

### Flow A — Instant Cushion (primary)

1. Triage → **Check eligibility** → Offer in < 1s with limit, fee, APR-equiv, ETA, reasons.
2. Enter amount (≤ limit) → **Plan Timeline** with next 2 deposit dates; total = amount + flat fee.
3. Toggle **Hardship** → dates shift by one cycle; **fee unchanged**; disclosure copy updates.
4. **Coach Summary** shows 3 bullets + Export (mock).
   **Accept if:** fee+APR chip always visible; plan dates match deposits; hardship only changes time.
   **Confidence: 95%**

### Flow B — BillBridge smoothing

1. Select **Utilities \$120** → **Split x2** into two Fridays.
2. Preview timeline; **Add to plan** → combined schedule in Summary.
   **Accept if:** \$60/\$60; timeline clear; totals unchanged.
   **Confidence: 90%**

### Flow C — Cost comparison

1. Compare \$200/14 days → **\$3 flat** vs **\$30–35 payday**; **You save \$27–32**.
   **Accept if:** delta stands out; APR footnote present.
   **Confidence: 85%**

---

## 7 Decision Model (Mock, Transparent)

**Inputs:** last 90d deposits (dates/amounts), NSF\_60d, bill list.
**Eligibility:** last deposit ≤ 21 days; NSF\_60d ≤ 2; volatility guard `stdev/mean ≤ 0.6` (else reduce limit −25%).
**Limit:** `min($500, round(0.5 × average biweekly deposit))`.
**Fee:** `~1%` of amount, **min \$1, max \$5** (flat, non-compounding).
**APR-equiv (for comparability):** `(fee/amount) × (365/14) × 100`.
**Plan:** default 2 installments on next 2 deposit dates; round to nearest business day.
**Hardship:** shift all installments by one cycle; **fee unchanged**.
**Denials:** friendly message + **Try BillBridge** CTA, with reason.
**Confidence: 90%**

---

## 8 Content & Microcopy (Authoritative)

* **Hero:** “**Money in minutes. A plan in seconds.**”
* **Offer header:** “You’re eligible for up to **\$240** today.”
* **Cost chip:** “Flat fee **\$3** · **APR-equiv 39%** · **No late fees**”
* **Why approved:** “Steady deposits in last 30 days • 0 NSF in 60 days”
* **Hardship tooltip:** “Need more time? Shift one pay cycle — **no extra fee**.”
* **Comparison footnote:** “APR-equivalent is shown for comparison; our fee is flat and does not compound.”
  **Confidence: 95%**

---

## 9 Accessibility & Inclusive UX

* **Landmarks:** header, nav, main, section, footer.
* **Readable groups:** aria-labeled group for **fee+APR+no-late-fees** (read as one sentence).
* **Keyboard:** visible gold focus ring; all actions reachable; dialogs close on ESC.
* **Color alone never conveys state**; icons + text + ARIA used for errors/warnings.
* **Reduced motion:** disables transitions/scroll animations.
  **Confidence: 90%**

---

## 10 Modern HTML/CSS You’ll Leverage (no code here)

* **HTML:** `<dialog>` for Export modal; `<details><summary>` for disclosures; `<time>` for dates; `<dl>` for cost breakdowns; `<figure><figcaption>` for compare visuals.
* **CSS:** container queries (card sizing); `:has()` (parent reacts to child state); subgrid (card layout); logical props (`padding-inline`); `clamp()` for fluid type/space; `color-mix()` for hover states; `accent-color` for native controls.
* **Polish:** View Transitions API (card → plan), `content-visibility: auto` (below-fold), `prefers-reduced-motion` handling.
  **Confidence: 92%**

---

## 11 Visual Hierarchy & Layout System

* **Hierarchy:** 1. Offer/Plan, 2. Primary actions, 3. Details.
* **Card anatomy:** Title → big number (limit/amount) → chips row (fee/APR/ETA) → micro “why approved” → CTA.
* **Timeline:** rail with deposit dots (distinct icon); each installment has date + amount; hardship adds a badge.
* **Spacing:** 16/24/32 rhythm; max-width 960px; 12–16px radii; soft shadow (0,8,24 @ 35%).
  **Confidence: 95%**

---

## 12 Component Inventory (Behavioral Spec)

* **OfferCard** — displays limit, fee, APR-equiv, ETA, reasons; states: loading/ready/ineligible.
* **AmountInput** — numeric + slider; validates ≤ limit; helpful inline error.
* **PlanTimeline** — renders installments; shows hardship state; dates map to deposits.
* **HardshipToggle** — one tap; updates dates; fee unchanged; copy updates.
* **BillPicker** — lists bills (name/due/amount); outputs selection.
* **SplitControl** — split 2–4 or shift to payday; preview calculates installments.
* **DisclosureBox** — one-sentence summary, SR-only alt text.
* **ComparisonWidget** — two tiles + savings delta; APR footnote.
* **CoachSummary** — 3 bullets + Export (mock).
* **JudgeOverlay** — togglable HUD: latency, events, % hardship usage.
  **Confidence: 95%**

---

## 13 Telemetry (Mock) & On-Screen KPIs

**Events:** `offer_viewed`, `offer_latency_ms`, `amount_adjusted`, `plan_built`, `hardship_toggled`, `bill_split_configured`, `plan_accepted`, `comparison_viewed`.
**KPI overlay:** offer latency (<1000ms), plan acceptance count, hardship usage %, optional “confidence” (1–5).
**Confidence: 85%**

---

## 14 Performance Budget & Resilience

* **First offer render < 1s**; skeleton shimmer < 800ms.
* Inline critical CSS above the fold; lazy-load non-core.
* Use **container queries** instead of many breakpoints.
* Preload hero font (variable range); system UI for body.
* Graceful fallback if View Transitions/`:has()` unsupported (no blocking).
  **Confidence: 90%**

---

## 15 States, Errors, Edge Cases

**States:** skeleton → offer\_ready; plan\_ready; hardship\_on/off; comparison\_loaded.
**Errors:**

* Mock API down → inline “Temporarily unavailable. Try again.” + retry.
* Amount > limit → red helper text; disable “Build plan”.
* Ineligible → friendly reason + **Try BillBridge** CTA.
  **Edge cases:**
* Only one future deposit date → split across that date and **+14 days** with “Approximated” banner.
* Very small bill (< \$20) → limit splits to max 2 with explanation “keeps payments meaningful.”
  **Confidence: 90%**

---

## 16 Compliance & Privacy (Mock Stance)

* **Flat fee + APR-equiv** always co-displayed; **no compounding**.
* **No late fees**, no rollovers; hardship has **no penalty**.
* **Cash-flow-based** eligibility (reduces score-only bias); fairness note on `/legal`.
* Mock data only; production path: consented data, least privilege, KYC/AML & ECOA.
  **Confidence: 85%**

---

## 17 Sample Mock Data (for builders, concept only)

* **Deposits:** three recent payroll deposits \~( \$980–\$990 ) on 9/06, 8/23, 8/09.
* **Bills:** Rent \$1200 due 9/19; Utilities \$120 due 9/15.
* **NSF\_60d:** 0.
* **Expected offer (for demo):** limit ≈ \$240–\$260; **fee \$3**; **APR-equiv \~39%** (14-day basis).
  **Confidence: 95%**

---

## 18 Demo Plan & Presenter Notes

### 60–90s live demo

1. **Hook (10s):** “Car dies; rent due Friday. Here’s how FairFlow turns panic into a plan.”
2. **Offer (20s):** Tap “Check eligibility” → **limit + fee + APR-equiv + ‘No late fees’** → “why approved”.
3. **Plan (20s):** Enter \$200 → timeline; toggle **Hardship** → dates shift; “no extra fee”.
4. **BillBridge (20s):** Split utilities into two Fridays; combined schedule shown.
5. **Impact (10s):** “Under a minute: relief (mock), a plan I control, **zero gotchas**.”
   **Confidence: 95%**

### Q&A crib

* **Payday lending?** Flat **capped** fee, APR-equiv disclosed; no rollovers/late fees; tiny limits; hardship without penalty.
* **Realistic?** Instant rails & open banking exist; this demo mirrors UX; next: KYC/AML, risk tuning, partners.
* **Harm prevention?** Small limits, transparency, smoothing, hardship; ECOA-aware approach in prod.
  **Confidence: 90%**

---

## 19 Slide Deck Mapping (6–7 slides)

1. **The Moment** — panic → plan story.
2. **What It Is** — Instant Cushion · BillBridge · Confidence Coach.
3. **How It Works** — cash-flow rule + safeguards.
4. **Demo** — Offer → Plan → BillBridge screenshots/GIF.
5. **Fairness & Impact** — fee cap, APR-equiv, comparison, “no late fees,” hardship.
6. **Why Now & Why WF** — instant rails, open banking, partner path.
7. **What’s Next** — pilot steps & impact metrics.
   **Confidence: 95%**

---

## 20 QA Checklist (Before Recording/Submitting)

* [ ] Offer latency < 1s; skeleton visible < 800ms.
* [ ] **Fee + APR-equiv + No late fees** chip always co-visible (desktop & mobile).
* [ ] Amount guardrails; helpful errors.
* [ ] Hardship shifts dates, **never** increases fee.
* [ ] BillBridge totals unchanged; split limits enforced.
* [ ] Keyboard nav complete; focus rings visible; ESC closes dialogs.
* [ ] AA contrast; tooltips readable; SR cost sentence correct.
* [ ] `/legal` clear, short, links to glossary.
  **Confidence: 90%**

---

Perfect timing — this is where polish and “wow factor” will separate you from a demo-looking mock. Let’s break down **how to improve both the idea and the site’s layouts/visuals**.

---

# 1. Improving the *idea* (beyond payday-alternative)

### a) Add “Demo Profiles” (perspective switching)

* **Purpose:** show empathy, fairness, and adaptability.
* **Profiles:**

  * *Hourly Worker (Alex)* → steady deposits, low NSF → eligible for \$240.
  * *Student (Riley)* → irregular income, 1 NSF → smaller limit (\$90).
  * *Caregiver (Sam)* → multiple bills, smoothing demo.
* **Implementation (mock):** top-right profile switcher (dropdown or avatar chips).
* **Benefit:** lets judges *see the system flex* across real-world personas. Makes it more than a one-trick demo.

### b) Show “Confidence Meter”

* A friendly meter (e.g., **green bar + % confidence**) that shows why approval is fair but cautious.
* Example: “Confidence 85% — steady deposits, no recent NSF.”
* Builds **trust** + gives judges a regulatory-friendly signal.

### c) Add comparison view *in-context*

* Instead of a separate page, embed a **“See how this compares”** link under every offer.
* Judges don’t have to imagine → you show **FairFlow \$3 vs Payday \$30** in one click.

### d) Tie to **financial wellness**

* After plan export, show “Next Step Suggestions”: “Set aside \$20 when you can” (mock).
* Shows you’re building *confidence, not dependence*.

---

# 2. Improving *layouts* (to not feel like a demo)

### a) Home / Offer page

* **Left half (main card):** big OfferCard with **hero number** (limit).
* **Right half (sidebar):** PlanTimeline (dates, hardship toggle).
* **Footer strip (persistent):** Coach Summary always visible at bottom with “Export” button.

### b) BillBridge

* **Two-column split:** bills list on left; split/shift configurator on right.
* **Live preview timeline** pinned at bottom (feels like Mint/Robinhood).

### c) Compare

* **Big side-by-side cards** (FairFlow vs Payday) in a **neumorphic “VS” layout**.
* **Savings delta** as a badge that overlaps the two cards.

### d) Legal

* Break into **accordion cards** (No late fees · Fee cap · APR-equiv explainer).
* Use `<details><summary>` for micro-interactions (native but modern).

---

# 3. Visual styling upgrades (make it “hip” and modern)

### a) Layout system

* **Glass panels** on dark background (slight blur, frosted effect).
* **Asymmetric sections**: cards slightly offset, with angled gradient trims.
* **Use subgrid** → keep numbers aligned across cards regardless of text length.

### b) Typography

* Hero numbers: **Rubik, weight 700, 56px, tabular numerals**.
* Microcopy: **Inter 14px, 60% opacity**, always in sentence case.
* Use `clamp()` → fluid scaling across mobile → desktop.

### c) Motion

* **Card slide-in** with View Transitions API.
* **Timeline reveal** with scroll-driven animations (fade each dot).
* **Micro hover**: chip lift 1–2px; button glow ring.

### d) Color use

* **Brand Red** only on *primary CTA* and *true errors*.
* **Gold** = highlights & secondary CTAs.
* **Cool neutrals** keep space clean → red/gold pop.

---

# 4. Adding “demo polish” tricks

* **Judge Overlay (toggle)** → shows event log (“offer viewed in 622ms”). Judges see it’s *measured*.
* **Confidence Coach export** → click “Export” → opens a `<dialog>` with styled PDF preview. Even if fake, it *feels real*.
* **Persona-switcher** → avatars with tooltips (“View as Alex / Riley / Sam”).
* **Saved sessions** (mock): “Last viewed plan (Alex) · Exported Sept 10.”

---

# 5. Site-wide “hip, fintech feel” tricks

* **Sticky Coach Summary** → like a chat bubble pinned bottom-right: “Your plan: \$200 → 2 payments · Export.”
* **Gradient dividers** instead of gray rules.
* **Glassmorphic chips** with gold outlines.
* **Playful micro-icons** (💸 🗓️ ✅) inside bullet lists.
* **Background banding** (subtle angled gold gradient behind hero section).

---

### Builder Hand-off (Non-code)

* **Design tokens** (colors/spacing/typography) above.
* **Page specs** (required content & states).
* **Flows & acceptance tests** (per section).
* **Mock data spec** (deposits/bills/NSF + expected outputs).
* **Telemetry events** & **KPI overlay** targets.
