import { useState } from "react";
import { CalendarDays, Heart, Hospital } from "lucide-react";
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

      <main id="main-content" className="container mx-auto px-4 py-8">{/* Hero Section */}
        <div className="hero-bg text-center p-8 sm:p-10 mb-12">
          <h1 className="text-4xl sm:text-5xl font-slab font-bold text-text-primary mb-4">
            When medical bills strike, <span className="text-gradient">relief should be instant, fair, and stress-free.</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-6">
            HealthBill Assist helps patients handle surprise healthcare costs with a tiny flat fee, flexible payback, and no debt traps—right inside the Wells Fargo app.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link to="/health-bridge">
              <span className="inline-block rounded-full bg-teal px-6 py-3 text-white font-semibold hover:bg-teal/90 btn-soft-hover">
                Get Relief Now
              </span>
            </Link>
            <a href="#how-it-works" className="inline-block rounded-full px-6 py-3 text-text-primary border border-border hover:bg-surface">
              How It Works
            </a>
          </div>
        </div>

        {/* From Panic to Plan (Storyboard) */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-2xl font-rubik font-bold text-text-primary">From Panic to Plan</h2>
              <p className="text-text-secondary">
                Sarah gets a $500 ER bill. She opens the Wells Fargo app → taps HealthBill Assist → splits the bill into 4 paychecks ($125 each) with a $5 flat fee → hospital is paid today → Sarah leaves with her meds and a plan she can handle.
              </p>
              <Link to="/health-bridge" className="inline-flex items-center gap-2 rounded-full px-5 py-3 border border-border hover:bg-surface btn-soft-hover">
                See a 30-second demo
              </Link>
            </div>
            <div className="bg-surface rounded-2xl shadow-soft p-6 border border-border">
              {/* Illustration placeholder */}
              <div className="aspect-video w-full rounded-xl bg-surface/60 border border-border flex items-center justify-center text-text-muted">
                App storyboard placeholder
              </div>
            </div>
          </div>
        </div>

        {/* Divider with extra breathing room before next section */}
        <div className="max-w-6xl mx-auto border-t border-border mt-24 mb-16" />

        {/* How it works + Demo Flow (moved below storyboard) */}
        {/* Solution Section Intro */}
        <div id="how-it-works" className="max-w-5xl mx-auto mb-6 text-center">
          <h2 className="text-2xl font-rubik font-bold text-text-primary mb-2">Relief in minutes, not months</h2>
          <p className="text-text-secondary">Funds pay your provider directly—so your care isn’t delayed.</p>
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

        {/* Coach Summary - Sticky Bottom of Demo Section */}
        {showPlan && (
          <div className="mt-8 max-w-5xl mx-auto">
            <CoachSummary 
              amount={amount}
              fee={offer.fee}
              hardshipMode={false}
              scheduleDate="Next Friday"
            />
          </div>
        )}

        {/* Why Wells Fargo (Trust) */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-rubik font-bold text-text-primary mb-3">Why Wells Fargo</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 hover-lift">
              <h3 className="font-medium text-text-primary mb-2">Fair by design</h3>
              <p className="text-sm text-text-secondary">No late fees, no compounding interest.</p>
            </div>
            <div className="glass-panel p-6 hover-lift">
              <h3 className="font-medium text-text-primary mb-2">Customer-first</h3>
              <p className="text-sm text-text-secondary">More time if life happens, without penalty.</p>
            </div>
            <div className="glass-panel p-6 hover-lift">
              <h3 className="font-medium text-text-primary mb-2">Scalable</h3>
              <p className="text-sm text-text-secondary">Start with medical; expand to utilities, rent, car repairs.</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <a href="#how-it-works" className="inline-flex items-center gap-2 rounded-full px-5 py-3 border border-border hover:bg-surface btn-soft-hover">
              Explore how it works
            </a>
          </div>
        </div>

        {/* Personal Note (Founder/Story) */}
        <div className="mt-20 mb-16 max-w-4xl mx-auto">
          <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-soft">
            <h2 className="text-2xl font-rubik font-bold text-text-primary mb-3">Why this matters to me</h2>
            <p className="text-text-secondary leading-relaxed">
              I grew up with Perthes’s Disease, a rare hip condition. My family did everything to get me care—and carried the bills that came with it. No one should face a health crisis and a financial crisis at the same time. HealthBill Assist is how we turn that moment into peace of mind.
            </p>
          </div>
        </div>

        {/* Problem Section */}
        <div className="max-w-6xl mx-auto mb-12 mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-rubik font-bold text-text-primary mb-4">Why medical bills hit harder</h2>
            <p className="text-text-secondary">A sudden ER visit, an ambulance ride, a prescription you need today—medical bills don’t wait. For too many people, that moment means panic and high-interest options that make things worse.</p>
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
            • 1 in 5 U.S. adults has medical debt in collections • Most can’t cover a $400 emergency without borrowing • Predatory loans turn short-term help into long-term debt
          </div>
        </div>


        {/* Beyond the Bill section removed per request */}

        {/* Features section removed per request */}
      </main>

      {/* FAQ (moved to bottom) */}
      <section className="border-t border-border py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-rubik font-bold text-text-primary mb-6 text-center">FAQ</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-medium text-text-primary mb-1">Is this a loan?</h3>
              <p className="text-sm text-text-secondary">It’s a small, short-term advance with one flat fee and no interest.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-medium text-text-primary mb-1">What if I can’t make a payment?</h3>
              <p className="text-sm text-text-secondary">Tap Hardship to extend one cycle with no extra cost.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-medium text-text-primary mb-1">Where does the money go?</h3>
              <p className="text-sm text-text-secondary">Straight to your healthcare provider.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-medium text-text-primary mb-1">Will this hurt my credit?</h3>
              <p className="text-sm text-text-secondary">On-time payments can help your profile; we avoid punitive fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
            <Link to="/health-bridge" className="text-text-secondary hover:text-brand-gold">HealthBridge</Link>
            <Link to="/comparison" className="text-text-secondary hover:text-brand-gold">Compare Costs</Link>
            <Link to="/legal" className="text-text-secondary hover:text-brand-gold">Disclosures</Link>
          </div>
          <p className="text-xs text-text-muted">
            This is a mock demonstration. HealthBill Assist is a conceptual product for demo purposes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
