import { useState } from "react";
import { UserCircle, Settings, LogOut, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const UserMenu = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
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
          <DropdownMenuItem onClick={() => setNotificationsOpen(true)} className="font-body text-sm gap-2 cursor-pointer">
            <Bell className="w-3.5 h-3.5" />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSettingsOpen(true)} className="font-body text-sm gap-2 cursor-pointer">
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

      {/* Notifications Dialog */}
      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-lg flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </DialogTitle>
          </DialogHeader>
          <div className="font-body text-sm text-muted-foreground space-y-3">
            <div className="py-8 text-center">
              <Bell className="w-8 h-8 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-foreground">No notifications yet</p>
              <p className="text-xs text-muted-foreground mt-1">You'll be notified when articles you've verified or challenged receive updates.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Account Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-lg flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Account Settings
            </DialogTitle>
          </DialogHeader>
          <div className="font-body text-sm text-muted-foreground space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Display Name</label>
                <input
                  type="text"
                  placeholder="Anonymous Citizen"
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-xs font-medium text-foreground">Email Notifications</p>
                  <p className="text-[10px] text-muted-foreground">Receive updates on your verified articles</p>
                </div>
                <button className="w-9 h-5 rounded-full bg-accent relative transition-colors">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-background transition-transform" />
                </button>
              </div>
            </div>
            <button className="w-full font-body text-sm font-semibold bg-foreground text-background py-2.5 rounded-md hover:bg-foreground/90 transition-colors">
              Save Changes
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserMenu;
