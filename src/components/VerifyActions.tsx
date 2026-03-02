import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MessageCircleQuestion, ShieldCheck, Sparkles, ChevronDown } from "lucide-react";
import { getVeracityRating, getMockAISummary } from "@/lib/veracity";
import CoachMark from "@/components/CoachMark";

interface VerifyActionsProps {
  initialVerifications: number;
  initialChallenges: number;
}

const VerifyActions = ({ initialVerifications, initialChallenges }: VerifyActionsProps) => {
  const [verifications, setVerifications] = useState(initialVerifications);
  const [challenges, setChallenges] = useState(initialChallenges);
  const [userAction, setUserAction] = useState<"verify" | "challenge" | null>(null);
  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [submittedComments, setSubmittedComments] = useState<{ type: "verify" | "challenge"; text: string }[]>([]);
  const [showAISummary, setShowAISummary] = useState(true);

  const rating = getVeracityRating(verifications, challenges);
  const total = verifications + challenges;
  const verifyPercent = total > 0 ? (verifications / total) * 100 : 50;
  const challengePercent = total > 0 ? (challenges / total) * 100 : 50;

  const handleVerify = () => {
    if (userAction === "verify") {
      setVerifications((v) => v - 1);
      setUserAction(null);
      setShowCommentBox(false);
    } else {
      if (userAction === "challenge") setChallenges((c) => c - 1);
      setVerifications((v) => v + 1);
      setUserAction("verify");
      setShowCommentBox(true);
    }
  };

  const handleChallenge = () => {
    if (userAction === "challenge") {
      setChallenges((c) => c - 1);
      setUserAction(null);
      setShowCommentBox(false);
    } else {
      if (userAction === "verify") setVerifications((v) => v - 1);
      setChallenges((c) => c + 1);
      setUserAction("challenge");
      setShowCommentBox(true);
    }
  };

  const handleSubmitComment = () => {
    if (comment.trim() && userAction) {
      setSubmittedComments((prev) => [...prev, { type: userAction, text: comment.trim() }]);
      setComment("");
      setShowCommentBox(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleVerify}
          className={`flex-1 flex items-center justify-center gap-2.5 font-body text-sm font-semibold py-3.5 px-4 rounded-lg border-2 transition-all duration-200 ${
            userAction === "verify"
              ? "bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400 shadow-sm"
              : "border-border text-muted-foreground hover:border-green-500/30 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/5"
          }`}
        >
          <CheckCircle2 className={`w-5 h-5 transition-transform duration-200 ${userAction === "verify" ? "scale-110" : ""}`} />
          Verify
          <AnimatePresence mode="popLayout">
            <motion.span
              key={verifications}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="font-display text-xs font-bold bg-foreground/5 px-2 py-0.5 rounded-full"
            >
              {verifications}
            </motion.span>
          </AnimatePresence>
        </button>

        <button
          onClick={handleChallenge}
          className={`flex-1 flex items-center justify-center gap-2.5 font-body text-sm font-semibold py-3.5 px-4 rounded-lg border-2 transition-all duration-200 ${
            userAction === "challenge"
              ? "bg-amber-500/10 border-amber-500/50 text-amber-600 dark:text-amber-400 shadow-sm"
              : "border-border text-muted-foreground hover:border-amber-500/30 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/5"
          }`}
        >
          <MessageCircleQuestion className={`w-5 h-5 transition-transform duration-200 ${userAction === "challenge" ? "scale-110" : ""}`} />
          Challenge
          <AnimatePresence mode="popLayout">
            <motion.span
              key={challenges}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="font-display text-xs font-bold bg-foreground/5 px-2 py-0.5 rounded-full"
            >
              {challenges}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Comment box */}
      <AnimatePresence>
        {showCommentBox && userAction && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-secondary/50 rounded-lg border border-border">
              <label className="font-body text-xs font-medium text-muted-foreground mb-2 block">
                Add a comment (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={userAction === "verify" ? "What did you verify? Which sources did you check?" : "What aspects are you challenging? What concerns do you have?"}
                className="w-full h-20 bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setShowCommentBox(false)}
                  className="font-body text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={handleSubmitComment}
                  disabled={!comment.trim()}
                  className="font-body text-xs font-medium bg-foreground text-background px-4 py-1.5 rounded-md hover:bg-foreground/90 transition-colors disabled:opacity-40"
                >
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Veracity meter — stacked bar */}
      <CoachMark id="engagement-meter" label="The engagement meter shows the ratio of verifications to challenges from the community" position="top">
        <div className="p-4 bg-secondary/50 rounded-md border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 font-body text-sm font-semibold text-foreground">
              <ShieldCheck className="w-4 h-4" />
              {total} interactions
            </span>
            <span className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {rating.label}
            </span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden flex">
            <motion.div
              className={`h-full ${rating.verifyColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${verifyPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <motion.div
              className={`h-full ${rating.challengeColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${challengePercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-body text-[10px] text-green-600 dark:text-green-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {verifications} verified ({Math.round(verifyPercent)}%)
            </span>
            <span className="font-body text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <MessageCircleQuestion className="w-3 h-3" /> {challenges} challenged ({Math.round(challengePercent)}%)
            </span>
          </div>
        </div>
      </CoachMark>

      {/* AI Summary */}
      <CoachMark id="ai-analysis" label="AI analyzes anonymous community feedback to generate sentiment summaries" position="top">
        <div className="p-4 bg-accent/5 rounded-md border border-accent/20">
          <button
            onClick={() => setShowAISummary(!showAISummary)}
            className="flex items-center justify-between w-full"
          >
            <span className="flex items-center gap-2 font-body text-sm font-semibold text-foreground">
              <Sparkles className="w-4 h-4 text-accent" />
              AI Community Analysis
            </span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showAISummary ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {showAISummary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="font-body text-sm text-muted-foreground leading-relaxed mt-3">
                  {getMockAISummary(verifications, challenges)}
                </p>
                <span className="font-body text-[10px] text-muted-foreground/50 mt-2 block">
                  Generated from {submittedComments.length + Math.floor(total * 0.3)} anonymous comments
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CoachMark>
    </div>
  );
};

export default VerifyActions;
