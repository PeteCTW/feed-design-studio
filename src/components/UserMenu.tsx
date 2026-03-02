import { UserCircle, Settings, LogOut, BookMarked, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          aria-label="Account"
        >
          <UserCircle className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="font-body text-xs">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toast.info("Saved articles coming soon")} className="font-body text-sm gap-2 cursor-pointer">
          <BookMarked className="w-3.5 h-3.5" />
          Saved Articles
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Notifications coming soon")} className="font-body text-sm gap-2 cursor-pointer">
          <Bell className="w-3.5 h-3.5" />
          Notifications
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Account settings coming soon")} className="font-body text-sm gap-2 cursor-pointer">
          <Settings className="w-3.5 h-3.5" />
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toast.info("Login/signup coming soon")} className="font-body text-sm gap-2 cursor-pointer text-destructive">
          <LogOut className="w-3.5 h-3.5" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
