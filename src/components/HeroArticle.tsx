import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink } from "lucide-react";
import heroImage from "@/assets/hero-news.jpg";

const HeroArticle = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full aspect-[16/7] min-h-[420px] overflow-hidden group cursor-pointer"
    >
      <img
        src={heroImage}
        alt="Capitol building during legislative session"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-block font-body text-[10px] font-semibold tracking-widest uppercase bg-accent text-accent-foreground px-3 py-1">
              Breaking
            </span>
            <span className="inline-block font-body text-[10px] font-medium tracking-wider uppercase bg-primary-foreground/15 text-primary-foreground px-3 py-1 border border-primary-foreground/20">
              Congress
            </span>
            <span className="inline-block font-body text-[10px] font-medium tracking-wider uppercase bg-primary-foreground/15 text-primary-foreground px-3 py-1 border border-primary-foreground/20">
              Budget
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-5xl font-bold text-primary-foreground leading-tight max-w-3xl">
            Landmark Oversight Bill Clears Committee in Bipartisan Vote
          </h2>
          <p className="font-body text-sm md:text-base text-primary-foreground/75 mt-3 max-w-2xl leading-relaxed">
            The Government Accountability and Transparency Act passes with rare cross-party support, 
            establishing new mechanisms for public access to federal spending data.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="font-body text-xs text-primary-foreground/60">By Catherine Morales</span>
            <span className="text-primary-foreground/30">·</span>
            <span className="font-body text-xs text-primary-foreground/60">12 min read</span>
            <span className="text-primary-foreground/30">·</span>
            <span className="flex items-center gap-1 font-body text-xs text-primary-foreground/60">
              <ExternalLink className="w-3 h-3" /> 5 citations
            </span>
            <span className="text-primary-foreground/30">·</span>
            <span className="flex items-center gap-1 font-body text-xs text-primary-foreground/60">
              <ShieldCheck className="w-3 h-3" /> 342 verified
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroArticle;
