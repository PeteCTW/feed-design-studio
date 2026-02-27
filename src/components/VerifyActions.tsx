import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MessageCircleQuestion, ShieldCheck } from "lucide-react";

interface VerifyActionsProps {
  initialVerifications: number;
  veracityLevel: { label: string; color: string; width: string };
}

const VerifyActions = ({ initialVerifications, veracityLevel }: VerifyActionsProps) => {
  const [verifications, setVerifications] = useState(initialVerifications);
  const [challenges, setChallenges] = useState(0);
  const [userAction, setUserAction] = useState<"verify" | "challenge" | null>(null);

  const handleVerify = () => {
    if (userAction === "verify") {
      setVerifications((v) => v - 1);
      setUserAction(null);
    } else {
      if (userAction === "challenge") setChallenges((c) => c - 1);
      setVerifications((v) => v + 1);
      setUserAction("verify");
    }
  };

  const handleChallenge = () => {
    if (userAction === "challenge") {
      setChallenges((c) => c - 1);
      setUserAction(null);
    } else {
      if (userAction === "verify") setVerifications((v) => v - 1);
      setChallenges((c) => c + 1);
      setUserAction("challenge");
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
              ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-600 dark:text-yellow-400 shadow-sm"
              : "border-border text-muted-foreground hover:border-yellow-500/30 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-500/5"
          }`}
        >
          <MessageCircleQuestion className={`w-5 h-5 transition-transform duration-200 ${userAction === "challenge" ? "scale-110" : ""}`} />
          Challenge
          {challenges > 0 && (
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
          )}
        </button>
      </div>

      {/* Veracity meter */}
      <div className="p-4 bg-secondary/50 rounded-md border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-1.5 font-body text-sm font-semibold text-foreground">
            <ShieldCheck className="w-4 h-4" />
            {verifications} verifications
          </span>
          <span className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {veracityLevel.label}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className={`h-full ${veracityLevel.color} ${veracityLevel.width} rounded-full transition-all`} />
        </div>
        {challenges > 0 && (
          <p className="font-body text-xs text-yellow-600 dark:text-yellow-400 mt-2">
            {challenges} {challenges === 1 ? "challenge" : "challenges"} raised
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyActions;
