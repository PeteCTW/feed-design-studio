import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink, User, Flag, Hash } from "lucide-react";

interface Citation {
  source: string;
  url: string;
}

interface Tag {
  label: string;
  type: "politician" | "party" | "topic";
}

interface NewsCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  index: number;
  tags: Tag[];
  citations: Citation[];
  verifications: number;
}

const tagStyles: Record<Tag["type"], { bg: string; text: string; icon: typeof User }> = {
  politician: { bg: "bg-accent/10 border-accent/30", text: "text-accent", icon: User },
  party: { bg: "bg-primary/10 border-primary/30", text: "text-primary", icon: Flag },
  topic: { bg: "bg-secondary border-border", text: "text-muted-foreground", icon: Hash },
};

const getVeracityLevel = (v: number) => {
  if (v >= 500) return { label: "High confidence", color: "bg-green-500", width: "w-full" };
  if (v >= 200) return { label: "Moderate", color: "bg-yellow-500", width: "w-2/3" };
  return { label: "Developing", color: "bg-muted-foreground", width: "w-1/3" };
};

const NewsCard = ({ image, category, title, excerpt, author, readTime, index, tags, citations, verifications }: NewsCardProps) => {
  const veracity = getVeracityLevel(verifications);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group cursor-pointer bg-card rounded-lg border border-border hover:border-accent/30 transition-all hover:shadow-lg flex flex-col sm:flex-row overflow-hidden"
    >
      {/* Image — full width on mobile, fixed side on desktop */}
      <div className="sm:w-56 md:w-64 shrink-0 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
        <div>
          {/* Category + Veracity inline */}
          <div className="flex items-center justify-between gap-3">
            <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-accent">
              {category}
            </span>
            <span className="flex items-center gap-1 font-body text-[10px] font-medium text-muted-foreground">
              <ShieldCheck className="w-3 h-3" />
              {verifications}
            </span>
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
              const style = tagStyles[tag.type];
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

        {/* Bottom row: veracity bar + citations + author */}
        <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
          {/* Veracity bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${veracity.color} ${veracity.width} rounded-full transition-all`} />
            </div>
            <span className="font-body text-[10px] font-medium text-muted-foreground whitespace-nowrap">
              {veracity.label}
            </span>
          </div>

          {/* Citations + Meta */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1 flex-wrap">
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
            <div className="flex items-center gap-2">
              <span className="font-body text-xs font-medium text-foreground">{author}</span>
              <span className="text-muted-foreground/30">·</span>
              <span className="font-body text-xs text-muted-foreground">{readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default NewsCard;
