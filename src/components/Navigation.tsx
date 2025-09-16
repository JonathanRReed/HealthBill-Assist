import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { FairFlowLogo } from "./FairFlowLogo";
import { Link } from "react-router-dom";
import { ProfileSwitcher } from "./ProfileSwitcher";
import type { Profile } from "@/data/profiles";
import { profiles } from "@/data/profiles";

interface NavigationProps {
  className?: string;
  selectedProfile?: Profile;
  onProfileChange?: (profile: Profile) => void;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "FAQ", href: "/faq" },
  { label: "BillBridge", href: "/bill-bridge" },
  { label: "Compare Costs", href: "/comparison" },
  { label: "Contact", href: "/contact" },
  { label: "My Plan", href: "/plan" },
];

export function Navigation({ className, selectedProfile, onProfileChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Ensure a consistent top bar across pages: if no profile props are provided,
  // manage a local profile so the switcher always shows.
  const [localProfile, setLocalProfile] = useState<Profile>(selectedProfile ?? profiles[0]);
  const effectiveProfile = selectedProfile ?? localProfile;
  const handleChange = onProfileChange ?? setLocalProfile;

  return (
    <nav className={className} id="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <FairFlowLogo />
            {/* Desktop Navigation - aligned left next to logo */}
            <div className="hidden md:flex items-center space-x-8" role="menubar">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium
                           focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-2 py-1"
                  role="menuitem"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/legal"
                className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium md:hidden
                         focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-2 py-1"
                role="menuitem"
              >
                Disclosures
              </Link>
            </div>
          </div>

          {/* Right side: Profile switcher */}
          <div className="hidden md:block">
            <ProfileSwitcher
              selectedProfile={effectiveProfile}
              onProfileChange={handleChange}
            />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface border-border px-5 overflow-x-hidden">
              {/* Accessible header for Dialog semantics */}
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Primary site navigation and profile selection</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-8" id="mobile-navigation" role="navigation" aria-label="Mobile navigation">
                <FairFlowLogo className="mb-4 pl-2" />
                <div className="pl-2">
                  <ProfileSwitcher
                    selectedProfile={effectiveProfile}
                    onProfileChange={(p) => { handleChange(p); setIsOpen(false); }}
                  />
                </div>
                <ul className="space-y-2" role="menu">
                  {navItems.map((item) => (
                    <li key={item.label} role="none">
                      <Link
                        to={item.href}
                        className="block text-text-secondary hover:text-text-primary transition-colors text-lg font-medium py-2
                                 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                        onClick={() => setIsOpen(false)}
                        role="menuitem"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li role="none">
                    <Link
                      to="/legal"
                      className="block text-text-secondary hover:text-text-primary transition-colors text-lg font-medium py-2
                               focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                      onClick={() => setIsOpen(false)}
                      role="menuitem"
                    >
                      Disclosures
                    </Link>
                  </li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}