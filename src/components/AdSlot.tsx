import { Megaphone } from "lucide-react";

interface AdSlotProps {
  position?: number;
}

const AdSlot = ({ position = 0 }: AdSlotProps) => {
  return (
    <div className="w-full bg-secondary/30 border border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center gap-2 my-2">
      <div className="flex items-center gap-1.5 text-muted-foreground/40">
        <Megaphone className="w-4 h-4" />
        <span className="font-body text-[10px] uppercase tracking-widest font-medium">Advertisement</span>
      </div>
      <div className="w-full max-w-md h-20 bg-muted/30 rounded-md flex items-center justify-center">
        <span className="font-body text-xs text-muted-foreground/30">Ad Slot #{position + 1}</span>
      </div>
    </div>
  );
};

export default AdSlot;
