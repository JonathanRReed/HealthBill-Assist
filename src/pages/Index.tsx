import { useState } from "react";
import { Zap, BarChart2, ShieldCheck } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { profiles, Profile } from "@/data/profiles";
import { Link } from "react-router-dom";
import { OfferCard, OfferData } from "@/components/OfferCard";
import { AmountInput } from "@/components/AmountInput";
import { PlanTimeline } from "@/components/PlanTimeline";
import { CoachSummary } from "@/components/CoachSummary";
import { JudgeOverlay } from "@/components/JudgeOverlay";

const Index = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile>(profiles[0]);
  const [offer, setOffer] = useState<OfferData | null>(null);
  const [amount, setAmount] = useState(0);
  const [loadingTime, setLoadingTime] = useState(0);
  const [events, setEvents] = useState<string[]>([]);

  const handleOfferReady = (offerData: OfferData) => {
    setOffer(offerData);
    setLoadingTime(Date.now() % 1000); // Mock timing for demo
    setEvents(prev => [...prev, `Offer generated for ${selectedProfile.name}`]);
  };

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    setEvents(prev => [...prev, `Amount adjusted to $${newAmount}`]);
  };

  const handleProfileChange = (profile: Profile) => {
    setSelectedProfile(profile);
    setOffer(null);
    setAmount(0);
    setLoadingTime(0);
    setEvents([`Switched to profile: ${profile.name}`]);
  };

  const showPlan = Boolean(offer && offer.isEligible && amount > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        className="border-b border-border bg-surface/50 backdrop-blur"
        selectedProfile={selectedProfile}
        onProfileChange={handleProfileChange}
      />
      
      <JudgeOverlay 
        loadingTime={loadingTime}
        events={events}
        hardshipUsage={Math.round(Math.random() * 30)}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="hero-bg text-center p-8 sm:p-10 mb-12">
          <h1 className="text-4xl sm:text-5xl font-slab font-bold text-text-primary mb-4">
            Money in minutes.{" "}
            <span className="text-gradient">A plan in seconds.</span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Fair, transparent cash flow support when you need it most. 
            No surprises, no rollovers, no late fees.
          </p>
        </div>

        {/* Main Demo Flow */}
        <div className="max-w-5xl mx-auto">
          {showPlan ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Offer & Amount */}
              <div className="space-y-6">
                <OfferCard 
                  key={selectedProfile.id}
                  profile={selectedProfile}
                  onOfferReady={handleOfferReady}
                />
                {offer && offer.isEligible && (
                  <AmountInput 
                    key={`amount-${selectedProfile.id}`}
                    offer={offer}
                    onAmountChange={handleAmountChange}
                  />
                )}
              </div>
              {/* Right Column - Plan Timeline */}
              <div className="space-y-6">
                <PlanTimeline 
                  amount={amount}
                  fee={offer.fee}
                  profile={selectedProfile}
                />
              </div>
            </div>
          ) : (
            // Center the hero CTA when plan timeline is not shown
            <div className="max-w-xl mx-auto">
              <div className="space-y-6">
                <OfferCard 
                  key={selectedProfile.id}
                  profile={selectedProfile}
                  onOfferReady={handleOfferReady}
                />
                {offer && offer.isEligible && (
                  <AmountInput 
                    key={`amount-${selectedProfile.id}`}
                    offer={offer}
                    onAmountChange={handleAmountChange}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Coach Summary - Sticky Bottom */}
        {showPlan && (
          <div className="mt-8">
            <CoachSummary 
              amount={amount}
              fee={offer.fee}
              hardshipMode={false}
              scheduleDate="Next Friday"
            />
          </div>
        )}

        {/* Features Grid */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-rubik font-bold text-text-primary mb-4">
              Built for fairness, designed for confidence
            </h2>
            <p className="text-text-secondary">
              Transparent pricing, flexible terms, and your financial wellness at heart
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Instant Relief</h3>
              <p className="text-sm text-text-secondary">
                Money in your account within minutes, not days
              </p>
            </div>

            <div className="glass-panel p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Complete Transparency</h3>
              <p className="text-sm text-text-secondary">
                Flat fees, APR-equivalent shown, no hidden costs
              </p>
            </div>

            <div className="glass-panel p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Built-in Protection</h3>
              <p className="text-sm text-text-secondary">
                No late fees, hardship extensions, small limits
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
            <Link to="/bill-bridge" className="text-text-secondary hover:text-brand-gold">BillBridge</Link>
            <Link to="/comparison" className="text-text-secondary hover:text-brand-gold">Compare Costs</Link>
            <Link to="/legal" className="text-text-secondary hover:text-brand-gold">Disclosures</Link>
          </div>
          <p className="text-xs text-text-muted">
            This is a mock demonstration. FairFlow is a conceptual financial product for demo purposes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
