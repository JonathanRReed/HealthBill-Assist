import { cn } from "@/lib/utils";

interface SkipLinksProps {
  className?: string;
}

export function SkipLinks({ className }: SkipLinksProps) {
  return (
    <div className={cn("sr-only focus-within:not-sr-only", className)}>
      <a
        href="#main-content"
        className="absolute top-4 left-4 z-50 bg-brand-gold text-background px-4 py-2 rounded-md font-medium 
                   focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                   transform -translate-y-full focus:translate-y-0 transition-transform"
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="absolute top-4 left-32 z-50 bg-brand-gold text-background px-4 py-2 rounded-md font-medium 
                   focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                   transform -translate-y-full focus:translate-y-0 transition-transform"
      >
        Skip to navigation
      </a>
    </div>
  );
}