# 💸 FairFlow — Project Info

**FairFlow** is a mock, but realistic, web experience that turns a financial panic moment into a **clear, fair plan** in under five minutes.

* **Theme fit:** fast + fair financial access that builds confidence instead of stress.
* **What’s included:** Instant Cushion (micro-advance), BillBridge (bill smoothing), Confidence Coach (explainability + export), Comparison view, and Demo Profiles (different user perspectives).
* **Status:** end-to-end mock (no real banking). Logic, data, and “instant payout” are simulated for demo purposes.

---

## 1) Problem & Insight

When a surprise bill hits, people often face **opaque, high-cost options** (overdrafts, payday loans, late fees). That creates **stress loops** and long-term financial harm. People need:

* **Speed** (minutes, not days),
* **Clarity** (know the total cost immediately),
* **Control** (repayment aligned to income),
* **Dignity** (plain language, no gotchas).

---

## 2) What FairFlow Does (Modules)

### A. Instant Cushion

Small cash relief (e.g., \$50–\$500) with **transparent, flat fees** and an **APR-equivalent** shown for comparability. Approval is based on **recent cash-flow**, not just credit score. Repayment is aligned to upcoming deposit dates.

### B. BillBridge

Lets users **split** a large bill into 2–4 installments or **shift** a due date to the next payday. Total cost stays the same; only the schedule changes. This reduces missed payments and anxiety spikes.

### C. Confidence Coach

One-screen summary: **what you’ll get now**, **what it costs**, **when you’ll pay**. Includes a **hardship extension** (“more time, not more fees”), a **“why approved”** explainer, and a (mock) **export** action.

### D. Comparison View

Side-by-side **FairFlow vs. Typical Payday** cost, with a savings callout and APR-equivalent footnote (for transparency and regulator-friendly framing).

### E. Demo Profiles

Profile switcher (e.g., **Alex** hourly worker; **Riley** student; **Sam** caregiver) changes deposits, bills, and outcomes—so judges see the concept work across different realities.

---

## 3) End-to-End Mock Flow (User Journey)

**Journey A: Instant Cushion**:

1. User taps **Check eligibility**.
2. Offer appears in <1s: **limit**, **flat fee + APR-equivalent**, **ETA**, **why approved**.
3. User chooses an amount ≤ limit → FairFlow builds a **Plan Timeline** aligned to the next deposits.
4. User can toggle **Hardship** to shift the schedule by one deposit cycle **without extra fee**.
5. **Confidence Coach** displays a 3-bullet summary with an **Export** option (mock PDF).

**Journey B: BillBridge**:

1. User selects a bill (e.g., Utilities \$120 due 9/15).
2. Chooses **Split x2** or **Shift to payday**; preview updates live.
3. Confirms → installments merge into the **Plan Timeline**.

**Journey C: Compare**:

1. User enters amount (\$200) and days (14).
2. View shows **FairFlow total** vs **Payday total** + **You save \$X** badge and APR-equivalent note.

---

## 4) Decisioning Model (Mock)

> Transparent rules so judges see *how* decisions are made.

**Inputs**:

* Last 90 days of deposits (date, amount, cadence),
* NSF (non-sufficient funds) count in last 60 days,
* Upcoming bills (for BillBridge).

**Eligibility**:

* At least one deposit in the last **21 days**
* `NSF_60d ≤ 2`
* Variability guard: `stdev(deposit amounts) / mean ≤ 0.6`

  * If above, reduce limit by \~25% rather than deny outright (more inclusive, still prudent).

**Limit**:

* `limit = min($500, round(0.5 × average bi-weekly deposit))`
  (Tiny by design—keeps risk low and avoids debt traps.)

**Fee & APR-Equivalent**:

* Flat fee ≈ **1% of amount**, **min \$1, max \$5** (non-compounding).
* APR-equivalent (for comparability only):
  `aprEquivalent = (fee / amount) × (365 / 14) × 100`.

**Plan Builder**:

* Default **2 installments** on the next **two deposit dates** (rounded to nearest business day).
* **Hardship toggle** shifts all dates by one deposit cycle; **fee unchanged**.

**Denials**:

* If ineligible, show *why* in plain language and suggest **BillBridge** as a next step.

---

## 5) Pricing & Guardrails (Fairness by Design)

* **Flat, capped fee** (\$1–\$5), shown up-front with an **APR-equivalent** for transparency.
* **No late fees**.
* **No rollovers** or hidden add-ons.
* **Hardship extension** adds time, **not cost**.
* **Small limits** tied to deposits reduce risk of over-borrowing.
* **Cash-flow underwriting** supports users with thin/no credit files.

---

## 6) Data & System Design (Mock Architecture)

**Front-end app (mock)**:

* Pages: Home (Offer + Plan), BillBridge, Compare, Disclosures.
* Persona switcher changes the data context used throughout the app.
* A11y-first HTML landmarks, semantic elements, and accessible cost summaries.

**Mock data**:

* `bank.json` per profile:

  * `deposits[]`: ISO date + amount + source
  * `bills[]`: id + name + due date + amount
  * `nsf60d`: 0–2

**Mock endpoints (illustrative)**:

* `GET /api/offer?profile&amount` → `{ offer, plan }`
* `GET /api/bills?profile` → `{ bills }`
* `POST /api/plan/accept` → `{ ok: true }` (telemetry only)

**Offer payload (example)**:

