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
    category: "Technology",
    title: "The Race to Build Quantum-Resistant Encryption Before It's Too Late",
    excerpt: "As quantum computing advances accelerate, cryptographers are in a sprint to develop new security standards that can withstand attacks from future machines.",
    author: "Marcus Webb",
    readTime: "8 min read",
  },
  {
    image: newsFinance,
    category: "Business",
    title: "Markets React to Sweeping Trade Policy Overhaul",
    excerpt: "Global financial markets experienced sharp volatility as new tariff structures reshape international commerce relationships.",
    author: "Elena Vasquez",
    readTime: "6 min read",
  },
  {
    image: newsNature,
    category: "Science",
    title: "Remote Valleys Reveal New Species Untouched by Modern World",
    excerpt: "A scientific expedition into uncharted mountain regions has uncovered dozens of previously unknown plant and animal species.",
    author: "Dr. James Okafor",
    readTime: "10 min read",
  },
  {
    image: newsSports,
    category: "Sports",
    title: "Stadium Revolution: How Smart Arenas Are Changing Live Events",
    excerpt: "New generation venues are integrating AI and IoT technologies to create immersive experiences for millions of fans worldwide.",
    author: "Rika Tanaka",
    readTime: "5 min read",
  },
  {
    image: newsCulture,
    category: "Culture",
    title: "The Museum of Tomorrow: How Institutions Are Reinventing Themselves",
    excerpt: "From interactive installations to AI-curated exhibits, cultural institutions are embracing radical transformation to attract new audiences.",
    author: "Amir Patel",
    readTime: "7 min read",
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
              <h2 className="font-display text-xl font-bold tracking-wide uppercase">
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
                <h3 className="font-display text-lg font-bold">Stay Informed</h3>
                <p className="font-body text-sm mt-2 opacity-80 leading-relaxed">
                  Get the day's top stories delivered to your inbox every morning.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full mt-4 px-3 py-2 text-sm rounded-sm bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent font-display"
                />
                <button className="w-full mt-3 bg-accent text-accent-foreground font-display text-sm font-semibold py-2 rounded-sm hover:opacity-90 transition-opacity">
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
