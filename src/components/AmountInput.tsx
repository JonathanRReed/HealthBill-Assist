import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { OfferData } from "./OfferCard";

interface AmountInputProps {
  offer: OfferData;
  onAmountChange: (amount: number) => void;
}

export function AmountInput({ offer, onAmountChange }: AmountInputProps) {
  const [amount, setAmount] = useState(Math.min(200, offer.limit));
  const [error, setError] = useState("");

  useEffect(() => {
    if (amount <= offer.limit && amount >= 1) {
      setError("");
      onAmountChange(amount);
    }
  }, [amount, offer.limit, onAmountChange]);

  const handleInputChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setAmount(numValue);
    
    if (numValue > offer.limit) {
      setError(`Amount cannot exceed your limit of $${offer.limit}`);
    } else if (numValue < 1) {
      setError("Amount must be at least $1");
    } else {
      setError("");
    }
  };

  const handleSliderChange = (values: number[]) => {
    setAmount(values[0]);
  };

  const fee = Math.max(1, Math.min(5, Math.round(amount * 0.01)));
  const total = amount + fee;

  return (
    <Card className="p-6 bg-surface border-border">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">
            How much do you need?
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-rubik font-bold text-text-primary">$</span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="text-3xl font-rubik font-bold bg-transparent border-0 p-0 h-auto focus-visible:ring-0 text-text-primary"
                  min={1}
                  max={offer.limit}
                />
              </div>
              
              <Slider
                value={[amount]}
                onValueChange={handleSliderChange}
                max={offer.limit}
                min={1}
                step={1}
                className="w-full"
              />
              
              <div className="flex justify-between text-sm text-text-muted mt-2">
                <span>$1</span>
                <span>${offer.limit} limit</span>
              </div>
            </div>

            {error && (
              <div className="text-error text-sm bg-error/10 border border-error/20 rounded-md p-3">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Amount requested</span>
              <span className="text-text-primary font-medium">${amount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Flat fee</span>
              <span className="text-text-primary font-medium">${fee}</span>
            </div>
            <div className="flex justify-between font-medium border-t border-border pt-2">
              <span className="text-text-primary">Total to repay</span>
              <span className="text-brand-gold">${total}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}