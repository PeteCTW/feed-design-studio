import { motion } from "framer-motion";

interface NewsCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  index: number;
}

const NewsCard = ({ image, category, title, excerpt, author, readTime, index }: NewsCardProps) => {
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
        <span className="font-display text-xs font-semibold tracking-widest uppercase text-accent">
          {category}
        </span>
        <h3 className="font-display text-lg font-bold mt-1 leading-snug group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span className="font-display text-xs text-muted-foreground">{author}</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="font-display text-xs text-muted-foreground">{readTime}</span>
        </div>
      </div>
    </motion.article>
  );
};

export default NewsCard;
