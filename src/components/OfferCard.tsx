import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Profile } from "./ProfileSwitcher";

interface OfferCardProps {
  profile: Profile;
  onOfferReady: (offer: OfferData) => void;
}

export interface OfferData {
  limit: number;
  fee: number;
  aprEquivalent: number;
  eta: string;
  reasons: string[];
  isEligible: boolean;
}

export function OfferCard({ profile, onOfferReady }: OfferCardProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState<OfferData | null>(null);
  const [loadingTime, setLoadingTime] = useState(0);

  const checkEligibility = async () => {
    setLoading(true);
    setLoadingTime(0);
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      setLoadingTime(Date.now() - startTime);
    }, 10);

    // Simulate API call with realistic timing
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
    
    clearInterval(interval);
    
    const offerData = calculateOffer(profile);
    setOffer(offerData);
    setLoading(false);
    onOfferReady(offerData);
  };

  const calculateOffer = (profile: Profile): OfferData => {
    const avgDeposit = profile.deposits.reduce((a, b) => a + b, 0) / profile.deposits.length;
    const biweeklyAvg = avgDeposit;
    
    // Eligibility check
    if (profile.nsfCount > 2 || avgDeposit < 200) {
      return {
        limit: 0,
        fee: 0,
        aprEquivalent: 0,
        eta: "",
        reasons: profile.nsfCount > 2 ? ["Too many NSF fees recently"] : ["Deposit amount too low"],
        isEligible: false,
      };
    }

    // Calculate limit
    let limit = Math.min(500, Math.round(0.5 * biweeklyAvg));
    
    // Volatility adjustment
    const variance = profile.deposits.reduce((acc, dep) => acc + Math.pow(dep - avgDeposit, 2), 0) / profile.deposits.length;
    const stdDev = Math.sqrt(variance);
    const volatility = stdDev / avgDeposit;
    
    if (volatility > 0.6) {
      limit = Math.round(limit * 0.75);
    }

    const fee = Math.max(1, Math.min(5, Math.round(limit * 0.01)));
    const aprEquivalent = Math.round((fee / limit) * (365 / 14) * 100);

    const reasons = [];
    if (profile.deposits.length >= 3) reasons.push("Steady deposits in last 30 days");
    if (profile.nsfCount === 0) reasons.push("0 NSF in 60 days");
    if (volatility <= 0.3) reasons.push("Consistent income pattern");

    return {
      limit,
      fee,
      aprEquivalent,
      eta: "2-3 minutes",
      reasons,
      isEligible: true,
    };
  };

  if (!offer && !loading) {
    return (
      <Card className="p-6 bg-surface border-border">
        <div className="text-center">
          <h2 className="text-2xl font-rubik font-bold text-text-primary mb-4">
            Get instant relief
          </h2>
          <p className="text-text-secondary mb-6">
            Check your eligibility for fair, transparent cash flow support
          </p>
          <Button onClick={checkEligibility} size="lg" className="w-full">
            Check eligibility
          </Button>
        </div>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="p-6 bg-surface border-border">
        <div className="space-y-4">
          <div className="skeleton h-8 w-3/4"></div>
          <div className="skeleton h-12 w-1/2"></div>
          <div className="flex gap-2">
            <div className="skeleton h-6 w-20"></div>
            <div className="skeleton h-6 w-24"></div>
            <div className="skeleton h-6 w-16"></div>
          </div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-2/3"></div>
        </div>
        {loadingTime > 0 && (
          <div className="mt-4 text-xs text-text-muted">
            Loading... {loadingTime}ms
          </div>
        )}
      </Card>
    );
  }

  if (!offer?.isEligible) {
    return (
      <Card className="p-6 bg-surface border-border border-warning/20">
        <div className="text-center">
          <h2 className="text-xl font-rubik font-semibold text-text-primary mb-2">
            Not eligible right now
          </h2>
          <p className="text-text-secondary mb-4">
            {offer.reasons[0]}
          </p>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate("/bill-bridge")}
          >
            Try BillBridge instead
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-surface border-border hover-lift">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium text-text-secondary mb-1">
            You're eligible for up to
          </h2>
          <div className="hero-number text-brand-gold">
            ${offer.limit}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="chip-gold">
            <span>Flat fee ${offer.fee}</span>
          </div>
          <div className="chip-neutral">
            <span>APR-equiv {offer.aprEquivalent}%</span>
          </div>
          <div className="chip-success">
            <Shield className="w-3 h-3" />
            <span>No late fees</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Clock className="w-4 h-4" />
          <span>Money available in {offer.eta}</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-text-primary">Why you're approved:</h3>
          {offer.reasons.map((reason, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-text-secondary">
              <CheckCircle className="w-3 h-3 text-success" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}