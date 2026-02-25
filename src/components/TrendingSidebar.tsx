import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const trendingArticles = [
  { rank: 1, title: "AI Chip Startup Raises $2B in Record Funding Round", category: "Tech" },
  { rank: 2, title: "Central Banks Signal Coordinated Rate Adjustments", category: "Business" },
  { rank: 3, title: "New CRISPR Technique Shows Promise for Rare Diseases", category: "Science" },
  { rank: 4, title: "Underground Music Scene Reshaping Cultural Landscape", category: "Culture" },
  { rank: 5, title: "Olympic Committee Announces Controversial Rule Changes", category: "Sports" },
];

const TrendingSidebar = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-accent" />
        <h2 className="font-display text-lg font-bold tracking-wide uppercase">Trending</h2>
      </div>
      <div className="space-y-0">
        {trendingArticles.map((article, i) => (
          <article
            key={i}
            className="group cursor-pointer py-4 border-b border-border last:border-0"
          >
            <div className="flex gap-4">
              <span className="font-display text-3xl font-bold text-muted-foreground/30 group-hover:text-accent/30 transition-colors leading-none">
                {String(article.rank).padStart(2, "0")}
              </span>
              <div>
                <span className="font-display text-[10px] font-semibold tracking-widest uppercase text-accent">
                  {article.category}
                </span>
                <h3 className="font-display text-sm font-semibold mt-0.5 leading-snug group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </motion.aside>
  );
};

export default TrendingSidebar;
