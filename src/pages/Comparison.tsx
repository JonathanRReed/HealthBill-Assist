import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingDown, AlertTriangle } from "lucide-react";

const Comparison = () => {
  const [amount, setAmount] = useState(200);
  const [days, setDays] = useState(14);

  const calculateFairFlowCost = (amount: number) => {
    const fee = Math.max(1, Math.min(5, Math.round(amount * 0.01)));
    const aprEquivalent = Math.round((fee / amount) * (365 / days) * 100);
    return { fee, total: amount + fee, aprEquivalent };
  };

  const calculatePaydayCost = (amount: number, days: number) => {
    // Typical payday lending: $15-20 per $100 borrowed for 2 weeks
    const feeRate = 0.15 + (Math.random() * 0.05); // 15-20%
    const fee = Math.round(amount * feeRate);
    const aprEquivalent = Math.round((fee / amount) * (365 / days) * 100);
    return { fee, total: amount + fee, aprEquivalent };
  };

  const fairFlow = calculateFairFlowCost(amount);
  const payday = calculatePaydayCost(amount, days);
  const savings = payday.total - fairFlow.total;

  return (
    <div className="min-h-screen bg-background">
      <Navigation className="border-b border-border bg-surface/50 backdrop-blur" />
      
      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-rubik font-bold text-text-primary mb-4">
              Cost <span className="text-brand-gold">Comparison</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              See how HealthBill Assist’s transparent, capped fees compare to traditional payday lending
            </p>
          </div>

          {/* Input Controls */}
          <Card className="p-6 bg-surface border-border mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="amount" className="text-text-primary">
                  Amount needed
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  className="mt-2"
                  min="1"
                  max="500"
                />
              </div>
              <div>
                <Label htmlFor="days" className="text-text-primary">
                  Days until repayment
                </Label>
                <Input
                  id="days"
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 14)}
                  className="mt-2"
                  min="1"
                  max="30"
                />
              </div>
            </div>
          </Card>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* FairFlow Card */}
            <Card className="p-6 bg-surface border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-success text-white px-3 py-1 text-xs font-medium">
                RECOMMENDED
              </div>
              
              <div className="mb-4">
                <h2 className="text-xl font-rubik font-bold text-text-primary mb-2">
                  HealthBill <span className="text-brand-gold">Assist</span>
                </h2>
                <p className="text-sm text-text-secondary">
                  Transparent, capped fee with consumer protections
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Amount:</span>
                  <span className="font-medium text-text-primary">${amount}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Flat fee:</span>
                  <span className="font-medium text-text-primary">${fairFlow.fee}</span>
                </div>
                
                <div className="flex justify-between items-center border-t border-border pt-2">
                  <span className="text-text-primary font-medium">Total cost:</span>
                  <span className="font-rubik font-bold text-xl text-success">
                    ${fairFlow.total}
                  </span>
                </div>
                
                <div className="text-xs text-text-muted">
                  APR-equivalent: {fairFlow.aprEquivalent}%*
                </div>

                <div className="bg-success/10 border border-success/20 rounded-md p-3 mt-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-success rounded-full"></span>
                      <span className="text-text-secondary">No late fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-success rounded-full"></span>
                      <span className="text-text-secondary">Fee cap at $5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-success rounded-full"></span>
                      <span className="text-text-secondary">Hardship extensions</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payday Lending Card */}
            <Card className="p-6 bg-surface border-warning/20">
              <div className="mb-4">
                <h2 className="text-xl font-rubik font-bold text-text-primary mb-2">
                  Typical Payday Loan
                </h2>
                <p className="text-sm text-text-secondary">
                  Industry standard payday lending costs
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Amount:</span>
                  <span className="font-medium text-text-primary">${amount}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Fee:</span>
                  <span className="font-medium text-text-primary">${payday.fee}</span>
                </div>
                
                <div className="flex justify-between items-center border-t border-border pt-2">
                  <span className="text-text-primary font-medium">Total cost:</span>
                  <span className="font-rubik font-bold text-xl text-warning">
                    ${payday.total}
                  </span>
                </div>
                
                <div className="text-xs text-text-muted">
                  APR-equivalent: {payday.aprEquivalent}%
                </div>

                <div className="bg-warning/10 border border-warning/20 rounded-md p-3 mt-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-warning" />
                      <span className="text-text-secondary">Late fees apply</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-warning" />
                      <span className="text-text-secondary">Rollover fees possible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-warning" />
                      <span className="text-text-secondary">No hardship protection</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Savings Highlight */}
          {savings > 0 && (
            <Card className="p-6 bg-gradient-gold-glow border-brand-gold/20">
              <div className="text-center">
                <TrendingDown className="w-12 h-12 text-brand-gold mx-auto mb-4" />
                <h3 className="text-2xl font-rubik font-bold text-text-primary mb-2">
                  You save <span className="text-brand-gold">${savings}</span>
                </h3>
                <p className="text-text-secondary">
                  That's {Math.round((savings / payday.total) * 100)}% less than typical payday lending
                </p>
              </div>
            </Card>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-elevated rounded-md">
            <p className="text-xs text-text-muted leading-relaxed">
              * APR-equivalent is shown for comparison purposes only. HealthBill Assist charges a flat, 
              non-compounding fee with a $5 maximum. Payday loan costs are estimates based on 
              industry averages and may vary by lender. This comparison is for informational 
              purposes and does not constitute financial advice.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Comparison;