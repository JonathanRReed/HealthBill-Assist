import { cn } from "@/lib/utils";

interface FairFlowLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

export function FairFlowLogo({ className, size = "md", showWordmark = true }: FairFlowLogoProps) {
  const wrapperSize = {
    sm: "h-8 w-8 p-1",
    md: "h-10 w-10 p-1.5",
    lg: "h-12 w-12 p-2",
  } as const;
  const imgSize = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  } as const;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("rounded-xl bg-gradient-brand shadow-md", wrapperSize[size])}>
        <div className="h-full w-full rounded-lg bg-elevated ring-1 ring-white/20 flex items-center justify-center">
          <img
            src={`${import.meta.env.BASE_URL}favicon.svg`}
            alt="HealthBill Assist logo"
            className={cn("rounded-md object-contain", imgSize[size])}
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
      {showWordmark && (
        <span className="font-rubik font-bold text-xl text-text-primary whitespace-nowrap">
          HealthBill <span className="text-brand-gold">Assist</span>
        </span>
      )}
    </div>
  );
}