import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Profile, profiles } from "@/data/profiles";

interface ProfileSwitcherProps {
  selectedProfile: Profile;
  onProfileChange: (profile: Profile) => void;
}

export function ProfileSwitcher({ selectedProfile, onProfileChange }: ProfileSwitcherProps) {
  const avatar = (name: string) => name.charAt(0).toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 w-full justify-start h-auto py-2">
          <div className="flex items-center gap-2 w-full">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-brand text-background font-rubik font-bold flex-shrink-0">
              {avatar(selectedProfile.name)}
            </div>
            <div className="text-left min-w-0 flex-1">
              <div className="text-sm font-medium text-text-primary truncate">{selectedProfile.name}</div>
              <div className="text-xs text-text-muted truncate">{selectedProfile.description}</div>
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
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-brand text-background font-rubik font-bold">
              {avatar(profile.name)}
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