import { useState, useMemo } from "react";
import SiteHeader from "@/components/SiteHeader";
import NewsCard from "@/components/NewsCard";
import TrendingSidebar from "@/components/TrendingSidebar";
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

// Extract all unique filter options
const allCategories = [...new Set(articles.map((a) => a.category))];
const allTagLabels = [...new Set(articles.flatMap((a) => a.tags.map((t) => t.label)))];
const filterOptions = [
  { label: "All", value: "all", type: "all" as const },
  ...allCategories.map((c) => ({ label: c, value: c, type: "category" as const })),
];

// Collect unique tags grouped by type for display
const uniqueTags = articles.flatMap((a) => a.tags).reduce((acc, tag) => {
  if (!acc.find((t) => t.label === tag.label)) acc.push(tag);
  return acc;
}, [] as { label: string; type: "politician" | "party" | "topic" }[]);

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const categoryMatch = activeFilter === "all" || article.category === activeFilter;
      const tagMatch = !activeTagFilter || article.tags.some((t) => t.label === activeTagFilter);
      return categoryMatch && tagMatch;
    });
  }, [activeFilter, activeTagFilter]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container py-6">
        {/* Filters */}
        <div className="mb-6 space-y-3">
          {/* Category row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={`font-body text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                  activeFilter === opt.value
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Tag row */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider mr-1 shrink-0">Tags:</span>
            {activeTagFilter && (
              <button
                onClick={() => setActiveTagFilter(null)}
                className="font-body text-[10px] font-medium px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/30 whitespace-nowrap"
              >
                ✕ Clear
              </button>
            )}
            {uniqueTags.map((tag) => {
              const isActive = activeTagFilter === tag.label;
              const baseStyles =
                tag.type === "politician"
                  ? "bg-accent/10 border-accent/30 text-accent"
                  : tag.type === "party"
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-secondary border-border text-muted-foreground";
              return (
                <button
                  key={tag.label}
                  onClick={() => setActiveTagFilter(isActive ? null : tag.label)}
                  className={`font-body text-[10px] font-medium px-2 py-1 rounded-full border whitespace-nowrap transition-all ${
                    isActive ? "ring-1 ring-foreground " + baseStyles : baseStyles + " hover:opacity-80"
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Feed */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredArticles.map((article, i) => (
                <NewsCard key={article.title} {...article} index={i} />
              ))}
              {filteredArticles.length === 0 && (
                <p className="font-body text-sm text-muted-foreground col-span-2 py-12 text-center">
                  No articles match your filters.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">
              <TrendingSidebar />

              <div className="mt-8 bg-card border border-border p-5 rounded-lg">
                <h3 className="font-display text-base font-bold">Join the community</h3>
                <p className="font-body text-xs mt-1.5 text-muted-foreground leading-relaxed">
                  Verified political stories, straight to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full mt-3 px-3 py-2 text-sm rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent font-body"
                />
                <button className="w-full mt-2 bg-accent text-accent-foreground font-body text-xs font-semibold py-2 rounded-md hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
