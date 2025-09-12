import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Profile } from "@/data/profiles";
import { calculateMockOffer, MOCK_CONFIG, formatPaymentDate, generatePaymentDates } from "@/lib/mockConfig";
import { useScreenReaderAnnouncement } from "@/components/ScreenReaderAnnouncement";

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
  denialReasons?: string[];
}

export function OfferCard({ profile, onOfferReady }: OfferCardProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState<OfferData | null>(null);
  const [loadingTime, setLoadingTime] = useState(0);
  const { announce, AnnouncementRegion } = useScreenReaderAnnouncement();

  const checkEligibility = async () => {
    setLoading(true);
    setLoadingTime(0);
    const startTime = Date.now();
    let cancelled = false;

    const interval = setInterval(() => {
      setLoadingTime(Date.now() - startTime);
    }, 16);

    // Use configured timing from mock config
    const simulated = MOCK_CONFIG.timing.minLoadingMs + 
      Math.random() * (MOCK_CONFIG.timing.maxLoadingMs - MOCK_CONFIG.timing.minLoadingMs);
    const minSpinner = 450; // ensure spinner is visible but brief
    
    await new Promise((resolve) => setTimeout(resolve, simulated));

    const elapsed = Date.now() - startTime;
    if (elapsed < minSpinner) {
      await new Promise((resolve) => setTimeout(resolve, minSpinner - elapsed));
    }

    if (cancelled) return;
    clearInterval(interval);

    const offerData = calculateOfferFromProfile(profile);
    setOffer(offerData);
    setLoading(false);
    onOfferReady(offerData);

    // Screen reader announcement
    if (offerData.isEligible) {
      announce(
        `Eligibility check complete. You're approved for up to $${offerData.limit} with a $${offerData.fee} flat fee.`,
        "assertive"
      );
    } else {
      announce(
        `Eligibility check complete. Unfortunately, you're not eligible at this time. ${offerData.denialReasons?.join(", ") || ""}`,
        "assertive"
      );
    }

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  };

  const calculateOfferFromProfile = (profile: Profile): OfferData => {
    const calculation = calculateMockOffer(profile.deposits, profile.nsfCount);
    
    return {
      limit: calculation.limit,
      fee: calculation.fee,
      aprEquivalent: calculation.aprEquivalent,
      eta: `${MOCK_CONFIG.timing.etaMinutes} minutes`,
      reasons: calculation.reasons,
      isEligible: calculation.isEligible,
      denialReasons: calculation.denialReasons,
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
          <Button onClick={checkEligibility} size="lg" className="w-full btn-glow">
            Check eligibility
          </Button>
        </div>
        <AnnouncementRegion />
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
      <Card className="p-6 bg-surface border-warning/20">
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

        {/* Confidence meter */}
        <div className="pt-1">
          {(() => {
            const avgDeposit = profile.deposits.reduce((a, b) => a + b, 0) / profile.deposits.length;
            const variance = profile.deposits.reduce((acc, dep) => acc + Math.pow(dep - avgDeposit, 2), 0) / profile.deposits.length;
            const stdDev = Math.sqrt(variance);
            const volatility = stdDev / avgDeposit;
            // Basic heuristic: higher volatility and nsf reduce confidence
            const base = 90;
            const penalty = Math.min(25, Math.round(volatility * 40) + profile.nsfCount * 5);
            const confidence = Math.max(60, base - penalty);
            return (
              <div>
                <div className="flex justify-between text-xs text-text-secondary mb-1">
                  <span>Confidence</span>
                  <span className="text-text-primary font-medium">{confidence}%</span>
                </div>
                <div className="h-2 bg-elevated rounded">
                  <div
                    className="h-2 rounded bg-gradient-brand transition-all duration-500"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <div className="text-xs text-text-muted mt-1">Steady income pattern</div>
              </div>
            );
          })()}
        </div>
      </div>
      <AnnouncementRegion />
    </Card>
  );
}