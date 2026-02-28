import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, TrendingUp, ShieldCheck, X, Search, CheckCircle2, MessageCircleQuestion, Clock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import NewsCard from "@/components/NewsCard";
import SiteFooter from "@/components/SiteFooter";
import CoachMark from "@/components/CoachMark";
import { articles, trendingArticles, getUniqueTags, politicianParty, partyColors, type Tag } from "@/lib/articles";
import { getVeracityRating, allRatingLevels, type VeracityLevel } from "@/lib/veracity";

const getTagStyle = (tag: Tag) => {
  if (tag.type === "party") {
    const colors = partyColors[tag.label];
    if (colors) return `${colors.bg} ${colors.border} ${colors.text}`;
    return "bg-primary/10 border-primary/30 text-primary";
  }
  if (tag.type === "politician") {
    const party = politicianParty[tag.label];
    if (party && partyColors[party]) {
      const colors = partyColors[party];
      return `${colors.bg} ${colors.border} ${colors.text}`;
    }
    return "bg-accent/10 border-accent/30 text-accent";
  }
  return "bg-secondary border-border text-muted-foreground";
};

type TrendingSort = "verified" | "recent" | "challenged";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(searchParams.get("tag"));
  const [activeRatingFilter, setActiveRatingFilter] = useState<VeracityLevel | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [trendingOpen, setTrendingOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [trendingSort, setTrendingSort] = useState<TrendingSort>("verified");

  const uniqueTags = useMemo(() => getUniqueTags(), []);

  // Sync tag param
  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam) {
      setActiveTagFilter(tagParam);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const tagMatch = !activeTagFilter || article.tags.some((t) => t.label === activeTagFilter);
      const ratingMatch = !activeRatingFilter || getVeracityRating(article.verifications, article.challenges).level === activeRatingFilter;
      return tagMatch && ratingMatch;
    });
  }, [activeTagFilter, activeRatingFilter]);

  const hasActiveFilters = activeTagFilter !== null || activeRatingFilter !== null;

  const filteredTags = useMemo(() => {
    if (!tagSearch.trim()) return uniqueTags;
    const q = tagSearch.toLowerCase();
    return uniqueTags.filter((t) => t.label.toLowerCase().includes(q));
  }, [tagSearch, uniqueTags]);

  const sortedTrending = useMemo(() => {
    const sorted = [...trendingArticles];
    switch (trendingSort) {
      case "verified": return sorted.sort((a, b) => b.verifications - a.verifications);
      case "challenged": return sorted.sort((a, b) => b.challenges - a.challenges);
      case "recent": return sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
  }, [trendingSort]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

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

                {/* Tag search */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      value={tagSearch}
                      onChange={(e) => setTagSearch(e.target.value)}
                      placeholder="Search tags..."
                      className="w-full pl-8 pr-3 py-2 bg-background border border-border rounded-md font-body text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                {/* Politicians */}
                {filteredTags.filter((t) => t.type === "politician").length > 0 && (
                  <div className="mb-5">
                    <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Politicians</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {filteredTags.filter((t) => t.type === "politician").map((tag) => (
                        <button
                          key={tag.label}
                          onClick={() => setActiveTagFilter(activeTagFilter === tag.label ? null : tag.label)}
                          className={`font-body text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                            activeTagFilter === tag.label
                              ? "bg-foreground text-background border-foreground"
                              : getTagStyle(tag)
                          }`}
                        >
                          {tag.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Parties */}
                {filteredTags.filter((t) => t.type === "party").length > 0 && (
                  <div className="mb-5">
                    <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Parties</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {filteredTags.filter((t) => t.type === "party").map((tag) => (
                        <button
                          key={tag.label}
                          onClick={() => setActiveTagFilter(activeTagFilter === tag.label ? null : tag.label)}
                          className={`font-body text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                            activeTagFilter === tag.label
                              ? "bg-foreground text-background border-foreground"
                              : getTagStyle(tag)
                          }`}
                        >
                          {tag.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topics */}
                {filteredTags.filter((t) => t.type === "topic").length > 0 && (
                  <div className="mb-5">
                    <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Topics</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {filteredTags.filter((t) => t.type === "topic").map((tag) => (
                        <button
                          key={tag.label}
                          onClick={() => setActiveTagFilter(activeTagFilter === tag.label ? null : tag.label)}
                          className={`font-body text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                            activeTagFilter === tag.label
                              ? "bg-foreground text-background border-foreground"
                              : getTagStyle(tag)
                          }`}
                        >
                          {tag.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating filter */}
                <div className="mb-5">
                  <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Rating</span>
                  <div className="flex flex-col gap-1 mt-2">
                    {allRatingLevels.map((r) => (
                      <button
                        key={r.level}
                        onClick={() => setActiveRatingFilter(activeRatingFilter === r.level ? null : r.level)}
                        className={`text-left font-body text-xs px-3 py-2 rounded-md transition-colors ${
                          activeRatingFilter === r.level ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={() => { setActiveTagFilter(null); setActiveRatingFilter(null); }}
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-sm font-bold">Trending</h3>
                  <button onClick={() => setTrendingOpen(false)} className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort tabs */}
                <div className="flex gap-1 mb-4 bg-secondary/50 rounded-md p-1">
                  {([
                    { key: "verified" as TrendingSort, label: "Verified", icon: CheckCircle2 },
                    { key: "recent" as TrendingSort, label: "Recent", icon: Clock },
                    { key: "challenged" as TrendingSort, label: "Challenged", icon: MessageCircleQuestion },
                  ]).map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setTrendingSort(key)}
                      className={`flex-1 flex items-center justify-center gap-1 font-body text-[10px] font-medium py-1.5 rounded transition-colors ${
                        trendingSort === key ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </button>
                  ))}
                </div>

                <div className="space-y-0">
                  {sortedTrending.map((article, i) => {
                    const rating = getVeracityRating(article.verifications, article.challenges);
                    return (
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
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 font-body text-[10px] text-muted-foreground">
                                <ShieldCheck className="w-3 h-3" /> {article.verifications}
                              </span>
                              <span className="flex items-center gap-1 font-body text-[10px] text-muted-foreground">
                                <MessageCircleQuestion className="w-3 h-3" /> {article.challenges}
                              </span>
                              <span className="font-body text-[10px] text-muted-foreground uppercase">{rating.label}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Edge triggers */}
      {!filterOpen && (
        <CoachMark id="filters" label="Filter articles by tags, parties, and veracity rating" position="right">
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
        </CoachMark>
      )}

      {!trendingOpen && (
        <CoachMark id="trending" label="See what's trending — most verified, recent, or challenged" position="left">
          <button
            onClick={() => setTrendingOpen(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-card border border-r-0 border-border rounded-l-lg px-1.5 py-4 shadow-md hover:bg-secondary transition-colors group"
            aria-label="Open trending"
          >
            <TrendingUp className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </CoachMark>
      )}

      <main className="container max-w-5xl py-6">
        {/* Active filter indicator */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">Filtering:</span>
            {activeTagFilter && (
              <span className="font-body text-[10px] font-medium bg-accent/10 text-accent border border-accent/30 px-2.5 py-1 rounded-full">
                {activeTagFilter}
              </span>
            )}
            {activeRatingFilter && (
              <span className="font-body text-[10px] font-medium bg-foreground text-background px-2.5 py-1 rounded-full">
                {allRatingLevels.find((r) => r.level === activeRatingFilter)?.label}
              </span>
            )}
            <button
              onClick={() => { setActiveTagFilter(null); setActiveRatingFilter(null); }}
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
