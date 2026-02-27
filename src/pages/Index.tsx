import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, TrendingUp, ShieldCheck, ChevronLeft, ChevronRight, X } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import NewsCard from "@/components/NewsCard";
import SiteFooter from "@/components/SiteFooter";

import newsTech from "@/assets/news-tech.jpg";
import newsFinance from "@/assets/news-finance.jpg";
import newsNature from "@/assets/news-nature.jpg";
import newsSports from "@/assets/news-sports.jpg";
import newsCulture from "@/assets/news-culture.jpg";

const articles = [
  {
    image: newsTech,
    category: "Policy",
    title: "Surveillance Reform Bill Faces Crucial Senate Vote This Week",
    excerpt: "Bipartisan legislation to overhaul FISA Section 702 reaches the Senate floor amid heated debate over civil liberties and national security.",
    author: "Marcus Webb",
    readTime: "8 min",
    tags: [
      { label: "Sen. Wyden", type: "politician" as const },
      { label: "Democrat", type: "party" as const },
      { label: "Privacy", type: "topic" as const },
    ],
    citations: [
      { source: "Congressional Record", url: "#" },
      { source: "ACLU Brief", url: "#" },
      { source: "DOJ Statement", url: "#" },
    ],
    verifications: 234,
  },
  {
    image: newsFinance,
    category: "Elections",
    title: "Dark Money Groups Outspend Candidates 3-to-1 in Key Races",
    excerpt: "FEC filings reveal unprecedented outside spending in competitive districts, raising questions about campaign finance enforcement.",
    author: "Elena Vasquez",
    readTime: "6 min",
    tags: [
      { label: "FEC", type: "topic" as const },
      { label: "Republican", type: "party" as const },
      { label: "Campaign Finance", type: "topic" as const },
    ],
    citations: [
      { source: "FEC Filing Data", url: "#" },
      { source: "OpenSecrets", url: "#" },
      { source: "Brennan Center", url: "#" },
    ],
    verifications: 189,
  },
  {
    image: newsNature,
    category: "White House",
    title: "Executive Order on Climate Faces Legal Challenge from 18 States",
    excerpt: "A coalition of state attorneys general files suit arguing the administration overstepped its authority on emissions regulations.",
    author: "Dr. James Okafor",
    readTime: "10 min",
    tags: [
      { label: "EPA", type: "topic" as const },
      { label: "Republican", type: "party" as const },
      { label: "Rep. McCarthy", type: "politician" as const },
    ],
    citations: [
      { source: "Court Filing", url: "#" },
      { source: "EPA.gov", url: "#" },
      { source: "State AG Coalition", url: "#" },
      { source: "Reuters", url: "#" },
    ],
    verifications: 567,
  },
  {
    image: newsSports,
    category: "Congress",
    title: "Infrastructure Package Stalls as Factions Clash Over Funding",
    excerpt: "House leadership scrambles to bridge divides within the caucus as the deadline for a continuing resolution approaches.",
    author: "Rika Tanaka",
    readTime: "5 min",
    tags: [
      { label: "Speaker Johnson", type: "politician" as const },
      { label: "Budget", type: "topic" as const },
      { label: "Bipartisan", type: "topic" as const },
    ],
    citations: [
      { source: "CBO Score", url: "#" },
      { source: "House Rules Cmte", url: "#" },
      { source: "Politico", url: "#" },
    ],
    verifications: 312,
  },
  {
    image: newsCulture,
    category: "State & Local",
    title: "Redistricting Battles Intensify Ahead of 2026 Cycle",
    excerpt: "Court-ordered map redraws in three states could reshape the competitive landscape for dozens of House seats.",
    author: "Amir Patel",
    readTime: "7 min",
    tags: [
      { label: "SCOTUS", type: "topic" as const },
      { label: "Democrat", type: "party" as const },
      { label: "Voting Rights", type: "topic" as const },
    ],
    citations: [
      { source: "SCOTUS Opinion", url: "#" },
      { source: "Redistricting Data Hub", url: "#" },
      { source: "AP News", url: "#" },
    ],
    verifications: 445,
  },
];

const allCategories = [...new Set(articles.map((a) => a.category))];
const uniqueTags = articles.flatMap((a) => a.tags).reduce((acc, tag) => {
  if (!acc.find((t) => t.label === tag.label)) acc.push(tag);
  return acc;
}, [] as { label: string; type: "politician" | "party" | "topic" }[]);

