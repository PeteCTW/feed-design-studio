import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck } from "lucide-react";

const trendingArticles = [
  { rank: 1, title: "Ethics Committee Opens Investigation Into PAC Funding", category: "Congress", verifications: 891 },
  { rank: 2, title: "State Legislatures Push Back on Federal Mandate", category: "State & Local", verifications: 654 },
  { rank: 3, title: "New Polling Data Reshapes Midterm Predictions", category: "Elections", verifications: 523 },
  { rank: 4, title: "Defense Budget Amendments Spark Floor Debate", category: "Policy", verifications: 412 },
  { rank: 5, title: "Former Officials Testify on Regulatory Overreach", category: "White House", verifications: 387 },
];

const TrendingSidebar = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-4 h-4 text-accent" />
        <h2 className="font-body text-xs font-semibold tracking-widest uppercase">Most Verified</h2>
      </div>
      <div className="space-y-0">
        {trendingArticles.map((article, i) => (
          <article
            key={i}
            className="group cursor-pointer py-4 border-b border-border last:border-0"
          >
            <div className="flex gap-4">
              <span className="font-display text-3xl font-bold text-muted-foreground/20 group-hover:text-accent/30 transition-colors leading-none">
                {String(article.rank).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-accent">
                  {article.category}
                </span>
                <h3 className="font-display text-sm font-semibold mt-0.5 leading-snug group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <span className="flex items-center gap-1 font-body text-[10px] text-muted-foreground mt-1">
                  <ShieldCheck className="w-3 h-3" /> {article.verifications} verified
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </motion.aside>
  );
};

export default TrendingSidebar;
