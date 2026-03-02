import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink, Flag, Hash, User, CheckCircle2, MessageCircleQuestion, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getVeracityRating, getMockAISummary } from "@/lib/veracity";
import { type Tag, politicianParty, partyColors } from "@/lib/articles";

interface Citation {
  source: string;
  url: string;
}

interface NewsCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  index: number;
  tags: Tag[];
  citations: Citation[];
  verifications: number;
  challenges: number;
  slug: string;
  status: "published" | "in-review";
}

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

const NewsCard = ({ image, category, title, excerpt, readTime, index, tags, citations, verifications, challenges, slug, status }: NewsCardProps) => {
  const rating = getVeracityRating(verifications, challenges);
  const total = verifications + challenges;
  const verifyPercent = total > 0 ? (verifications / total) * 100 : 50;
  const challengePercent = total > 0 ? (challenges / total) * 100 : 50;
  const [showHoverSummary, setShowHoverSummary] = useState(false);

  return (
    <Link to={`/article/${slug}`} className="block">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        className="group cursor-pointer bg-card rounded-lg border border-border hover:border-accent/30 transition-all hover:shadow-lg flex flex-col sm:flex-row overflow-hidden"
      >
        {/* Image */}
        <div className="sm:w-56 md:w-72 shrink-0 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-accent">
                {category}
              </span>
              {status === "in-review" && (
                <span className="font-body text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
                  In Review
                </span>
              )}
              <span className="text-muted-foreground/30">·</span>
              <span className="font-body text-xs text-muted-foreground">{readTime}</span>
            </div>
            </div>

            <h3 className="font-display text-base md:text-lg font-bold mt-1.5 leading-snug group-hover:text-accent transition-colors">
              {title}
            </h3>
            <p className="font-body text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
              {excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map((tag) => {
                const style = getTagStyle(tag);
                const Icon = style.icon;
                return (
                  <span
                    key={tag.label}
                    className={`inline-flex items-center gap-1 font-body text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border ${style.bg} ${style.text}`}
                  >
                    <Icon className="w-2.5 h-2.5" />
                    {tag.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Veracity meter — stacked bar */}
          <div
            className="relative mt-4 p-3 bg-secondary/50 rounded-md"
            onMouseEnter={() => setShowHoverSummary(true)}
            onMouseLeave={() => setShowHoverSummary(false)}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 font-body text-xs font-semibold text-foreground">
                <ShieldCheck className="w-3.5 h-3.5" />
                {total} interactions
              </span>
              <span className="font-body text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                {rating.label}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden flex">
              <div className={`h-full ${rating.verifyColor}`} style={{ width: `${verifyPercent}%` }} />
              <div className={`h-full ${rating.challengeColor}`} style={{ width: `${challengePercent}%` }} />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="font-body text-[9px] text-muted-foreground flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" /> {verifications}
              </span>
              <span className="font-body text-[9px] text-muted-foreground flex items-center gap-0.5">
                <MessageCircleQuestion className="w-2.5 h-2.5" /> {challenges}
              </span>
            </div>

            {/* Hover AI summary tooltip */}
            {showHoverSummary && (
              <div className="absolute bottom-full left-0 right-0 mb-2 z-10" onClick={(e) => e.preventDefault()}>
                <div className="bg-foreground text-background rounded-lg p-3 shadow-xl">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span className="font-body text-[10px] font-semibold">AI Community Summary</span>
                  </div>
                  <p className="font-body text-[11px] leading-relaxed opacity-90 line-clamp-3">
                    {getMockAISummary(verifications, challenges)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Citations */}
          <div className="mt-3 flex flex-wrap gap-1">
            {citations.slice(0, 3).map((cite, i) => (
              <a
                key={i}
                href={cite.url}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-0.5 font-body text-[10px] text-muted-foreground hover:text-accent transition-colors bg-secondary/60 px-1.5 py-0.5 rounded-full"
              >
                <ExternalLink className="w-2 h-2" />
                {cite.source}
              </a>
            ))}
            {citations.length > 3 && (
              <span className="font-body text-[10px] text-muted-foreground">+{citations.length - 3}</span>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default NewsCard;