const trendingArticles = [
  { title: "Ethics Committee Opens Investigation Into PAC Funding", category: "Congress", verifications: 891 },
  { title: "State Legislatures Push Back on Federal Mandate", category: "State & Local", verifications: 654 },
  { title: "New Polling Data Reshapes Midterm Predictions", category: "Elections", verifications: 523 },
  { title: "Defense Budget Amendments Spark Floor Debate", category: "Policy", verifications: 412 },
  { title: "Former Officials Testify on Regulatory Overreach", category: "White House", verifications: 387 },
];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [trendingOpen, setTrendingOpen] = useState(false);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const categoryMatch = activeFilter === "all" || article.category === activeFilter;
      const tagMatch = !activeTagFilter || article.tags.some((t) => t.label === activeTagFilter);
      return categoryMatch && tagMatch;
    });
  }, [activeFilter, activeTagFilter]);

  const hasActiveFilters = activeFilter !== "all" || activeTagFilter !== null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Edge panels */}
      {/* Filter panel - left */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-[2px]"
              onClick={() => setFilterOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-14 bottom-0 z-50 w-72 bg-card border-r border-border shadow-lg overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display text-sm font-bold">Filters</h3>
                  <button onClick={() => setFilterOpen(false)} className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-5">
                  <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Category</span>
                  <div className="flex flex-col gap-1 mt-2">
                    <button
                      onClick={() => setActiveFilter("all")}
                      className={`text-left font-body text-xs px-3 py-2 rounded-md transition-colors ${
                        activeFilter === "all" ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      All
                    </button>
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`text-left font-body text-xs px-3 py-2 rounded-md transition-colors ${
                          activeFilter === cat ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Politicians */}
                <div className="mb-5">
                  <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Politicians</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {uniqueTags.filter((t) => t.type === "politician").map((tag) => (
                      <button
                        key={tag.label}
                        onClick={() => setActiveTagFilter(activeTagFilter === tag.label ? null : tag.label)}
                        className={`font-body text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                          activeTagFilter === tag.label
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-accent/10 border-accent/30 text-accent hover:bg-accent/20"
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parties */}
                <div className="mb-5">
                  <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Parties</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {uniqueTags.filter((t) => t.type === "party").map((tag) => (
                      <button
                        key={tag.label}
                        onClick={() => setActiveTagFilter(activeTagFilter === tag.label ? null : tag.label)}
                        className={`font-body text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                          activeTagFilter === tag.label
                            ? "bg-foreground text-background border-foreground"
                            : "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-5">
                  <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Topics</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {uniqueTags.filter((t) => t.type === "topic").map((tag) => (
                      <button
                        key={tag.label}
                        onClick={() => setActiveTagFilter(activeTagFilter === tag.label ? null : tag.label)}
                        className={`font-body text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                          activeTagFilter === tag.label
                            ? "bg-foreground text-background border-foreground"
                            : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={() => { setActiveFilter("all"); setActiveTagFilter(null); }}
                    className="w-full font-body text-xs text-accent font-medium py-2 rounded-md border border-accent/30 hover:bg-accent/10 transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Trending panel - right */}
      <AnimatePresence>
        {trendingOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-[2px]"
              onClick={() => setTrendingOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-14 bottom-0 z-50 w-80 bg-card border-l border-border shadow-lg overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <h3 className="font-display text-sm font-bold">Most Verified</h3>
                  </div>
                  <button onClick={() => setTrendingOpen(false)} className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-0">
                  {trendingArticles.map((article, i) => (
                    <article key={i} className="group cursor-pointer py-4 border-b border-border last:border-0">
                      <div className="flex gap-3">
                        <span className="font-display text-2xl font-bold text-muted-foreground/20 group-hover:text-accent/30 transition-colors leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-accent">
                            {article.category}
                          </span>
                          <h4 className="font-display text-sm font-semibold mt-0.5 leading-snug group-hover:text-accent transition-colors">
                            {article.title}
                          </h4>
                          <span className="flex items-center gap-1 font-body text-[10px] text-muted-foreground mt-1">
                            <ShieldCheck className="w-3 h-3" /> {article.verifications} verified
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Edge triggers (visible when panels closed) */}
      {!filterOpen && (
        <button
          onClick={() => setFilterOpen(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-30 bg-card border border-l-0 border-border rounded-r-lg px-1.5 py-4 shadow-md hover:bg-secondary transition-colors group"
          aria-label="Open filters"
        >
          <Filter className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
          {hasActiveFilters && (
            <div className="w-1.5 h-1.5 bg-accent rounded-full absolute top-2 right-1.5" />
          )}
        </button>
      )}

      {!trendingOpen && (
        <button
          onClick={() => setTrendingOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-card border border-r-0 border-border rounded-l-lg px-1.5 py-4 shadow-md hover:bg-secondary transition-colors group"
          aria-label="Open trending"
        >
          <TrendingUp className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      )}

      <main className="container max-w-3xl py-6">
        {/* Active filter indicator */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">Filtering:</span>
            {activeFilter !== "all" && (
              <span className="font-body text-[10px] font-medium bg-foreground text-background px-2.5 py-1 rounded-full">
                {activeFilter}
              </span>
            )}
            {activeTagFilter && (
              <span className="font-body text-[10px] font-medium bg-accent/10 text-accent border border-accent/30 px-2.5 py-1 rounded-full">
                {activeTagFilter}
              </span>
            )}
            <button
              onClick={() => { setActiveFilter("all"); setActiveTagFilter(null); }}
              className="font-body text-[10px] text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Clear
            </button>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {filteredArticles.map((article, i) => (
            <NewsCard key={article.title} {...article} index={i} />
          ))}
          {filteredArticles.length === 0 && (
            <p className="font-body text-sm text-muted-foreground py-12 text-center">
              No articles match your filters.
            </p>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
