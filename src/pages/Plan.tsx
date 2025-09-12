import { useEffect, useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Download, ArrowLeftRight, Calendar, DollarSign } from "lucide-react";
import { getPlan, clearPlan, removeItem, PlanItem } from "@/lib/planStore";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

export default function Plan() {
  const [items, setItems] = useState<PlanItem[]>([]);
  const navigate = useNavigate();

  // Load on mount and subscribe to updates without full refresh
  useEffect(() => {
    const load = () => setItems(getPlan());
    load();
    const onUpdated = () => load();
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === "fairflow_plan_v1") load();
    };
    window.addEventListener("plan:updated", onUpdated as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("plan:updated", onUpdated as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const total = useMemo(() => items.reduce((acc, it) => acc + (it.type === "cash" ? it.total : it.amount), 0), [items]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation className="border-b border-border bg-surface/50 backdrop-blur" />

      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-rubik font-bold text-text-primary">Your <span className="text-brand-gold">Plan</span></h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/")}>Back Home</Button>
              <Button variant="outline" onClick={() => { clearPlan(); toast.success("Plan cleared"); }}>Clear Plan</Button>
            </div>
          </div>

          {items.length === 0 ? (
            <Card className="p-8 bg-surface border-border text-center">
              <DollarSign className="w-10 h-10 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No items yet</h3>
              <p className="text-text-secondary">Add an offer or a bill to build your plan.</p>
              <div className="mt-4">
                <Button onClick={() => navigate("/bill-bridge")}>Go to BillBridge</Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <Card key={item.id} className="p-6 bg-surface border-border">
                  {item.type === "cash" ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-brand-gold" />
                          <span className="font-medium text-text-primary">Instant Relief</span>
                        </div>
                        <Button variant="ghost" size="icon" aria-label="Remove plan item" onClick={() => { removeItem(item.id); toast("Removed"); }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Amount</span>
                        <span className="text-text-primary">${item.amount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Fee</span>
                        <span className="text-text-primary">${item.fee}</span>
                      </div>
                      <div className="flex justify-between font-medium border-t border-border pt-2">
                        <span className="text-text-primary">Total</span>
                        <span className="text-brand-gold">${item.total}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Calendar className="w-3 h-3" />
                        <span>Starts {item.scheduleDate}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ArrowLeftRight className="w-4 h-4 text-brand-gold" />
                          <span className="font-medium text-text-primary">BillBridge: {item.name}</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => { removeItem(item.id); toast("Removed"); }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Total</span>
                        <span className="text-text-primary">${item.amount}</span>
                      </div>
                      <div className="mt-3 space-y-2">
                        {item.schedule.map((p, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-text-secondary">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                            </div>
                            <span className="text-text-primary">${p.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}

              <Card className="p-6 bg-elevated border-border">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Plan total</span>
                  <span className="font-rubik font-bold text-xl text-text-primary">${total}</span>
                </div>
                <div className="mt-3">
                  <Button className="w-full" onClick={() => toast.success("Plan submitted (mock)") }>
                    <Download className="w-4 h-4 mr-2" />
                    Export Combined Plan
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
