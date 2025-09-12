import { cn } from "@/lib/utils";

interface FairFlowLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function FairFlowLogo({ className, size = "md" }: FairFlowLogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8", 
    lg: "h-10"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src="/favicon.png"
        alt="FairFlow logo"
        className={cn("rounded-lg", sizeClasses[size])}
      />
      <span className="font-rubik font-bold text-xl text-text-primary">
        Fair<span className="text-brand-gold">Flow</span>
      </span>
    </div>
  );
}