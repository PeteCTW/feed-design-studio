import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, User, Flag, Hash } from "lucide-react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import VerifyActions from "@/components/VerifyActions";
import ShareButtons from "@/components/ShareButtons";
import CoachMark from "@/components/CoachMark";
import { articles, politicianParty, partyColors, type Tag } from "@/lib/articles";

const getTagStyle = (tag: Tag) => {
  if (tag.type === "party") {
    const colors = partyColors[tag.label];
    if (colors) return { bg: `${colors.bg} ${colors.border}`, text: colors.text, icon: Flag };
    return { bg: "bg-primary/10 border-primary/30", text: "text-primary", icon: Flag };
  }
  if (tag.type === "politician") {
    const party = politicianParty[tag.label];
    if (party && partyColors[party]) {
      const colors = partyColors[party];
      return { bg: `${colors.bg} ${colors.border}`, text: colors.text, icon: User };
    }
    return { bg: "bg-accent/10 border-accent/30", text: "text-accent", icon: User };
  }
  return { bg: "bg-secondary border-border", text: "text-muted-foreground", icon: Hash };
};

const Article = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container max-w-3xl py-16 text-center">
          <h1 className="font-display text-2xl font-bold">Article not found</h1>
          <Link to="/" className="font-body text-sm text-accent hover:underline mt-4 inline-block">
            ← Back to feed
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const handleTagClick = (tag: Tag) => {
    navigate(`/?tag=${encodeURIComponent(tag.label)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container max-w-3xl py-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to feed
          </Link>
          <ShareButtons title={article.title} slug={article.slug} />
        </div>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-accent">
              {article.category}
            </span>
            {article.status === "in-review" && (
              <span className="font-body text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
                In Review
              </span>
            )}
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold mt-2 leading-tight">
            {article.title}
          </h1>
          <p className="font-body text-base text-muted-foreground mt-2">{article.readTime} read</p>

          {/* Clickable Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {article.tags.map((tag) => {
              const style = getTagStyle(tag);
              const Icon = style.icon;
              return (
                <button
                  key={tag.label}
                  onClick={() => handleTagClick(tag)}
                  className={`inline-flex items-center gap-1 font-body text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border hover:opacity-80 transition-opacity ${style.bg} ${style.text}`}
                >
                  <Icon className="w-2.5 h-2.5" />
                  {tag.label}
                </button>
              );
            })}
          </div>

          {/* Hero image */}
          <div className="mt-6 rounded-lg overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full aspect-[2/1] object-cover" loading="lazy" />
          </div>

          {/* Verify / Challenge actions */}
          <CoachMark id="verify" label="Verify or challenge claims with the community" position="top">
            <VerifyActions
              initialVerifications={article.verifications}
              initialChallenges={article.challenges}
            />
          </CoachMark>

          {/* Body */}
          <div className="mt-8 font-body text-base leading-relaxed text-foreground space-y-4">
            {article.body.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Citations */}
          <CoachMark id="citations" label="Every article requires cited primary sources for accountability" position="top">
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-display text-sm font-bold mb-3">Sources & Citations</h3>
              <div className="flex flex-wrap gap-2">
                {article.citations.map((cite, i) => (
                  <a
                    key={i}
                    href={cite.url}
                    className="inline-flex items-center gap-1 font-body text-xs text-muted-foreground hover:text-accent transition-colors bg-secondary/60 px-3 py-1.5 rounded-full border border-border"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {cite.source}
                  </a>
                ))}
              </div>
            </div>
          </CoachMark>
        </motion.article>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Article;
