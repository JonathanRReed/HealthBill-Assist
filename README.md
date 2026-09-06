# FairFlow

A mock financial-relief app for the Wells Fargo x GCA Early Talent Competition. It demonstrates eligibility explanations, short-term offers, bill splitting, and repayment planning.

All accounts, decisions, fees, and exports are simulated. The demo does not perform identity checks, lend money, access financial accounts, or process payments.

## Run locally

```bash
bun install
bun run dev
```

Open `http://localhost:8080`.

## Try the demo

Choose Alex, an hourly worker; Riley, a student with irregular income; or Sam, a caregiver managing several bills. Each profile changes the sample deposits, bills, and offers.

Instant Cushion displays a mock limit, fee, APR-equivalent, and eligibility explanation. BillBridge splits a bill into two to four payments or moves it to payday. Confidence Coach summarizes the amount, cost, and repayment dates. A hardship toggle extends the plan by one cycle without an extra simulated fee.

The comparison widget uses example fees, not live lending quotes. APR-equivalent is shown for comparison; it does not establish that a product is fair or suitable.

## Demo rules

Eligibility uses recent deposits, income stability, and no more than two insufficient-funds events in 60 days. The documented deposit window is 21 days. Limits use half the average biweekly deposit, capped at $500. Flat fees are roughly 1% within a $1 to $5 range, with no compounding or late fees in the simulation.

A short walkthrough is to choose a profile, check eligibility, enter an amount, inspect repayment dates, toggle hardship, then split a utility bill. Treat the resulting numbers as demonstration data, not a product offer or measured customer outcome.

## Design

The interface uses red and gold accents over dark backgrounds, Rubik headings, and Inter body text. Forms include keyboard focus indicators and screen-reader cost summaries. Motion uses view transitions and hover effects.

A real product would need separate banking, compliance, identity-verification, and payment-system work. This repository does not establish production readiness.

## Credits and license

Favicon and logo by Ian Anandara. Demo code and original design work use [MIT](LICENSE). Brand names and trademarks are excluded. See [NOTICE.md](NOTICE.md).
