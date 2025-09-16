import { useState } from "react";
import { CalendarDays, Heart, Hospital, Shield } from "lucide-react";
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

      <main id="main-content" className="container mx-auto px-4 py-8">{/* Hero Section (Medical-focused) */}
        <div className="hero-bg text-center p-8 sm:p-10 mb-12">
          <h1 className="text-4xl sm:text-5xl font-slab font-bold text-text-primary mb-4">
            When medical bills hit out of nowhere,
            {" "}
            <span className="text-gradient">relief should be fast, fair, and stress-free.</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-6">
            HealthBill Assist helps patients manage unexpected healthcare costs without falling into debt traps.
          </p>

          <p className="text-sm text-text-muted max-w-xl mx-auto">
            I’ve seen how medical debt creates stress—this project reimagines how a bank could change that.
          </p>
        </div>

        {/* Problem Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-rubik font-bold text-text-primary mb-4">
              Medical costs arrive fast. Cash rarely does.
            </h2>
            <p className="text-text-secondary">
              Ambulance bills, ER copays, and urgent prescriptions can’t wait. Your money should.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Hospital className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Ambulance & ER</h3>
              <p className="text-sm text-text-secondary">Surprise visits shouldn’t become long-term debt</p>
            </div>

            <div className="glass-panel p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Prescriptions</h3>
              <p className="text-sm text-text-secondary">Fill today, repay simply over time</p>
            </div>

            <div className="glass-panel p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Follow-up bills</h3>
              <p className="text-sm text-text-secondary">Flexible timing aligned with paydays</p>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-text-muted">
            Medical expenses are the #1 cause of debt collections in the U.S., affecting nearly 1 in 5 adults.
          </div>
        </div>

        {/* Solution Section Intro */}
        <div className="max-w-5xl mx-auto mb-6 text-center">
          <h2 className="text-2xl font-rubik font-bold text-text-primary mb-2">
            HealthBill Assist: simple, fair medical bill help
          </h2>
          <p className="text-text-secondary">
            Split or delay medical bills into manageable payments. Flat, transparent fee—no hidden interest. Pay hospitals or pharmacies directly.
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

        {/* Beyond the Bill */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-rubik font-bold text-text-primary mb-3">Beyond the Bill</h2>
            <p className="text-text-secondary">Once the bill is covered, HealthBill Assist helps rebuild confidence with savings nudges and credit growth.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 hover-lift">
              <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-3">
                <span className="font-rubik font-bold text-brand-gold">1</span>
              </div>
              <h3 className="font-medium text-text-primary mb-2">Relief</h3>
              <p className="text-sm text-text-secondary">Instant help for ER, prescription, and surprise bills</p>
            </div>
            <div className="glass-panel p-6 hover-lift">
              <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-3">
                <span className="font-rubik font-bold text-brand-gold">2</span>
              </div>
              <h3 className="font-medium text-text-primary mb-2">Repayment</h3>
              <p className="text-sm text-text-secondary">Fair, flexible payments without rollovers or late fees</p>
            </div>
            <div className="glass-panel p-6 hover-lift">
              <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-3">
                <span className="font-rubik font-bold text-brand-gold">3</span>
              </div>
              <h3 className="font-medium text-text-primary mb-2">Rebuild</h3>
              <p className="text-sm text-text-secondary">Savings nudges and opportunities to build credit over time</p>
            </div>
          </div>
        </div>

        {/* Features Grid (Medical-focused) */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-rubik font-bold text-text-primary mb-4">
              Healthcare-focused features that put people first
            </h2>
            <p className="text-text-secondary">
              Split bills, hardship extensions, and direct provider payments—all with clear pricing
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="glass-panel p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Bill Splitting</h3>
              <p className="text-sm text-text-secondary">Break large ER/hospital bills into smaller chunks</p>
            </div>

            <div className="glass-panel p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Hardship Toggle</h3>
              <p className="text-sm text-text-secondary">Delay one cycle without penalties or fees</p>
            </div>

            <div className="glass-panel p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Hospital className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Direct Pay</h3>
              <p className="text-sm text-text-secondary">Funds go straight to hospitals or pharmacies</p>
            </div>

            <div className="glass-panel p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Confidence Builder</h3>
              <p className="text-sm text-text-secondary">On-time payments help unlock reduced fees</p>
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
