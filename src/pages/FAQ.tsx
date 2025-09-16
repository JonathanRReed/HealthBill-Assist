import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    q: "Is this a loan?",
    a: "It’s a short-term medical bill advance with one small flat fee — no interest and no compounding.",
  },
  {
    q: "What if I miss a payment?",
    a: "Tap Hardship to extend by one cycle with no penalty. More time, not more fees.",
  },
  {
    q: "Will this hurt my credit?",
    a: "On-time repayment may help. We never use punitive fees and avoid debt traps.",
  },
  {
    q: "Where does the money go?",
    a: "Directly to your doctor, hospital, or pharmacy so care isn’t delayed.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation className="border-b border-border bg-surface/50 backdrop-blur" />

      <main className="container mx-auto px-4 py-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-rubik font-bold text-text-primary">Frequently Asked Questions</h1>
          <p className="text-text-secondary mt-2">Healthcare-focused answers, in plain English.</p>
        </header>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, idx) => (
            <Card key={idx} className="p-5 bg-surface border-border">
              <div className="font-semibold text-text-primary mb-1">{item.q}</div>
              <div className="text-text-secondary">{item.a}</div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FAQ;
