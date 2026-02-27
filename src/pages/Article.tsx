import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, ExternalLink, User, Flag, Hash, CheckCircle2, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import newsTech from "@/assets/news-tech.jpg";
import newsFinance from "@/assets/news-finance.jpg";
import newsNature from "@/assets/news-nature.jpg";
import newsSports from "@/assets/news-sports.jpg";
import newsCulture from "@/assets/news-culture.jpg";

const articles = [
  {
    slug: "surveillance-reform-bill",
    image: newsTech,
    category: "Policy",
    title: "Surveillance Reform Bill Faces Crucial Senate Vote This Week",
    excerpt: "Bipartisan legislation to overhaul FISA Section 702 reaches the Senate floor amid heated debate over civil liberties and national security.",
    readTime: "8 min",
    body: "The Senate is poised to vote on landmark legislation that would fundamentally reshape how intelligence agencies conduct domestic surveillance. The bill, which has garnered rare bipartisan support, would require warrants for queries of Americans' communications collected under Section 702 of the Foreign Intelligence Surveillance Act.\n\nSupporters argue the reforms are long overdue, pointing to documented abuses by the FBI in querying the database for information about U.S. citizens without judicial oversight. Civil liberties organizations have rallied behind the measure, calling it the most significant privacy reform in a generation.\n\nOpponents, including senior intelligence officials, warn that adding warrant requirements could create dangerous gaps in the nation's ability to detect and prevent terrorist attacks and cyber intrusions. They argue the existing system already contains adequate safeguards.\n\nThe vote comes amid broader public debate about the balance between national security and individual privacy in the digital age.",
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
    slug: "dark-money-groups",
    image: newsFinance,
    category: "Elections",
    title: "Dark Money Groups Outspend Candidates 3-to-1 in Key Races",
    excerpt: "FEC filings reveal unprecedented outside spending in competitive districts, raising questions about campaign finance enforcement.",
    readTime: "6 min",
    body: "New Federal Election Commission filings reveal that outside spending groups have outpaced candidate committees by a ratio of three to one in the most competitive congressional races this cycle. The surge in dark money — political spending by nonprofit organizations that are not required to disclose their donors — has reached unprecedented levels.\n\nThe data shows that in fifteen key House races, outside groups have collectively spent over $450 million, dwarfing the $150 million raised by candidates themselves. Much of this spending comes from 501(c)(4) organizations that can accept unlimited donations without revealing contributor identities.\n\nCampaign finance reformers argue the trend undermines democratic accountability, as voters cannot know who is funding the messages that saturate their airwaves. Industry groups counter that the spending represents constitutionally protected speech.\n\nThe FEC, which is frequently deadlocked along partisan lines, has taken no enforcement action on dark money complaints in over two years.",
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
    slug: "climate-executive-order",
    image: newsNature,
    category: "White House",
    title: "Executive Order on Climate Faces Legal Challenge from 18 States",
    excerpt: "A coalition of state attorneys general files suit arguing the administration overstepped its authority on emissions regulations.",
    readTime: "10 min",
    body: "Eighteen state attorneys general have filed a joint lawsuit challenging the administration's sweeping executive order on climate change, arguing that the president exceeded constitutional authority by imposing emissions reduction targets on states without congressional approval.\n\nThe executive order, signed last month, directs federal agencies to implement regulations that would effectively require states to reduce carbon emissions by 50% from 2005 levels by 2035. It also establishes new permitting requirements for fossil fuel projects on federal lands.\n\nThe coalition, led by attorneys general from energy-producing states, argues the order represents an unconstitutional expansion of executive power and violates the major questions doctrine recently affirmed by the Supreme Court.\n\nEnvironmental groups have intervened in the case to defend the order, arguing that the Clean Air Act provides sufficient statutory authority for the regulations. The case is expected to reach the Supreme Court regardless of the lower court outcome.",
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
    slug: "infrastructure-package-stalls",
    image: newsSports,
    category: "Congress",
    title: "Infrastructure Package Stalls as Factions Clash Over Funding",
    excerpt: "House leadership scrambles to bridge divides within the caucus as the deadline for a continuing resolution approaches.",
    readTime: "5 min",
    body: "The long-anticipated infrastructure spending package has hit a wall in the House as competing factions within the majority caucus clash over funding mechanisms and spending priorities. With a government shutdown deadline looming in two weeks, leadership is scrambling to find a compromise that can secure enough votes for passage.\n\nThe dispute centers on how to pay for the $1.2 trillion package. Fiscal conservatives insist on offsetting the spending with cuts to other programs, while moderates argue that the economic growth generated by infrastructure investment will naturally increase tax revenue.\n\nA third faction is pushing to include climate-related infrastructure provisions, including funding for electric vehicle charging networks and grid modernization, which hardliners oppose as outside the scope of traditional infrastructure.\n\nThe Speaker has convened emergency meetings with faction leaders but has so far been unable to bridge the divide. A continuing resolution to avoid a shutdown may be necessary if the impasse continues.",
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
    slug: "redistricting-battles",
    image: newsCulture,
    category: "State & Local",
    title: "Redistricting Battles Intensify Ahead of 2026 Cycle",
    excerpt: "Court-ordered map redraws in three states could reshape the competitive landscape for dozens of House seats.",
    readTime: "7 min",
    body: "Federal and state courts have ordered redistricting map redraws in three battleground states, decisions that could fundamentally alter the competitive landscape for as many as two dozen House seats in the 2026 midterm elections.\n\nThe rulings, handed down over the past month in separate cases, found that legislatures in all three states drew maps that either constituted illegal racial gerrymanders or violated state constitutional requirements for fair representation.\n\nVoting rights advocates have hailed the decisions as victories for democratic representation, noting that the invalidated maps were drawn to virtually guarantee supermajority control for the party in power despite relatively even partisan splits in the states' overall populations.\n\nThe affected state legislatures have been given tight deadlines to produce new maps, with courts retaining the authority to impose their own maps if the new submissions fail to meet legal standards. Appeals to the Supreme Court are expected but may not be resolved before the 2026 primary season begins.",
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

const tagIcons: Record<string, typeof User> = {
  politician: User,
  party: Flag,
  topic: Hash,
};

const tagStyles: Record<string, { bg: string; text: string }> = {
  politician: { bg: "bg-accent/10 border-accent/30", text: "text-accent" },
  party: { bg: "bg-primary/10 border-primary/30", text: "text-primary" },
  topic: { bg: "bg-secondary border-border", text: "text-muted-foreground" },
};

const getVeracityLevel = (v: number) => {
  if (v >= 500) return { label: "High confidence", color: "bg-green-500", width: "w-full" };
  if (v >= 200) return { label: "Moderate", color: "bg-yellow-500", width: "w-2/3" };
  return { label: "Developing", color: "bg-muted-foreground", width: "w-1/3" };
};

const Article = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container max-w-3xl py-16 text-center">
          <h1 className="font-display text-2xl font-bold">Article not found</h1>
          <Link to="/" className="font-body text-sm text-accent hover:underline mt-4 inline-block">
            ← Back to feed
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const veracity = getVeracityLevel(article.verifications);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container max-w-3xl py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to feed
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-accent">
            {article.category}
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-bold mt-2 leading-tight">
            {article.title}
          </h1>
          <p className="font-body text-base text-muted-foreground mt-2">{article.readTime} read</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {article.tags.map((tag) => {
              const style = tagStyles[tag.type];
              const Icon = tagIcons[tag.type];
              return (
                <span
                  key={tag.label}
                  className={`inline-flex items-center gap-1 font-body text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border ${style.bg} ${style.text}`}
                >
                  <Icon className="w-2.5 h-2.5" />
                  {tag.label}
                </span>
              );
            })}
          </div>

          {/* Hero image */}
          <div className="mt-6 rounded-lg overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full aspect-[2/1] object-cover" />
          </div>

          {/* Verify / Challenge actions */}
          <VerifyActions
            initialVerifications={article.verifications}
            veracityLevel={veracity}
          />

          {/* Body */}
          <div className="mt-8 font-body text-base leading-relaxed text-foreground space-y-4">
            {article.body.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Citations */}
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="font-display text-sm font-bold mb-3">Sources & Citations</h3>
            <div className="flex flex-wrap gap-2">
              {article.citations.map((cite, i) => (
                <a
                  key={i}
                  href={cite.url}
                  className="inline-flex items-center gap-1 font-body text-xs text-muted-foreground hover:text-accent transition-colors bg-secondary/60 px-3 py-1.5 rounded-full border border-border"
                >
                  <ExternalLink className="w-3 h-3" />
                  {cite.source}
                </a>
              ))}
            </div>
          </div>
        </motion.article>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Article;
