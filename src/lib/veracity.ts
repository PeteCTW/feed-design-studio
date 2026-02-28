export type VeracityLevel = "trusted" | "largely-trusted" | "mixed" | "largely-contested" | "contested" | "none";

export interface VeracityRating {
  label: string;
  level: VeracityLevel;
  ratio: number;
  verifyColor: string;
  challengeColor: string;
}

export const getVeracityRating = (verifications: number, challenges: number): VeracityRating => {
  const total = verifications + challenges;
  if (total === 0) return { label: "No interactions", level: "none", ratio: 0, verifyColor: "bg-muted-foreground", challengeColor: "bg-muted-foreground" };

  const ratio = verifications / total;

  if (ratio >= 0.8) return { label: "Trusted", level: "trusted", ratio, verifyColor: "bg-green-500", challengeColor: "bg-amber-500" };
  if (ratio >= 0.6) return { label: "Largely Trusted", level: "largely-trusted", ratio, verifyColor: "bg-green-400", challengeColor: "bg-amber-500" };
  if (ratio >= 0.4) return { label: "Mixed", level: "mixed", ratio, verifyColor: "bg-yellow-500", challengeColor: "bg-orange-500" };
  if (ratio >= 0.2) return { label: "Largely Contested", level: "largely-contested", ratio, verifyColor: "bg-orange-400", challengeColor: "bg-red-500" };
  return { label: "Contested", level: "contested", ratio, verifyColor: "bg-red-400", challengeColor: "bg-red-600" };
};

export const allRatingLevels: { level: VeracityLevel; label: string }[] = [
  { level: "trusted", label: "Trusted" },
  { level: "largely-trusted", label: "Largely Trusted" },
  { level: "mixed", label: "Mixed" },
  { level: "largely-contested", label: "Largely Contested" },
  { level: "contested", label: "Contested" },
];

export const getMockAISummary = (verifications: number, challenges: number): string => {
  const rating = getVeracityRating(verifications, challenges);
  const total = verifications + challenges;

  switch (rating.level) {
    case "trusted":
      return `Based on ${total} community interactions, this article has strong consensus. ${verifications} users have independently verified the claims against cited sources. The community expresses high confidence in the reported facts and sourcing quality.`;
    case "largely-trusted":
      return `With ${total} interactions, the community largely supports this article's accuracy. While ${challenges} users have raised questions, the majority (${verifications}) have verified the claims. Some commenters note areas where additional sourcing could strengthen the reporting.`;
    case "mixed":
      return `Community opinion is divided on this article with ${total} total interactions. ${verifications} users verify the claims while ${challenges} have challenged aspects. Feedback suggests the core facts are sound but interpretation and framing are debated.`;
    case "largely-contested":
      return `This article faces significant scrutiny from the community. Of ${total} interactions, ${challenges} users have challenged the reporting. Common concerns include sourcing methodology and potential framing bias. Consider cross-referencing with additional sources.`;
    case "contested":
      return `The community has largely contested this article. With ${challenges} challenges versus ${verifications} verifications, readers express concerns about accuracy. Multiple commenters flag potential issues with source interpretation and factual claims.`;
    default:
      return "No community feedback available yet. Be the first to verify or challenge this article.";
  }
};
