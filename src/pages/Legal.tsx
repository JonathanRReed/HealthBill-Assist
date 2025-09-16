import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, DollarSign, Clock, Scale, Lock, Heart } from "lucide-react";

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation className="border-b border-border bg-surface/50 backdrop-blur" />
      
      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-rubik font-bold text-text-primary mb-4">
              Disclosures & <span className="text-brand-gold">Terms</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Transparent, plain-language explanations of how FairFlow works and protects you
            </p>
          </div>

          {/* Key Protections Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-surface border-border text-center">
              <Shield className="w-10 h-10 text-brand-gold mx-auto mb-3" />
              <h3 className="font-medium text-text-primary mb-2">No Late Fees</h3>
              <p className="text-sm text-text-secondary">
                We never charge late fees. Hardship extensions available anytime.
              </p>
            </Card>

            <Card className="p-6 bg-surface border-border text-center">
              <DollarSign className="w-10 h-10 text-brand-gold mx-auto mb-3" />
              <h3 className="font-medium text-text-primary mb-2">Fee Cap</h3>
              <p className="text-sm text-text-secondary">
                Maximum $5 flat fee. Typically ~1% of amount borrowed.
              </p>
            </Card>

            <Card className="p-6 bg-surface border-border text-center">
              <Clock className="w-10 h-10 text-brand-gold mx-auto mb-3" />
              <h3 className="font-medium text-text-primary mb-2">No Rollovers</h3>
              <p className="text-sm text-text-secondary">
                Fees never compound. What you see is what you pay.
              </p>
            </Card>
          </div>

          {/* Detailed Disclosures */}
          <Card className="p-6 bg-surface border-border">
            <Accordion type="single" collapsible className="w-full">
              
              <AccordionItem value="fees" className="border-border">
                <AccordionTrigger className="text-text-primary hover:text-brand-gold">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Fee Structure & APR Equivalent
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary">
                  <div className="space-y-3">
                    <p>
                      FairFlow charges a flat fee based on the amount borrowed, typically around 1% with a $5 maximum. 
                      This fee does not compound or increase over time.
                    </p>
                    <div className="bg-elevated p-3 rounded-md">
                      <p className="text-sm">
                        <strong>Example:</strong> Borrow $200 for 14 days → $3 flat fee → 39% APR-equivalent
                      </p>
                    </div>
                    <p className="text-xs">
                      The APR-equivalent is calculated as: (fee ÷ amount) × (365 ÷ term in days) × 100. 
                      This metric is provided for comparison with other financial products but does not 
                      reflect compounding interest since our fee is flat and fixed.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="protection" className="border-border">
                <AccordionTrigger className="text-text-primary hover:text-brand-gold">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Consumer Protections
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary">
                  <div className="space-y-3">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-success rounded-full mt-2"></span>
                        <span><strong>No late fees:</strong> If you need more time, use our hardship extension feature</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-success rounded-full mt-2"></span>
                        <span><strong>Fee cap:</strong> You'll never pay more than $5 regardless of amount</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-success rounded-full mt-2"></span>
                        <span><strong>Small limits:</strong> We limit advances to prevent debt cycles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-success rounded-full mt-2"></span>
                        <span><strong>Hardship support:</strong> Extend payment dates with no penalty</span>
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="eligibility" className="border-border">
                <AccordionTrigger className="text-text-primary hover:text-brand-gold">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Fair Eligibility & Anti-Discrimination
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary">
                  <div className="space-y-3">
                    <p>
                      FairFlow uses cash-flow-based eligibility criteria focused on your recent deposit 
                      history and account stability. We do not discriminate based on protected characteristics.
                    </p>
                    <div className="bg-elevated p-3 rounded-md">
                      <p className="text-sm font-medium mb-2">Our eligibility factors:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Recent deposit history (last 90 days)</li>
                        <li>• Account stability (NSF frequency)</li>
                        <li>• Income consistency (volatility check)</li>
                      </ul>
                    </div>
                    <p className="text-xs">
                      We are committed to fair lending practices and comply with the Equal Credit 
                      Opportunity Act (ECOA). Decisions are based on financial factors only.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="privacy" className="border-border">
                <AccordionTrigger className="text-text-primary hover:text-brand-gold">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Privacy & Data Protection
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary">
                  <div className="space-y-3">
                    <p>
                      We collect only the minimum data necessary to provide our service: account 
                      transaction history for eligibility and deposit timing for repayment scheduling.
                    </p>
                    <div className="bg-elevated p-3 rounded-md">
                      <p className="text-sm">
                        <strong>Data we access:</strong> Recent deposits, NSF history, account balance trends<br />
                        <strong>Data we don't access:</strong> Purchase details, merchant names, personal transactions
                      </p>
                    </div>
                    <p className="text-xs">
                      All data is encrypted and stored securely. We never sell personal information 
                      and share data only as required for service delivery.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="wellness" className="border-border">
                <AccordionTrigger className="text-text-primary hover:text-brand-gold">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Financial Wellness Commitment
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary">
                  <div className="space-y-3">
                    <p>
                      FairFlow is designed to provide emergency relief, not long-term credit. 
                      We include features to promote healthy financial habits.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-info rounded-full mt-2"></span>
                        <span>BillBridge helps smooth irregular cash flow</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-info rounded-full mt-2"></span>
                        <span>Educational resources for financial planning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-info rounded-full mt-2"></span>
                        <span>Spending insights and budgeting tools</span>
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </Card>

          {/* Important Notice */}
          <div className="mt-8 p-6 bg-warning/10 border border-warning/20 rounded-md">
            <h3 className="font-medium text-text-primary mb-2">Important Demo Notice</h3>
            <p className="text-sm text-text-secondary">
              This is a conceptual demonstration of FairFlow. No real financial services are provided. 
              In production, all financial services would be subject to applicable federal and state 
              regulations, licensing requirements, and consumer protection laws.
            </p>
          </div>

          {/* Attributions */}
          <div className="mt-6 p-6 bg-surface border border-border rounded-md">
            <h3 className="font-medium text-text-primary mb-2">Attributions</h3>
            <div className="text-sm text-text-secondary space-y-2">
              <p>
                Interface icons are provided by <a href="https://lucide.dev/" target="_blank" rel="noreferrer" className="underline hover:text-brand-gold">Lucide</a> under the ISC License.
              </p>
              <p>
                The site favicon is a custom medical cross + heart SVG created for this demo and does not require attribution.
              </p>
              <p className="text-xs text-text-muted">
                If any third‑party artwork is added in the future (e.g., unDraw or Humaaans illustrations), appropriate attribution and license links will be included here.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Legal;