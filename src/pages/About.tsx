import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Heart, Activity, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation className="border-b border-border bg-surface/50 backdrop-blur" />

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <header className="text-center space-y-3">
            <h1 className="text-4xl font-rubik font-bold text-text-primary">
              About <span className="text-brand-gold">HealthBill Assist</span>
            </h1>
            <p className="text-text-secondary text-lg">
              We believe no one should face both a health crisis and a financial crisis at the same time.
            </p>
          </header>

          <Card className="p-6 bg-surface border-border">
            <h2 className="text-xl font-semibold text-text-primary mb-2">Our Mission</h2>
            <p className="text-text-secondary">
              HealthBill Assist was built to make medical emergencies less stressful. We help people handle
              surprise healthcare costs with a tiny flat fee, flexible payback, and protections that put patients first.
            </p>
          </Card>

          <Card className="p-6 bg-surface border-border">
            <h2 className="text-xl font-semibold text-text-primary mb-2">Founder’s Note</h2>
            <p className="text-text-secondary">
              As a child, I battled Perthes’s Disease, a rare hip condition. My family supported me through treatment,
              but the bills took their toll. HealthBill Assist is about making sure others have an easier path —
              turning fear into peace of mind.
            </p>
          </Card>

          <Card className="p-6 bg-surface border-border">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Why Wells Fargo</h2>
            <p className="text-text-secondary mb-4">
              Backed by Wells Fargo’s trusted network, HealthBill Assist combines empathy and technology to deliver
              help that’s simple, fair, and instant.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <div className="font-medium text-text-primary">Fairness</div>
                  <div className="text-sm text-text-secondary">One small flat fee, no hidden traps.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-brand-gold mt-0.5" />
                <div>
                  <div className="font-medium text-text-primary">Speed</div>
                  <div className="text-sm text-text-secondary">Instant approval in the app.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-teal-400 mt-0.5" />
                <div>
                  <div className="font-medium text-text-primary">Confidence</div>
                  <div className="text-sm text-text-secondary">Tools to rebuild credit and savings.</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
