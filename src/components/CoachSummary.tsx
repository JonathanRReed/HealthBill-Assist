import { useState } from "react";
import { Download, CheckCircle, DollarSign, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

interface CoachSummaryProps {
  amount: number;
  fee: number;
  hardshipMode: boolean;
  scheduleDate: string;
}

export function CoachSummary({ amount, fee, hardshipMode, scheduleDate }: CoachSummaryProps) {
  const [showExport, setShowExport] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const total = amount + fee;

  const summaryPoints = [
    {
      icon: DollarSign,
      text: `Get $${amount} in your account within 2-3 minutes`,
    },
    {
      icon: Calendar,
      text: `Repay $${total} in 2 automatic payments starting ${scheduleDate}`,
    },
    {
      icon: Shield,
      text: `Total cost: $${fee} flat fee • No late fees • Hardship extensions available`,
    },
  ];

  return (
    <div className="sticky bottom-4 z-10">
      <Card className="p-4 bg-elevated border-border shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-text-primary">Your Plan Summary</h3>
            {hardshipMode && (
              <div className="chip-warning">
                <span>Hardship mode</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            {summaryPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center mt-0.5">
                  <point.icon className="w-3 h-3 text-success" />
                </div>
                <span className="text-sm text-text-secondary flex-1">{point.text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => {
                setAccepted(true);
                toast.success("Plan accepted", {
                  description: `Total $${total} with $${fee} fee • starts ${scheduleDate}`,
                });
              }}
            >
              {accepted ? "Accepted" : "Accept Plan"}
            </Button>
            
            <Dialog open={showExport} onOpenChange={setShowExport}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Export Your Plan</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="p-4 bg-surface rounded-lg border">
                    <h4 className="font-medium text-text-primary mb-3">FairFlow Payment Plan</h4>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Amount:</span>
                        <span className="text-text-primary">${amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Fee:</span>
                        <span className="text-text-primary">${fee}</span>
                      </div>
                      <div className="flex justify-between font-medium border-t border-border pt-2">
                        <span className="text-text-primary">Total:</span>
                        <span className="text-brand-gold">${total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Payments:</span>
                        <span className="text-text-primary">2 installments</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Start date:</span>
                        <span className="text-text-primary">{scheduleDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-text-muted">
                    This is a mock export for demo purposes. In production, this would generate a PDF with full payment schedule and terms.
                  </div>
                  
                  <Button className="w-full" onClick={() => setShowExport(false)}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Plan Exported
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>
    </div>
  );
}