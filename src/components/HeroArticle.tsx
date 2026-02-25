import { motion } from "framer-motion";
import heroImage from "@/assets/hero-news.jpg";

const HeroArticle = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full aspect-[16/7] min-h-[400px] overflow-hidden group cursor-pointer"
    >
      <img
        src={heroImage}
        alt="City skyline at golden hour"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <div className="container">
          <span className="inline-block font-display text-xs font-semibold tracking-widest uppercase bg-accent text-accent-foreground px-3 py-1 mb-4">
            Breaking
          </span>
          <h2 className="font-display text-2xl md:text-5xl font-bold text-primary-foreground leading-tight max-w-3xl">
            Global Leaders Convene for Historic Climate Summit in Geneva
          </h2>
          <p className="font-body text-base md:text-lg text-primary-foreground/80 mt-3 max-w-2xl leading-relaxed">
            Representatives from 195 nations gather to finalize binding agreements on carbon emissions, 
            marking the most ambitious environmental accord in decades.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className="font-display text-sm text-primary-foreground/70">By Sarah Chen</span>
            <span className="text-primary-foreground/40">·</span>
            <span className="font-display text-sm text-primary-foreground/70">12 min read</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroArticle;
