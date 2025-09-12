import { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Profile {
  id: string;
  name: string;
  age: number;
  description: string;
  deposits: number[];
  nsfCount: number;
  expectedLimit: number;
}

const profiles: Profile[] = [
  {
    id: "alex",
    name: "Alex",
    age: 26,
    description: "Hourly worker - steady income",
    deposits: [985, 990, 978],
    nsfCount: 0,
    expectedLimit: 240,
  },
  {
    id: "riley",
    name: "Riley", 
    age: 20,
    description: "Student - irregular income",
    deposits: [450, 0, 320],
    nsfCount: 1,
    expectedLimit: 90,
  },
  {
    id: "sam",
    name: "Sam",
    age: 41,
    description: "Caregiver - multiple bills",
    deposits: [1200, 1150, 1180],
    nsfCount: 0,
    expectedLimit: 280,
  },
];

interface ProfileSwitcherProps {
  selectedProfile: Profile;
  onProfileChange: (profile: Profile) => void;
}

export function ProfileSwitcher({ selectedProfile, onProfileChange }: ProfileSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-gold/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-brand-gold" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-text-primary">{selectedProfile.name}</div>
              <div className="text-xs text-text-muted">{selectedProfile.description}</div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-text-muted" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {profiles.map((profile) => (
          <DropdownMenuItem
            key={profile.id}
            onClick={() => onProfileChange(profile)}
            className="flex items-center gap-3 p-3 cursor-pointer"
          >
            <div className="w-8 h-8 bg-brand-gold/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-brand-gold" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-text-primary">{profile.name}, {profile.age}</div>
              <div className="text-xs text-text-muted">{profile.description}</div>
              <div className="text-xs text-success">Expected limit: ${profile.expectedLimit}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { profiles };