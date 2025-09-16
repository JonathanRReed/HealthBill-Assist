import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Calendar, Heart, Hospital, Shield, Split } from "lucide-react";

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation className="border-b border-border bg-surface/50 backdrop-blur" />

      <main className="container mx-auto px-4 py-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-rubik font-bold text-text-primary">
            Features for <span className="text-brand-gold">Medical Relief</span>
          </h1>
          <p className="text-text-secondary mt-2">
            Built to handle hospital, ER, and pharmacy bills with empathy and clarity.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 bg-surface border-border">
            <div className="flex items-start gap-3 mb-3">
              <Hospital className="w-5 h-5 text-brand-gold" />
              <h2 className="text-lg font-semibold text-text-primary">Direct-to-Provider</h2>
            </div>
            <p className="text-text-secondary">
              Funds go straight to your doctor, hospital, or pharmacy so care isn’t delayed.
            </p>
          </Card>

          <Card className="p-6 bg-surface border-border">
            <div className="flex items-start gap-3 mb-3">
              <Split className="w-5 h-5 text-brand-gold" />
              <h2 className="text-lg font-semibold text-text-primary">BillBridge</h2>
            </div>
            <p className="text-text-secondary">
              Split a hospital bill into 2–4 payments or shift to payday — same total cost, better cash flow.
            </p>
          </Card>

          <Card className="p-6 bg-surface border-border">
            <div className="flex items-start gap-3 mb-3">
              <Shield className="w-5 h-5 text-success" />
              <h2 className="text-lg font-semibold text-text-primary">Hardship Toggle</h2>
            </div>
            <p className="text-text-secondary">
              Extend repayment by one cycle with no penalty. More time, not more fees.
            </p>
          </Card>

          <Card className="p-6 bg-surface border-border">
            <div className="flex items-start gap-3 mb-3">
              <Calendar className="w-5 h-5 text-brand-gold" />
              <h2 className="text-lg font-semibold text-text-primary">Align-to-Payday</h2>
            </div>
            <p className="text-text-secondary">
              Keep payments in sync with income to avoid collisions with rent and essentials.
            </p>
          </Card>

          <Card className="p-6 bg-surface border-border md:col-span-2">
            <div className="flex items-start gap-3 mb-3">
              <Heart className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg font-semibold text-text-primary">Confidence Coach</h2>
            </div>
            <p className="text-text-secondary">
              One-screen summary of what you’ll get, what it costs, when you’ll pay — exportable plan for peace of mind.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Features;