```json
{
  "eligible": true,
  "limit": 240,
  "fee": 3,
  "aprEquivalent": 39.0,
  "etaMinutes": 2,
  "reasons": ["Steady deposits", "NSF <= 2"],
  "nextDeposits": ["2025-09-06", "2025-09-20"]
}
```

**Plan payload (example)**:

```json
{
  "ok": true,
  "total": 243,
  "schedule": [
    {"date":"2025-09-06","amount":121.5},
    {"date":"2025-09-20","amount":121.5}
  ],
  "hardship": false
}
```

---

## 7) UX/Visual System (Dark Mode, Wells-inspired)

**Core neutrals**:

* Background `#0C0F12`, Card `#141A22`, Elevated `#1B2230`, Border `#2A3344`
* Text `#E7ECF2` / `#A8B2C3` / `#8C97A9`

**Brand accents**:

* Red (primary CTA / errors) `#C51111` (hover `#AD0F10`)
* Gold (secondary CTA / highlights) `#F2B72A` (hover `#D9A324`)

**Semantics**:

* Success `#16A34A` · Warning `#F59E0B` · Info `#3B82F6`

**Layout & motion**:

* Max-width 960px, 16/24/32 spacing rhythm, 12–16px radii
* Subtle glass panels, diagonal red→gold background band in hero
* View-transition animation when moving from Offer → Plan; timeline fade-ins
* Always co-locate **fee + APR-equiv + “No late fees”** on the same row

**Accessibility**:

* WCAG AA contrast; visible gold focus rings; keyboard-first; SR cost sentence:
  “For \$200, fee is \$3 (APR-equivalent 39%). No late fees.”

---

## 8) Demo Profiles (What changes)

**Alex — hourly worker (steady deposits)**:

* Deposits: \~biweekly \~\$980–\$990; `nsf60d = 0`
* Outcome: Eligible; limit \~ \$240–\$260; fee \$3; 2-installment plan.

**Riley — student (irregular income)**:

* Deposits: irregular, smaller; `nsf60d = 1`
* Outcome: Eligible for a **smaller limit** (e.g., \$80–\$120); same fee rules.

**Sam — caregiver (multiple bills)**:

* Deposits: biweekly; bills include utilities + medical
* Outcome: BillBridge shines (split/shift); cushion may be modest.

Switching profiles updates **deposits, bills, eligibility, plan**, and Comparison numbers so judges can see adaptability.

---

## 9) Security, Privacy, & Compliance (Path to Production)

**Mock stance (today):**

* No real bank connections; no personal data; demo-only.

**If real:**

* **Data rights & consent** (open-banking connections, OAuth flow).
* **KYC/AML** for disbursement; secure data storage; least-privilege access.
* **ECOA & fair-lending** checks on decisioning; bias testing; adverse-action notices.
* **TILA/Reg Z** disclosures; cost comparability (APR-equiv as informational).
* **RTP/FedNow** for instant disbursement; ledgering and dispute workflows.

---

## 10) Success Metrics (What we’d measure)

**Demo-visible counters (mock):**

* Time-to-offer (<1s goal)
* Plan acceptance clicks
* Hardship usage (%)
* Confidence survey (1–5, optional)

**If real (North-star):**

* Reduction in late fees/rollovers vs baseline
* NPS/CSAT on clarity and confidence
* Repayment completion rate without penalty
* Responsible use (low re-borrowing rates)

---

## 11) Why It’s Different (Not Payday Lending)

* **Flat capped fee** (\$1–\$5) + **APR-equiv disclosure** for comparability
* **No late fees, no rollovers**, no compounding
* **Small limits** based on **recent cash-flow**, not just credit score
* **Hardship extension** that adds time, not cost
* **Plain-language explainability** (“why approved”) and a **Confidence Coach** summary

---

## 12) Roadmap (Post-competition)

1. **Integrations:** Open-banking sandbox (read-only), real date/holiday rules, PDF export.
2. **Risk & fairness:** rule tuning, bias checks, adverse-action messaging.
3. **Partners:** payroll alignment (employers), utilities for BillBridge.
4. **Mobile polish:** PWA install, offline plan view.
5. **A/B testing:** microcopy, confidence meter, coaching tips.

---

## 13) Limitations (What this mock does *not* do)

* No real KYC, disbursement, or account access.
* Decisioning is a **simplified rule set** (not a production-grade risk model).
* Exports and metrics are simulated.

---

## 14) FAQ (for judges & reviewers)

**Q: Is this just a payday rebrand?**
**A:** No. FairFlow uses **small limits**, **flat capped fees**, **no late fees/rollovers**, **cash-flow-based** approvals, and a **hardship extension**—all focused on **confidence and prevention**, not dependency.

**Q: How fast is “instant”?**
**A:** The mock simulates sub-second decisions and “minutes” for funding. In production, real-time rails like RTP/FedNow would enable same-session disbursement.

**Q: How do you prevent harm?**
**A:** Tiny limits, transparent costs, alignment to income, proactive smoothing, and a penalty-free hardship option—and continuous fairness checks.

---

## 15) One-Minute Demo Script (for reference)

1. “Car dies; rent due Friday. Watch how FairFlow turns panic into a plan.”
2. Tap **Check eligibility** → **\$240 limit · \$3 fee · APR-equiv 39% · No late fees** · reasons.
3. Enter **\$200** → timeline aligned to deposits. Toggle **Hardship** → dates shift, cost unchanged.
4. Open **BillBridge** → split utilities into 2 Fridays → merged schedule.
5. Close: “In under a minute, relief (mock), a plan I control, **zero gotchas**.”
