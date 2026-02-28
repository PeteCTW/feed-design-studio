import { Share2, Link2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

const ShareButtons = ({ title, slug }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/article/${slug}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToX = () => {
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Share</span>
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
      </button>
      <button
        onClick={shareToX}
        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Share on X"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ShareButtons;
