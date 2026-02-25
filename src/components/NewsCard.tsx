import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink } from "lucide-react";

interface Citation {
  source: string;
  url: string;
}

interface NewsCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  index: number;
  tags: string[];
  citations: Citation[];
  verifications: number;
}

const NewsCard = ({ image, category, title, excerpt, author, readTime, index, tags, citations, verifications }: NewsCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden rounded-sm">
        <img
          src={image}
          alt={title}
          className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-accent">
            {category}
          </span>
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-[10px] font-medium tracking-wider uppercase text-muted-foreground bg-secondary px-2 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold mt-1 leading-snug group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
          {excerpt}
        </p>

        {/* Citations */}
        <div className="mt-3 flex flex-wrap gap-1">
          {citations.slice(0, 3).map((cite, i) => (
            <a
              key={i}
              href={cite.url}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 font-body text-[10px] text-muted-foreground hover:text-accent transition-colors bg-secondary/60 px-2 py-0.5 rounded-sm"
            >
              <ExternalLink className="w-2.5 h-2.5" />
              {cite.source}
            </a>
          ))}
          {citations.length > 3 && (
            <span className="font-body text-[10px] text-muted-foreground px-1 py-0.5">
              +{citations.length - 3} more
            </span>
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <span className="font-body text-xs text-muted-foreground">{author}</span>
          <span className="text-muted-foreground/30">·</span>
          <span className="font-body text-xs text-muted-foreground">{readTime}</span>
          <span className="ml-auto flex items-center gap-1 font-body text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5" />
            {verifications}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default NewsCard;
