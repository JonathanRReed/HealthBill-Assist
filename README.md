# 💸 FairFlow — Fast, Fair Financial Relief (Mock Demo)

**FairFlow** is a polished mock web app built for the **Wells Fargo x GCA Early Talent Competition**.
It reimagines emergency financial access with **clarity, fairness, and confidence** — showing how banks can help people avoid panic and predatory debt cycles.

---

## 🚀 Demo Overview

FairFlow turns the worst financial moments into a **plan you control**:

1. **Instant Cushion**
   - Get an eligibility decision in < 1 second.
   - See a clear **limit, flat fee, APR-equivalent, and “no late fees”** chip.
   - Always know *why you were approved*.

2. **BillBridge**
   - Pick a bill → split into 2–4 payments or shift to payday.
   - Keep bills aligned with income instead of colliding with rent.

3. **Confidence Coach**
   - One-screen summary of what you’ll get, what it costs, and when you’ll pay.
   - Exportable plan (mock).
   - Built-in **hardship toggle** → more time, not more fees.

4. **Comparison Widget**
   - See **FairFlow $3 fee vs Payday $30–35** instantly.
   - Clear savings + transparent APR-equivalent for regulators.

---

## 🎨 Design System

Dark, modern, Wells Fargo–inspired palette:

- **Brand Red** `#C51111` (primary actions, errors)
- **Gold** `#F2B72A` (highlights, secondary CTAs, focus rings)
- **Deep Navy & Charcoal neutrals** for calm dark-mode UI
- **Glass panels + asymmetric layouts** for a fintech feel
- Typography: **Rubik (headings)** + **Inter (body/numerics)**
- Motion: subtle View Transitions + hover micro-interactions

Accessibility:

- WCAG AA contrast on all text
- Screen reader cost summary (“$200 → $3 fee (39% APR-equivalent), no late fees”)
- Keyboard nav + visible gold focus rings

---

## 👥 Demo Profiles

Switch between perspectives to showcase fairness across contexts:

- **Alex (26, hourly worker)** → steady income → eligible $240.
- **Riley (20, student)** → irregular income → smaller limit.
- **Sam (41, caregiver)** → multiple bills → smoothing demo.

Profiles change deposits, bills, and offer outcomes.

---

## 🔑 Core Logic (Mock)

- **Eligibility**: recent deposit ≤ 21d, ≤ 2 NSF in 60d, stable income
- **Limit**: 50% of average biweekly deposit (capped at $500)
- **Fee**: ~1% of amount ($1–$5 cap), flat, non-compounding
- **APR-equivalent**: computed for comparability only
- **Hardship**: extend repayment by 1 cycle, **no extra cost**

---

## 🧑‍💻 Running Locally

```bash
bun install
bun run dev
```

Visit → [http://localhost:8080](http://localhost:8080)

---

## 🧾 Key Differentiators

- ✅ **Flat capped fee** + APR-equiv transparency
- ✅ **No late fees, no rollovers**
- ✅ **Hardship extension** (time, not cost)
- ✅ **Cash-flow based** approvals, not score-only
- ✅ **Empathy built-in** (Coach summary, demo profiles, comparison widget)

---

## 🎤 Demo Flow (90 seconds)

1. **Hook:** “Car dies; rent due Friday. Here’s how FairFlow turns panic into a plan.”
2. **Offer:** Tap “Check eligibility” → $240 limit, $3 fee, 39% APR-equiv, “why approved.”
3. **Plan:** Enter $200 → repayment aligned to deposits; toggle hardship → more time, not more fees.
4. **BillBridge:** Split utilities into two Fridays; preview merged into plan.
5. **Impact:** “Under a minute: relief (mock), a plan I control, zero gotchas.”

---

## ⚠️ Disclaimer

This is a **mock demo project**.

- No real financial accounts, KYC, or payment rails are used.
- Logic, data, and exports are simulated for demonstration only.
- In production, this would require: **banking partnerships, KYC/AML compliance, ECOA adherence, and real-time rails (RTP/FedNow).**

---

## 🏆 Competition Context

Built for **Wells Fargo x GCA Early Talent Challenge**

- Problem: surprise expenses → stress + predatory loans
- Solution: fast, fair, transparent access + repayment control
- Judging priorities: clarity, fairness, realism, polish, empathy

---

## 📜 License

MIT (for the demo code/design). **Not for production financial use.**

---

## 🙏 Credits

- Favicon & logo: Ian Anandara
