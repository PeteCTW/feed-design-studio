import { useState } from "react";
import { Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const SubmitArticleDialog = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Article submitted for review. Thank you!");
    setUrl("");
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-body text-xs font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
          <Send className="w-3 h-3" />
          Submit
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">Submit an Article</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-xs font-medium text-muted-foreground mb-1 block">Source URL *</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-muted-foreground mb-1 block">Headline *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article headline"
              className="w-full bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-muted-foreground mb-1 block">Why is this important?</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief context for why this should be tracked..."
              className="w-full h-20 bg-background border border-border rounded-md px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <button
            type="submit"
            className="w-full font-body text-sm font-semibold bg-foreground text-background py-2.5 rounded-md hover:bg-foreground/90 transition-colors"
          >
            Submit for Review
          </button>
          <p className="font-body text-[10px] text-muted-foreground text-center">
            Submissions are reviewed for sourcing quality before publication.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitArticleDialog;
