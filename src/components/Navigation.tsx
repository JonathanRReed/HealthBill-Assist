import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FairFlowLogo } from "./FairFlowLogo";
import { Link } from "react-router-dom";

interface NavigationProps {
  className?: string;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "BillBridge", href: "/bill-bridge" },
  { label: "Compare", href: "/comparison" },
  { label: "Plan", href: "/plan" },
  { label: "Disclosures", href: "/legal" },
];

export function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={className}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <FairFlowLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface border-border">
              <div className="flex flex-col space-y-4 mt-8">
                <FairFlowLogo className="mb-4" />
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-text-secondary hover:text-text-primary transition-colors text-lg font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}