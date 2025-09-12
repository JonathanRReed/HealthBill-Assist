import { useState } from "react";
import { AlertTriangle, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DisclaimerBannerProps {
  variant?: "banner" | "modal" | "inline";
  className?: string;
  dismissible?: boolean;
}

export function DisclaimerBanner({ 
  variant = "banner", 
  className,
  dismissible = true 
}: DisclaimerBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed && dismissible) {
    return null;
  }

  const content = (
    <>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary text-sm">
            Demo Application - Not for Real Financial Use
          </h3>
          <p className="text-text-secondary text-sm mt-1">
            This is a <strong>mock demonstration</strong> built for the Wells Fargo x GCA Competition. 
            No real financial accounts, payments, or banking services are provided. 
            All data, calculations, and transactions are simulated for demo purposes only.
          </p>
          {variant === "modal" && (
            <p className="text-text-muted text-xs mt-2">
              In production, this would require proper banking partnerships, KYC/AML compliance, 
              and real-time payment rails.
            </p>
          )}
        </div>
        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDismissed(true)}
            className="flex-shrink-0 h-8 w-8 p-0 hover:bg-surface"
            aria-label="Dismiss disclaimer"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </>
  );

  if (variant === "banner") {
    return (
      <div className={cn(
        "sticky top-0 z-40 bg-warning/10 border-b border-warning/20 backdrop-blur-sm",
        className
      )}>
        <div className="container mx-auto px-4 py-3">
          {content}
        </div>
      </div>
    );
  }

  if (variant === "modal") {
    return (
      <Card className={cn("p-4 border-warning/30 bg-warning/5", className)}>
        {content}
      </Card>
    );
  }

  // Inline variant
  return (
    <div className={cn(
      "flex items-center gap-2 text-sm text-text-muted bg-surface/50 rounded-md p-3 border border-border",
      className
    )}>
      <Info className="h-4 w-4 text-info flex-shrink-0" />
      <span>
        <strong>Demo only:</strong> This is a mock financial application for demonstration purposes.
      </span>
    </div>
  );
}

/**
 * Full-screen disclaimer modal for first-time visitors
 */
export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(() => {
    // Check if user has seen disclaimer before
    try {
      return !localStorage.getItem("fairflow_disclaimer_seen");
    } catch {
      return true; // Show by default if localStorage unavailable
    }
  });

  const handleAccept = () => {
    try {
      localStorage.setItem("fairflow_disclaimer_seen", "true");
    } catch {
      // Ignore localStorage errors
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="max-w-lg mx-4 p-6 border-warning/30">
        <div className="text-center mb-6">
          <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Important Disclaimer
          </h2>
        </div>
        
        <div className="space-y-4 text-sm text-text-secondary">
          <p>
            <strong>This is a mock demonstration application</strong> created for the 
            Wells Fargo x GCA Early Talent Competition.
          </p>
          
          <div className="bg-surface rounded-md p-4 space-y-2">
            <p className="font-medium text-text-primary">This demo does NOT provide:</p>
            <ul className="list-disc list-inside space-y-1 text-text-muted">
              <li>Real financial services or loans</li>
              <li>Actual money transfers or payments</li>
              <li>Connection to bank accounts</li>
              <li>Financial advice or recommendations</li>
            </ul>
          </div>
          
          <p>
            All calculations, user profiles, and financial data are simulated. 
            This is purely a conceptual demonstration of fair financial relief principles.
          </p>
          
          <p className="text-xs text-text-muted">
            Production implementation would require banking partnerships, regulatory compliance, 
            KYC/AML procedures, and proper payment infrastructure.
          </p>
        </div>
        
        <Button 
          onClick={handleAccept}
          className="w-full mt-6"
        >
          I Understand - Continue to Demo
        </Button>
      </Card>
    </div>
  );
}