import SiteHeader from "@/components/SiteHeader";
import HeroArticle from "@/components/HeroArticle";
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
    readTime: "8 min read",
    tags: ["Sen. Wyden", "Privacy", "Democrat"],
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
    readTime: "6 min read",
    tags: ["FEC", "Campaign Finance", "PACs"],
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
    readTime: "10 min read",
    tags: ["EPA", "Climate", "Republican"],
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
    readTime: "5 min read",
    tags: ["Speaker Johnson", "Budget", "Bipartisan"],
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
    readTime: "7 min read",
    tags: ["Gerrymandering", "SCOTUS", "Voting Rights"],
    citations: [
      { source: "SCOTUS Opinion", url: "#" },
      { source: "Redistricting Data Hub", url: "#" },
      { source: "AP News", url: "#" },
    ],
    verifications: 445,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <HeroArticle />

      <main className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* News Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-xl font-bold tracking-wide">
                Latest Stories
              </h2>
              <div className="h-px flex-1 bg-border ml-6" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {articles.map((article, i) => (
                <NewsCard key={i} {...article} index={i} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <TrendingSidebar />

              {/* Newsletter CTA */}
              <div className="mt-10 bg-primary text-primary-foreground p-6 rounded-sm">
                <h3 className="font-display text-lg font-bold">Stay Accountable</h3>
                <p className="font-body text-xs mt-2 text-primary-foreground/60 leading-relaxed">
                  Get the day's most verified political stories delivered to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full mt-4 px-3 py-2 text-sm rounded-sm bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-1 focus:ring-accent font-body"
                />
                <button className="w-full mt-3 bg-accent text-accent-foreground font-body text-xs font-semibold py-2 rounded-sm hover:opacity-90 transition-opacity uppercase tracking-wider">
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
