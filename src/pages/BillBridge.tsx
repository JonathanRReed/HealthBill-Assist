import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, DollarSign, Plus, ArrowRight, Lightbulb, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { addItem, PlanItem } from "@/lib/planStore";
import { useNavigate } from "react-router-dom";

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
}

const mockBills: Bill[] = [
  { id: "1", name: "Electric Bill", amount: 120, dueDate: "2024-09-15", category: "Utilities" },
  { id: "2", name: "Internet", amount: 89, dueDate: "2024-09-18", category: "Utilities" },
  { id: "3", name: "Car Payment", amount: 345, dueDate: "2024-09-20", category: "Transportation" },
  { id: "4", name: "Phone Bill", amount: 65, dueDate: "2024-09-22", category: "Utilities" },
];

const BillBridge = () => {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [splitCount, setSplitCount] = useState(2);
  const [shiftOption, setShiftOption] = useState<"split" | "shift">("split");
  const navigate = useNavigate();

  const calculateSplitSchedule = (bill: Bill, splits: number) => {
    const installmentAmount = Math.round(bill.amount / splits);
    const lastInstallment = bill.amount - (installmentAmount * (splits - 1));
    
    const baseDate = new Date();
    const schedule = [];
    
    for (let i = 0; i < splits; i++) {
      const paymentDate = new Date(baseDate);
      paymentDate.setDate(baseDate.getDate() + (i * 7)); // Weekly payments
      
      schedule.push({
        date: paymentDate,
        amount: i === splits - 1 ? lastInstallment : installmentAmount,
        description: `Payment ${i + 1} of ${splits}`,
      });
    }
    
    return schedule;
  };

  const calculateShiftSchedule = (bill: Bill) => {
    const paydayDate = new Date();
    paydayDate.setDate(paydayDate.getDate() + (5 - paydayDate.getDay() + 7) % 7); // Next Friday
    
    return [{
      date: paydayDate,
      amount: bill.amount,
      description: "Shifted to payday",
    }];
  };

  const schedule = selectedBill 
    ? shiftOption === "split" 
      ? calculateSplitSchedule(selectedBill, splitCount)
      : calculateShiftSchedule(selectedBill)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation className="border-b border-border bg-surface/50 backdrop-blur" />
      
      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-rubik font-bold text-text-primary mb-4">
              Bill<span className="text-brand-gold">Bridge</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Split large bills into smaller payments or shift them to align with your payday.
              Same total cost, better cash flow — <span className="text-text-primary font-medium">no late fees, no rollovers</span>.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <div className="chip-gold">Align to payday</div>
              <div className="chip-neutral">Transparent, flat-fee ecosystem</div>
              <div className="chip-success">Hardship = more time, not more cost</div>
            </div>
          </div>

          {/* Mock demo banner */}
          <div className="mb-8 p-4 rounded-lg border border-border bg-surface/60">
            <p className="text-sm text-text-secondary">
              This is a <span className="text-text-primary font-medium">mock demo</span> built for the
              <span className="text-text-primary font-medium"> Wells Fargo × GCA Early Talent Competition</span>.
              It simulates bills and plans for demonstration only.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Bill Selection */}
            <div className="space-y-6">
              <Card className="p-6 bg-surface border-border">
                <h2 className="text-xl font-medium text-text-primary mb-4">
                  Select a Bill to Manage
                </h2>
                
                <div className="space-y-3">
                  {mockBills.map((bill) => (
                    <div
                      key={bill.id}
                      onClick={() => setSelectedBill(bill)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-brand-gold/50 ${
                        selectedBill?.id === bill.id 
                          ? 'border-brand-gold bg-brand-gold/5' 
                          : 'border-border bg-elevated'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-text-primary">{bill.name}</h3>
                          <p className="text-sm text-text-muted">{bill.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-rubik font-bold text-lg text-text-primary">
                            ${bill.amount}
                          </div>
                          <div className="text-sm text-text-secondary">
                            Due {new Date(bill.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-info/10 border border-info/20 rounded-md flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-info mt-0.5" />
                  <p className="text-sm text-text-secondary">
                    In production, this would connect to your bank to show real bills and due dates.
                  </p>
                </div>
              </Card>

              {selectedBill && (
                <Card className="p-6 bg-surface border-border">
                  <h2 className="text-xl font-medium text-text-primary mb-4">
                    Payment Options
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button
                        variant={shiftOption === "split" ? "default" : "outline"}
                        onClick={() => setShiftOption("split")}
                        size="sm"
                      >
                        Split into payments
                      </Button>
                      <Button
                        variant={shiftOption === "shift" ? "default" : "outline"}
                        onClick={() => setShiftOption("shift")}
                        size="sm"
                      >
                        Shift to payday
                      </Button>
                    </div>

                    {shiftOption === "split" && (
                      <div>
                        <label className="text-sm font-medium text-text-primary mb-2 block">
                          Number of payments
                        </label>
                        <Select value={splitCount.toString()} onValueChange={(value) => setSplitCount(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 payments</SelectItem>
                            <SelectItem value="3">3 payments</SelectItem>
                            <SelectItem value="4">4 payments</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Preview & Timeline */}
            <div className="space-y-6">
              {selectedBill && schedule.length > 0 && (
                <Card className="p-6 bg-surface border-border">
                  <h2 className="text-xl font-medium text-text-primary mb-4">
                    Payment Schedule Preview
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="timeline-rail">
                      {schedule.map((payment, index) => (
                        <div key={index} className="flex items-start gap-4 mb-6">
                          <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/20 rounded-full flex items-center justify-center border-2 border-brand-gold">
                            <DollarSign className="w-4 h-4 text-brand-gold" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-text-primary">
                                {payment.description}
                              </span>
                              <span className="font-rubik font-bold text-brand-gold">
                                ${payment.amount}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                              <Calendar className="w-3 h-3" />
                              <span>{payment.date.toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">Total amount:</span>
                        <span className="font-rubik font-bold text-lg text-text-primary">
                          ${selectedBill.amount}
                        </span>
                      </div>
                      <div className="text-xs text-text-muted mt-1 flex items-center gap-2">
                        <Check className="w-3 h-3 text-success" />
                        <span>No additional fees • Same total cost • Keeps cash flow steady</span>
                      </div>
                    </div>

                    <Button
                      className="w-full btn-soft-hover btn-glow"
                      size="lg"
                      onClick={() => {
                        if (!selectedBill) return;
                        const mapped = schedule.map((p) => ({
                          date: p.date.toISOString(),
                          amount: p.amount,
                          description: p.description,
                        }));
                        const item: PlanItem = {
                          id: `bill-${selectedBill.id}-${Date.now()}`,
                          type: "bill",
                          name: selectedBill.name,
                          amount: selectedBill.amount,
                          schedule: mapped,
                          createdAt: Date.now(),
                        };
                        addItem(item);
                        toast.success("Added to plan", {
                          description: `${selectedBill.name} • $${selectedBill.amount} scheduled`,
                        });
                        navigate("/plan");
                      }}
                    >
                      Add to Payment Plan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <div className="text-center text-sm text-text-secondary">
                      Want to compare options? Check the <button className="underline hover:text-text-primary" onClick={() => navigate('/comparison')}>Comparison</button> or view your <button className="underline hover:text-text-primary" onClick={() => navigate('/plan')}>Coach Summary</button>.
                    </div>
                  </div>
                </Card>
              )}

              {!selectedBill && (
                <Card className="p-8 bg-surface border-border border-dashed">
                  <div className="text-center">
                    <Plus className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">
                      Select a bill to get started
                    </h3>
                    <p className="text-text-secondary">
                      Choose a bill from the left to see payment options
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillBridge;