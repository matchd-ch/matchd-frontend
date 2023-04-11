import type { ChallengeStep1Form } from "@/models/ChallengeStep1Form";
import type { ChallengeChallengeFragment } from "../queries/challengeFragment.generated";

export function challengeStep1FormMapper(
  challenge: ChallengeChallengeFragment | null
): ChallengeStep1Form {
  return {
    title: challenge?.title || "",
    description: challenge?.description || "",
    challengeTypeId: challenge?.challengeType?.id || "",
    keywords: challenge?.keywords?.map((keyword) => keyword.id) || [],
    compensation: challenge?.compensation || "",
    teamSize: challenge?.teamSize || 1,
  };
}
