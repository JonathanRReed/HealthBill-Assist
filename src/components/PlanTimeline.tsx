import { useState } from "react";
import { Calendar, DollarSign, Clock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Profile } from "./ProfileSwitcher";

interface PlanTimelineProps {
  amount: number;
  fee: number;
  profile: Profile;
}

interface PaymentSchedule {
  date: Date;
  amount: number;
  type: "installment";
  description: string;
}

export function PlanTimeline({ amount, fee, profile }: PlanTimelineProps) {
  const [hardshipMode, setHardshipMode] = useState(false);
  
  const generateSchedule = (hardship: boolean = false): PaymentSchedule[] => {
    const total = amount + fee;
    const installmentAmount = Math.round(total / 2);
    const secondInstallment = total - installmentAmount;
    
    // Generate next two payday dates
    const today = new Date();
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + (5 - today.getDay() + 7) % 7);
    
    const secondFriday = new Date(nextFriday);
    secondFriday.setDate(nextFriday.getDate() + 14);
    
    // If hardship, shift by one pay cycle
    if (hardship) {
      nextFriday.setDate(nextFriday.getDate() + 14);
      secondFriday.setDate(secondFriday.getDate() + 14);
    }
    
    return [
      {
        date: nextFriday,
        amount: installmentAmount,
        type: "installment",
        description: "First payment",
      },
      {
        date: secondFriday,
        amount: secondInstallment,
        type: "installment", 
        description: "Final payment",
      },
    ];
  };

  const schedule = generateSchedule(hardshipMode);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="p-6 bg-surface border-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-text-primary">
            Your Payment Plan
          </h3>
          <div className="chip-neutral">
            <Calendar className="w-3 h-3" />
            <span>2 payments</span>
          </div>
        </div>

        <div className="timeline-rail space-y-6">
          {schedule.map((payment, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center border-2 border-brand-gold">
                <DollarSign className="w-5 h-5 text-brand-gold" />
              </div>
              <div className="flex-1 min-h-12 flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-text-primary">
                      {payment.description}
                    </span>
                    <span className="font-rubik font-bold text-lg text-brand-gold">
                      ${payment.amount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(payment.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={hardshipMode}
                onCheckedChange={setHardshipMode}
                id="hardship-mode"
              />
              <label 
                htmlFor="hardship-mode" 
                className="text-sm font-medium text-text-primary cursor-pointer"
              >
                Need more time?
              </label>
            </div>
          </div>
          
          {hardshipMode && (
            <div className="bg-info/10 border border-info/20 rounded-md p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-info" />
                <span className="text-sm font-medium text-info">Hardship Extension Active</span>
              </div>
              <p className="text-sm text-text-secondary">
                Payments shifted by one pay cycle • <strong>No extra fee</strong>
              </p>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-elevated rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-brand-gold" />
              <span className="text-sm font-medium text-text-primary">Important</span>
            </div>
            <p className="text-xs text-text-secondary">
              Payments automatically deducted on scheduled dates. Hardship extensions available anytime with no penalty.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}