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
  const wrapperSize = {
    sm: "h-8 w-8 p-1",
    md: "h-10 w-10 p-1.5",
    lg: "h-12 w-12 p-2",
  } as const;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("rounded-xl bg-gradient-brand shadow-md", wrapperSize[size])}>
        <div className="h-full w-full rounded-lg bg-elevated flex items-center justify-center">
          <img
            src="/favicon.png"
            alt="FairFlow logo"
            className={cn("rounded-md object-contain", sizeClasses[size])}
          />
        </div>
      </div>
      <span className="font-rubik font-bold text-xl text-text-primary">
        Fair<span className="text-brand-gold">Flow</span>
      </span>
    </div>
  );
}