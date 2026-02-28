import newsTech from "@/assets/news-tech.jpg";
import newsFinance from "@/assets/news-finance.jpg";
import newsNature from "@/assets/news-nature.jpg";
import newsSports from "@/assets/news-sports.jpg";
import newsCulture from "@/assets/news-culture.jpg";

export interface Tag {
  label: string;
  type: "politician" | "party" | "topic";
}

export interface Citation {
  source: string;
  url: string;
}

export interface Article {
  slug: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  body: string;
  tags: Tag[];
  citations: Citation[];
  verifications: number;
  challenges: number;
  publishedAt: string;
}

export const politicianParty: Record<string, string> = {
  "Sen. Wyden": "Democrat",
  "Rep. McCarthy": "Republican",
  "Speaker Johnson": "Republican",
};

export const partyColors: Record<string, { bg: string; text: string; border: string }> = {
  Democrat: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/30" },
  Republican: { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", border: "border-red-500/30" },
};

export const articles: Article[] = [
  {
    slug: "surveillance-reform-bill",
    image: newsTech,
    category: "Policy",
    title: "Surveillance Reform Bill Faces Crucial Senate Vote This Week",
    excerpt: "Bipartisan legislation to overhaul FISA Section 702 reaches the Senate floor amid heated debate over civil liberties and national security.",
    readTime: "8 min",
    publishedAt: "2026-02-28T09:00:00Z",
    body: "The Senate is poised to vote on landmark legislation that would fundamentally reshape how intelligence agencies conduct domestic surveillance. The bill, which has garnered rare bipartisan support, would require warrants for queries of Americans' communications collected under Section 702 of the Foreign Intelligence Surveillance Act.\n\nSupporters argue the reforms are long overdue, pointing to documented abuses by the FBI in querying the database for information about U.S. citizens without judicial oversight. Civil liberties organizations have rallied behind the measure, calling it the most significant privacy reform in a generation.\n\nOpponents, including senior intelligence officials, warn that adding warrant requirements could create dangerous gaps in the nation's ability to detect and prevent terrorist attacks and cyber intrusions. They argue the existing system already contains adequate safeguards.\n\nThe vote comes amid broader public debate about the balance between national security and individual privacy in the digital age.",
    tags: [
      { label: "Sen. Wyden", type: "politician" },
      { label: "Democrat", type: "party" },
      { label: "Privacy", type: "topic" },
    ],
    citations: [
      { source: "Congressional Record", url: "#" },
      { source: "ACLU Brief", url: "#" },
      { source: "DOJ Statement", url: "#" },
    ],
    verifications: 234,
    challenges: 28,
  },
  {
    slug: "dark-money-groups",
    image: newsFinance,
    category: "Elections",
    title: "Dark Money Groups Outspend Candidates 3-to-1 in Key Races",
    excerpt: "FEC filings reveal unprecedented outside spending in competitive districts, raising questions about campaign finance enforcement.",
    readTime: "6 min",
    publishedAt: "2026-02-27T14:30:00Z",
    body: "New Federal Election Commission filings reveal that outside spending groups have outpaced candidate committees by a ratio of three to one in the most competitive congressional races this cycle. The surge in dark money — political spending by nonprofit organizations that are not required to disclose their donors — has reached unprecedented levels.\n\nThe data shows that in fifteen key House races, outside groups have collectively spent over $450 million, dwarfing the $150 million raised by candidates themselves. Much of this spending comes from 501(c)(4) organizations that can accept unlimited donations without revealing contributor identities.\n\nCampaign finance reformers argue the trend undermines democratic accountability, as voters cannot know who is funding the messages that saturate their airwaves. Industry groups counter that the spending represents constitutionally protected speech.\n\nThe FEC, which is frequently deadlocked along partisan lines, has taken no enforcement action on dark money complaints in over two years.",
    tags: [
      { label: "FEC", type: "topic" },
      { label: "Republican", type: "party" },
      { label: "Campaign Finance", type: "topic" },
    ],
    citations: [
      { source: "FEC Filing Data", url: "#" },
      { source: "OpenSecrets", url: "#" },
      { source: "Brennan Center", url: "#" },
    ],
    verifications: 189,
    challenges: 67,
  },
  {
    slug: "climate-executive-order",
    image: newsNature,
    category: "White House",
    title: "Executive Order on Climate Faces Legal Challenge from 18 States",
    excerpt: "A coalition of state attorneys general files suit arguing the administration overstepped its authority on emissions regulations.",
    readTime: "10 min",
    publishedAt: "2026-02-26T11:00:00Z",
    body: "Eighteen state attorneys general have filed a joint lawsuit challenging the administration's sweeping executive order on climate change, arguing that the president exceeded constitutional authority by imposing emissions reduction targets on states without congressional approval.\n\nThe executive order, signed last month, directs federal agencies to implement regulations that would effectively require states to reduce carbon emissions by 50% from 2005 levels by 2035. It also establishes new permitting requirements for fossil fuel projects on federal lands.\n\nThe coalition, led by attorneys general from energy-producing states, argues the order represents an unconstitutional expansion of executive power and violates the major questions doctrine recently affirmed by the Supreme Court.\n\nEnvironmental groups have intervened in the case to defend the order, arguing that the Clean Air Act provides sufficient statutory authority for the regulations. The case is expected to reach the Supreme Court regardless of the lower court outcome.",
    tags: [
      { label: "EPA", type: "topic" },
      { label: "Republican", type: "party" },
      { label: "Rep. McCarthy", type: "politician" },
    ],
    citations: [
      { source: "Court Filing", url: "#" },
      { source: "EPA.gov", url: "#" },
      { source: "State AG Coalition", url: "#" },
      { source: "Reuters", url: "#" },
    ],
    verifications: 567,
    challenges: 234,
  },
  {
    slug: "infrastructure-package-stalls",
    image: newsSports,
    category: "Congress",
    title: "Infrastructure Package Stalls as Factions Clash Over Funding",
    excerpt: "House leadership scrambles to bridge divides within the caucus as the deadline for a continuing resolution approaches.",
    readTime: "5 min",
    publishedAt: "2026-02-25T16:45:00Z",
    body: "The long-anticipated infrastructure spending package has hit a wall in the House as competing factions within the majority caucus clash over funding mechanisms and spending priorities. With a government shutdown deadline looming in two weeks, leadership is scrambling to find a compromise that can secure enough votes for passage.\n\nThe dispute centers on how to pay for the $1.2 trillion package. Fiscal conservatives insist on offsetting the spending with cuts to other programs, while moderates argue that the economic growth generated by infrastructure investment will naturally increase tax revenue.\n\nA third faction is pushing to include climate-related infrastructure provisions, including funding for electric vehicle charging networks and grid modernization, which hardliners oppose as outside the scope of traditional infrastructure.\n\nThe Speaker has convened emergency meetings with faction leaders but has so far been unable to bridge the divide. A continuing resolution to avoid a shutdown may be necessary if the impasse continues.",
    tags: [
      { label: "Speaker Johnson", type: "politician" },
      { label: "Budget", type: "topic" },
      { label: "Bipartisan", type: "topic" },
    ],
    citations: [
      { source: "CBO Score", url: "#" },
      { source: "House Rules Cmte", url: "#" },
      { source: "Politico", url: "#" },
    ],
    verifications: 312,
    challenges: 45,
  },
  {
    slug: "redistricting-battles",
    image: newsCulture,
    category: "State & Local",
    title: "Redistricting Battles Intensify Ahead of 2026 Cycle",
    excerpt: "Court-ordered map redraws in three states could reshape the competitive landscape for dozens of House seats.",
    readTime: "7 min",
    publishedAt: "2026-02-24T08:15:00Z",
    body: "Federal and state courts have ordered redistricting map redraws in three battleground states, decisions that could fundamentally alter the competitive landscape for as many as two dozen House seats in the 2026 midterm elections.\n\nThe rulings, handed down over the past month in separate cases, found that legislatures in all three states drew maps that either constituted illegal racial gerrymanders or violated state constitutional requirements for fair representation.\n\nVoting rights advocates have hailed the decisions as victories for democratic representation, noting that the invalidated maps were drawn to virtually guarantee supermajority control for the party in power despite relatively even partisan splits in the states' overall populations.\n\nThe affected state legislatures have been given tight deadlines to produce new maps, with courts retaining the authority to impose their own maps if the new submissions fail to meet legal standards. Appeals to the Supreme Court are expected but may not be resolved before the 2026 primary season begins.",
    tags: [
      { label: "SCOTUS", type: "topic" },
      { label: "Democrat", type: "party" },
      { label: "Voting Rights", type: "topic" },
    ],
    citations: [
      { source: "SCOTUS Opinion", url: "#" },
      { source: "Redistricting Data Hub", url: "#" },
      { source: "AP News", url: "#" },
    ],
    verifications: 445,
    challenges: 312,
  },
];

export const trendingArticles = [
  { title: "Ethics Committee Opens Investigation Into PAC Funding", category: "Congress", verifications: 891, challenges: 45, publishedAt: "2026-02-28T07:00:00Z" },
  { title: "State Legislatures Push Back on Federal Mandate", category: "State & Local", verifications: 654, challenges: 123, publishedAt: "2026-02-27T12:00:00Z" },
  { title: "New Polling Data Reshapes Midterm Predictions", category: "Elections", verifications: 523, challenges: 234, publishedAt: "2026-02-26T15:00:00Z" },
  { title: "Defense Budget Amendments Spark Floor Debate", category: "Policy", verifications: 412, challenges: 89, publishedAt: "2026-02-25T10:00:00Z" },
  { title: "Former Officials Testify on Regulatory Overreach", category: "White House", verifications: 387, challenges: 356, publishedAt: "2026-02-24T14:00:00Z" },
];

export const getUniqueTags = () => {
  return articles.flatMap((a) => a.tags).reduce((acc, tag) => {
    if (!acc.find((t) => t.label === tag.label)) acc.push(tag);
    return acc;
  }, [] as Tag[]);
};
