import { useState } from "react";
import { Send, Plus, X, Link as LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface CitationEntry {
  source: string;
  url: string;
}

const SubmitArticleDialog = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [citations, setCitations] = useState<CitationEntry[]>([
    { source: "", url: "" },
  ]);

  const validCitations = citations.filter((c) => c.source.trim() && c.url.trim());
  const canSubmit = url.trim() && title.trim() && validCitations.length >= 3;

  const handleAddCitation = () => {
    setCitations((prev) => [...prev, { source: "", url: "" }]);
  };

  const handleRemoveCitation = (index: number) => {
    if (citations.length <= 3) return;
    setCitations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCitationChange = (index: number, field: keyof CitationEntry, value: string) => {
    setCitations((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    toast.success("Article submitted for review. Thank you!");
    setUrl("");
    setTitle("");
    setDescription("");
    setCitations([{ source: "", url: "" }, { source: "", url: "" }, { source: "", url: "" }]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-body text-xs font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
          <Send className="w-3 h-3" />
          Submit
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
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

          {/* Citations */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-body text-xs font-medium text-muted-foreground">
                Citations * <span className="text-[10px] text-muted-foreground/60">(minimum 3)</span>
              </label>
              <span className="font-body text-[10px] text-muted-foreground">
                {validCitations.length}/3 required
              </span>
            </div>
            <div className="space-y-2">
              {citations.map((cite, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={cite.source}
                      onChange={(e) => handleCitationChange(i, "source", e.target.value)}
                      placeholder={`Source name (e.g., Reuters)`}
                      className="w-full bg-background border border-border rounded-md px-3 py-1.5 font-body text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <div className="relative">
                      <LinkIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground/40" />
                      <input
                        type="url"
                        value={cite.url}
                        onChange={(e) => handleCitationChange(i, "url", e.target.value)}
                        placeholder="https://..."
                        className="w-full pl-7 bg-background border border-border rounded-md px-3 py-1.5 font-body text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>
                  {citations.length > 3 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCitation(i)}
                      className="mt-1 p-1 rounded text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddCitation}
              className="mt-2 flex items-center gap-1 font-body text-xs text-accent hover:text-accent/80 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add another citation
            </button>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full font-body text-sm font-semibold bg-foreground text-background py-2.5 rounded-md hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
