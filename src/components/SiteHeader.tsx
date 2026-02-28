import { Info, UserCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubmitArticleDialog from "@/components/SubmitArticleDialog";
import CoachMark from "@/components/CoachMark";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <h1 className="font-display text-lg font-bold tracking-tight leading-none">
            Unfor<span className="text-accent">-gov-</span>able
          </h1>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <CoachMark id="submit" label="Submit articles for community verification" position="bottom">
              <SubmitArticleDialog />
            </CoachMark>

            {/* About dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" aria-label="About">
                  <Info className="w-4 h-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-display text-xl">
                    About Unfor<span className="text-accent">-gov-</span>able
                  </DialogTitle>
                </DialogHeader>
                <div className="font-body text-sm text-muted-foreground space-y-3 leading-relaxed">
                  <p>
                    <strong className="text-foreground">Unfor-gov-able</strong> is a community-driven political accountability platform.
                    Every article is backed by at least <strong className="text-foreground">3 citations</strong> from
                    primary sources, and verified by our community.
                  </p>
                  <p>
                    We tag every story with the <span className="text-accent font-medium">politicians</span>,
                    <span className="text-primary font-medium"> parties</span>, and
                    <span className="text-muted-foreground font-medium"> topics</span> involved —
                    so you always know who's accountable.
                  </p>
                  <p>
                    Our <strong className="text-foreground">veracity score</strong> reflects how many community
                    members have independently verified the claims in each article against the cited sources.
                  </p>
                  <div className="pt-2 border-t border-border text-xs text-muted-foreground/60">
                    Independent. Cited. Verified. Since 2026.
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Account */}
            <button className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" aria-label="Account">
              <UserCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
