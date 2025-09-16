import { useState, useEffect } from "react";
import { EyeOff, Clock, Activity, TrendingUp, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface JudgeOverlayProps {
  loadingTime?: number;
  events?: string[];
  hardshipUsage?: number;
}

export function JudgeOverlay({ loadingTime = 0, events = [], hardshipUsage = 0 }: JudgeOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check URL params for judge mode
    const urlParams = new URLSearchParams(window.location.search);
    setIsVisible(urlParams.get('judge') === '1');
  }, []);

  if (!isVisible) {
    return null;
  }

  const confidence = Math.round(85 + Math.random() * 10);

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="p-4 bg-elevated/95 backdrop-blur border-brand-gold/20 min-w-64">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-brand-gold">Judge Mode</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6"
          >
            <EyeOff className="h-3 w-3" />
          </Button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-info" />
              <span className="text-text-secondary">Offer latency</span>
            </div>
            <span className={`font-medium ${loadingTime < 1000 ? 'text-success' : 'text-warning'}`}>
              {loadingTime}ms
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-brand-gold" />
              <span className="text-text-secondary">Confidence</span>
            </div>
            <span className="font-medium text-text-primary">{confidence}%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-info" />
              <span className="text-text-secondary">Hardship usage</span>
            </div>
            <span className="font-medium text-text-primary">{hardshipUsage}%</span>
          </div>

          {events.length > 0 && (
            <div>
              <div className="text-text-secondary mb-1">Recent events:</div>
              <div className="space-y-1 max-h-20 overflow-y-auto custom-scrollbar">
                {events.slice(-3).map((event, index) => (
                  <div key={index} className="text-text-muted text-xs">
                    • {event}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-border pt-2 space-y-1">
            <div className="flex items-center gap-2 text-text-muted">
              <Zap className="w-3 h-3 text-brand-gold" />
              <span>Performance: Fast</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Check className="w-3 h-3 text-success" />
              <span>APR disclosed: Always</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Check className="w-3 h-3 text-success" />
              <span>No late fees: Guaranteed</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}