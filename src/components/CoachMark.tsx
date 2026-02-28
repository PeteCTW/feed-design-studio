import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CoachMarkProps {
  id: string;
  label: string;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const STORAGE_KEY = "ungov-coach-marks-dismissed";

const getDismissed = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const dismissMark = (id: string) => {
  const dismissed = getDismissed();
  if (!dismissed.includes(id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...dismissed, id]));
  }
};

export const resetCoachMarks = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const CoachMark = ({ id, label, position = "bottom", children }: CoachMarkProps) => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const dismissed = getDismissed();
    if (!dismissed.includes(id)) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [id]);

  const handleDismiss = () => {
    setExpanded(false);
    setVisible(false);
    dismissMark(id);
  };

  if (!visible) return <>{children}</>;

  const tooltipPositionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative">
      {children}
      {/* Pulsing dot */}
      {!expanded && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setExpanded(true)}
          className="absolute -top-1 -right-1 z-50"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
          </span>
        </motion.button>
      )}
      {/* Expanded tooltip */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute z-50 ${tooltipPositionClasses[position]}`}
          >
            <div className="bg-foreground text-background rounded-lg px-3 py-2 shadow-lg max-w-[200px]">
              <div className="flex items-start justify-between gap-2">
                <p className="font-body text-xs leading-relaxed">{label}</p>
                <button onClick={handleDismiss} className="shrink-0 p-0.5 hover:opacity-70">
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoachMark;
