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

export type ArticleStatus = "published" | "in-review";

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
  status: ArticleStatus;
}

export const politicianParty: Record<string, string> = {
  "Sen. Wyden": "Democrat",
  "Rep. McCarthy": "Republican",
  "Speaker Johnson": "Republican",
  "Sen. Warren": "Democrat",
  "Rep. Greene": "Republican",
  "Sen. Cruz": "Republican",
  "Rep. Ocasio-Cortez": "Democrat",
  "Sen. Sanders": "Democrat",
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
    status: "published",
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
    status: "published",
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
    status: "published",
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
    status: "in-review",
    body: "The long-anticipated infrastructure spending package has hit a wall in the House as competing factions within the majority caucus clash over funding mechanisms and spending priorities.\n\nThe dispute centers on how to pay for the $1.2 trillion package. Fiscal conservatives insist on offsetting the spending with cuts to other programs, while moderates argue that the economic growth generated by infrastructure investment will naturally increase tax revenue.\n\nA third faction is pushing to include climate-related infrastructure provisions, including funding for electric vehicle charging networks and grid modernization, which hardliners oppose as outside the scope of traditional infrastructure.\n\nThe Speaker has convened emergency meetings with faction leaders but has so far been unable to bridge the divide.",
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
    status: "in-review",
    body: "Federal and state courts have ordered redistricting map redraws in three battleground states, decisions that could fundamentally alter the competitive landscape for as many as two dozen House seats in the 2026 midterm elections.\n\nThe rulings found that legislatures in all three states drew maps that either constituted illegal racial gerrymanders or violated state constitutional requirements for fair representation.\n\nVoting rights advocates have hailed the decisions as victories for democratic representation.\n\nThe affected state legislatures have been given tight deadlines to produce new maps.",
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
  // 10 additional placeholder articles for infinite scroll
  {
    slug: "tech-antitrust-hearing",
    image: newsTech,
    category: "Policy",
    title: "Tech Giants Face New Antitrust Hearing on Market Dominance",
    excerpt: "Senate Judiciary Committee schedules hearings on proposed legislation to break up major technology platforms.",
    readTime: "6 min",
    publishedAt: "2026-02-23T10:00:00Z",
    status: "published",
    body: "The Senate Judiciary Committee has scheduled a series of hearings examining the market dominance of major technology companies. The hearings will focus on proposed legislation that would prohibit dominant platforms from preferencing their own products.\n\nSenators from both parties have expressed concern about the concentration of power in the tech sector.\n\nIndustry representatives argue the proposals would harm innovation and American competitiveness.\n\nThe hearings are expected to last through March.",
    tags: [
      { label: "Sen. Warren", type: "politician" },
      { label: "Democrat", type: "party" },
      { label: "Technology", type: "topic" },
    ],
    citations: [
      { source: "Senate Judiciary Cmte", url: "#" },
      { source: "FTC Report", url: "#" },
      { source: "WSJ", url: "#" },
    ],
    verifications: 178,
    challenges: 34,
  },
  {
    slug: "border-funding-debate",
    image: newsNature,
    category: "Policy",
    title: "Border Security Funding Package Sparks Bipartisan Tensions",
    excerpt: "A $14 billion border security proposal divides lawmakers over allocation between physical barriers and technology.",
    readTime: "9 min",
    publishedAt: "2026-02-22T13:00:00Z",
    status: "published",
    body: "A new border security funding package has reignited congressional debate over immigration policy. The $14 billion proposal includes funding for both physical barriers and surveillance technology.\n\nRepublicans are pushing for a larger share to go toward wall construction, while Democrats favor investments in processing centers and technology.\n\nThe bill must pass both chambers before the end of the fiscal quarter.\n\nImmigration advocacy groups have weighed in on both sides of the debate.",
    tags: [
      { label: "Sen. Cruz", type: "politician" },
      { label: "Republican", type: "party" },
      { label: "Immigration", type: "topic" },
    ],
    citations: [
      { source: "CBO Analysis", url: "#" },
      { source: "DHS Report", url: "#" },
      { source: "NBC News", url: "#" },
    ],
    verifications: 345,
    challenges: 198,
  },
  {
    slug: "healthcare-price-transparency",
    image: newsFinance,
    category: "Policy",
    title: "Healthcare Price Transparency Law Faces Implementation Hurdles",
    excerpt: "Hospitals struggle to comply with new federal requirements to publish negotiated rates for common procedures.",
    readTime: "7 min",
    publishedAt: "2026-02-21T09:30:00Z",
    status: "published",
    body: "A federal price transparency rule requiring hospitals to publicly disclose their negotiated rates is facing widespread compliance challenges. Only 36% of hospitals have fully complied with the mandate.\n\nPatient advocacy groups argue the law is essential for consumer choice. Hospital associations counter that the requirements are technically burdensome.\n\nThe administration has begun issuing fines for non-compliance.\n\nExperts say full transparency could fundamentally reshape the healthcare marketplace.",
    tags: [
      { label: "Healthcare", type: "topic" },
      { label: "Democrat", type: "party" },
      { label: "Sen. Sanders", type: "politician" },
    ],
    citations: [
      { source: "HHS Data", url: "#" },
      { source: "KFF Study", url: "#" },
      { source: "AHA Response", url: "#" },
    ],
    verifications: 523,
    challenges: 89,
  },
  {
    slug: "military-aid-vote",
    image: newsSports,
    category: "Foreign Affairs",
    title: "Military Aid Package Faces Narrow Vote in Divided House",
    excerpt: "A $60 billion foreign military assistance bill tests party unity as isolationist and interventionist wings clash.",
    readTime: "8 min",
    publishedAt: "2026-02-20T14:00:00Z",
    status: "published",
    body: "The House is set to vote on a $60 billion military aid package amid sharp internal divisions. The bill has exposed a rift between traditional defense hawks and a growing isolationist wing.\n\nLeadership is working to secure enough votes by offering amendments on oversight provisions.\n\nThe Senate has already passed a similar measure with bipartisan support.\n\nForeign policy experts warn that failure to pass the aid could have significant geopolitical consequences.",
    tags: [
      { label: "Speaker Johnson", type: "politician" },
      { label: "Republican", type: "party" },
      { label: "Defense", type: "topic" },
    ],
    citations: [
      { source: "DoD Brief", url: "#" },
      { source: "Congressional Record", url: "#" },
      { source: "Foreign Affairs", url: "#" },
    ],
    verifications: 267,
    challenges: 156,
  },
  {
    slug: "student-loan-ruling",
    image: newsCulture,
    category: "Courts",
    title: "Federal Court Blocks Latest Student Loan Forgiveness Plan",
    excerpt: "A federal judge issues an injunction halting the administration's revised student debt relief program affecting 8 million borrowers.",
    readTime: "6 min",
    publishedAt: "2026-02-19T11:00:00Z",
    status: "published",
    body: "A federal district court has blocked the administration's latest attempt at broad student loan forgiveness. The ruling affects approximately 8 million borrowers who were expected to receive relief.\n\nThe judge found the plan exceeded the administration's statutory authority under the Higher Education Act.\n\nThe administration has vowed to appeal the decision.\n\nBorrower advocacy groups are urging Congress to pass standalone legislation.",
    tags: [
      { label: "Education", type: "topic" },
      { label: "Democrat", type: "party" },
      { label: "SCOTUS", type: "topic" },
    ],
    citations: [
      { source: "Court Opinion", url: "#" },
      { source: "Dept of Education", url: "#" },
      { source: "NPR", url: "#" },
    ],
    verifications: 678,
    challenges: 234,
  },
  {
    slug: "social-media-youth-bill",
    image: newsTech,
    category: "Policy",
    title: "Bipartisan Bill Would Ban Social Media for Children Under 14",
    excerpt: "Senators introduce legislation requiring age verification and parental consent for minors on social platforms.",
    readTime: "5 min",
    publishedAt: "2026-02-18T08:00:00Z",
    status: "in-review",
    body: "A bipartisan group of senators has introduced legislation that would effectively ban children under 14 from using social media platforms. The bill requires platforms to implement age verification systems.\n\nSupporters cite growing evidence of social media's negative impact on youth mental health.\n\nTech industry groups argue the bill raises First Amendment concerns and is technically unworkable.\n\nChild safety advocates have largely endorsed the measure.",
    tags: [
      { label: "Technology", type: "topic" },
      { label: "Bipartisan", type: "topic" },
      { label: "Rep. Greene", type: "politician" },
    ],
    citations: [
      { source: "Senate Bill Text", url: "#" },
      { source: "Surgeon General Report", url: "#" },
      { source: "ACLU Analysis", url: "#" },
    ],
    verifications: 412,
    challenges: 178,
  },
  {
    slug: "energy-grid-modernization",
    image: newsNature,
    category: "Infrastructure",
    title: "Energy Grid Modernization Plan Receives $20B Federal Commitment",
    excerpt: "DOE announces largest-ever investment in grid infrastructure to support renewable energy integration.",
    readTime: "7 min",
    publishedAt: "2026-02-17T10:30:00Z",
    status: "published",
    body: "The Department of Energy has announced a $20 billion commitment to modernize the nation's electrical grid. The investment will focus on high-voltage transmission lines and smart grid technology.\n\nEnergy analysts say the investment is necessary to support the transition to renewable energy sources.\n\nSome lawmakers have criticized the spending as wasteful.\n\nThe plan is expected to create an estimated 150,000 jobs over the next decade.",
    tags: [
      { label: "EPA", type: "topic" },
      { label: "Democrat", type: "party" },
      { label: "Infrastructure", type: "topic" },
    ],
    citations: [
      { source: "DOE Announcement", url: "#" },
      { source: "EIA Data", url: "#" },
      { source: "Bloomberg", url: "#" },
    ],
    verifications: 389,
    challenges: 67,
  },
  {
    slug: "police-reform-stalls",
    image: newsCulture,
    category: "Policy",
    title: "Police Reform Bill Stalls in Senate After Procedural Vote Fails",
    excerpt: "Bipartisan negotiations collapse as key provisions on qualified immunity prove insurmountable.",
    readTime: "8 min",
    publishedAt: "2026-02-16T15:00:00Z",
    status: "published",
    body: "A police reform bill that had shown bipartisan promise has stalled in the Senate after failing a procedural vote. The collapse came over disagreements about qualified immunity provisions.\n\nCivil rights organizations expressed disappointment at the failure.\n\nLaw enforcement groups had lobbied against the qualified immunity changes.\n\nNegotiators say they will attempt to revive talks in the coming weeks.",
    tags: [
      { label: "Rep. Ocasio-Cortez", type: "politician" },
      { label: "Democrat", type: "party" },
      { label: "Criminal Justice", type: "topic" },
    ],
    citations: [
      { source: "Senate Roll Call", url: "#" },
      { source: "NAACP Statement", url: "#" },
      { source: "Politico", url: "#" },
    ],
    verifications: 534,
    challenges: 123,
  },
  {
    slug: "trade-agreement-tensions",
    image: newsFinance,
    category: "Foreign Affairs",
    title: "New Trade Agreement Faces Pushback from Manufacturing States",
    excerpt: "Proposed Pacific trade deal draws opposition from senators representing states with large manufacturing sectors.",
    readTime: "6 min",
    publishedAt: "2026-02-15T12:00:00Z",
    status: "published",
    body: "A proposed trade agreement with Pacific Rim nations is facing growing opposition from senators in manufacturing-heavy states. Critics argue the deal would accelerate outsourcing.\n\nThe administration says the agreement would open new markets for American exports.\n\nLabor unions have come out strongly against the deal.\n\nA final vote is expected before the end of the session.",
    tags: [
      { label: "Sen. Sanders", type: "politician" },
      { label: "Democrat", type: "party" },
      { label: "Trade", type: "topic" },
    ],
    citations: [
      { source: "USTR Summary", url: "#" },
      { source: "AFL-CIO Analysis", url: "#" },
      { source: "Reuters", url: "#" },
    ],
    verifications: 298,
    challenges: 201,
  },
  {
    slug: "veterans-healthcare-expansion",
    image: newsSports,
    category: "Policy",
    title: "Veterans Healthcare Expansion Act Clears Committee with Rare Unity",
    excerpt: "A bipartisan committee vote advances legislation to expand mental health services and telehealth access for veterans.",
    readTime: "5 min",
    publishedAt: "2026-02-14T09:00:00Z",
    status: "published",
    body: "The Senate Veterans Affairs Committee has unanimously advanced legislation to expand healthcare access for veterans. The bill focuses on mental health services and telehealth capabilities.\n\nVeterans service organizations have praised the committee's action.\n\nThe bill would increase funding for VA mental health programs by 40%.\n\nFloor vote is expected within the month.",
    tags: [
      { label: "Healthcare", type: "topic" },
      { label: "Bipartisan", type: "topic" },
      { label: "Veterans", type: "topic" },
    ],
    citations: [
      { source: "VA Press Release", url: "#" },
      { source: "VFW Statement", url: "#" },
      { source: "Military Times", url: "#" },
    ],
    verifications: 712,
    challenges: 23,
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
