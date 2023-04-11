import type { ChallengeMatchingFilters } from "@/models/ChallengeMatchingFilters";
import type { MatchingInput } from "@/models/MatchingInput";

export function challengeMatchingInputMapper(filters: ChallengeMatchingFilters): MatchingInput {
  return {
    challengeMatchingInput: {
      challenge: {
        id: filters.challengeId,
      },
    },
    first: filters.first,
    skip: filters.skip,
    softBoost: filters.softBoost,
    techBoost: filters.techBoost,
  };
}
