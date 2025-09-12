import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // FairFlow Primary - Brand Red
        default: "bg-brand-red hover:bg-brand-red-hover active:bg-brand-red-focus text-text-primary font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
        
        // FairFlow Secondary - Gold accent
        secondary: "bg-brand-gold hover:bg-brand-gold-hover active:bg-brand-gold-focus text-background font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
        
        // Outline variant for secondary actions
        outline: "border border-border bg-surface hover:bg-elevated hover:border-border-hover text-text-primary",
        
        // Ghost for subtle interactions
        ghost: "hover:bg-elevated text-text-secondary hover:text-text-primary",
        
        // Glass effect for hero sections
        glass: "bg-surface/80 backdrop-blur-sm border border-border/50 hover:bg-elevated/80 hover:border-border text-text-primary shadow-md",
        
        // Success state
        success: "bg-success hover:bg-success/90 text-text-primary font-medium",
        
        // Destructive
        destructive: "bg-error hover:bg-error/90 text-text-primary font-medium",
        
        // Link style
        link: "text-brand-gold hover:text-brand-gold-hover underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-10 px-4 py-2 rounded-md",
        lg: "h-12 px-6 text-base rounded-lg",
        xl: "h-14 px-8 text-lg rounded-lg font-medium",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
