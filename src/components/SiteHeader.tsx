import { Info, ShieldCheck, CheckCircle2, MessageCircleQuestion, Sparkles, BarChart3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubmitArticleDialog from "@/components/SubmitArticleDialog";
import CoachMark from "@/components/CoachMark";
import UserMenu from "@/components/UserMenu";
import CountrySelector from "@/components/CountrySelector";

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
            <CountrySelector />

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
                <div className="font-body text-sm text-muted-foreground space-y-4 leading-relaxed">
                  <p>
                    <strong className="text-foreground">Unfor-gov-able</strong> is a community-driven political accountability platform.
                    Every article is backed by at least <strong className="text-foreground">3 citations</strong> from
                    primary sources, and verified by our community.
                  </p>

                  {/* Feature: Engagement Meter */}
                  <div className="p-3 bg-secondary/50 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-foreground" />
                      <span className="font-display text-xs font-bold text-foreground">Engagement Meter</span>
                    </div>
                    <p className="text-xs mb-2">Each article shows a live bar representing the ratio of verifications to challenges from the community.</p>
                    <div className="h-2.5 rounded-full overflow-hidden flex bg-muted">
                      <div className="h-full bg-green-500 w-[72%]" />
                      <div className="h-full bg-amber-500 w-[28%]" />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] flex items-center gap-0.5 text-green-600"><CheckCircle2 className="w-2.5 h-2.5" /> 72% Verified</span>
                      <span className="text-[10px] flex items-center gap-0.5 text-amber-600"><MessageCircleQuestion className="w-2.5 h-2.5" /> 28% Challenged</span>
                    </div>
                  </div>

                  {/* Feature: Ratings */}
                  <div className="p-3 bg-secondary/50 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-foreground" />
                      <span className="font-display text-xs font-bold text-foreground">Trust Ratings</span>
                    </div>
                    <p className="text-xs mb-2">Articles are rated on a five-point scale based on community consensus:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Trusted", "Largely Trusted", "Mixed", "Largely Contested", "Contested"].map((label) => (
                        <span key={label} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-foreground/5 border border-border">{label}</span>
                      ))}
                    </div>
                  </div>

                  {/* Feature: AI Sentiment */}
                  <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span className="font-display text-xs font-bold text-foreground">AI Sentiment Analysis</span>
                    </div>
                    <p className="text-xs">Our AI reviews anonymous community feedback and generates a summary of public sentiment and key concerns for every article.</p>
                  </div>

                  <p>
                    We tag every story with the <span className="text-accent font-medium">politicians</span>,
                    <span className="text-primary font-medium"> parties</span>, and
                    <span className="text-muted-foreground font-medium"> topics</span> involved —
                    so you always know who's accountable.
                  </p>

                  <div className="pt-2 border-t border-border text-xs text-muted-foreground/60">
                    Independent. Cited. Verified. Since 2026.
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
