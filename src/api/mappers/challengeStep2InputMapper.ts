import { ChallengeSpecificDataInput } from "@/api/models/types";
import { ChallengeStep2Form } from "@/models/ChallengeStep2Form";

export function challengeStep2InputMapper(
  id: string | undefined,
  challenge: ChallengeStep2Form
): ChallengeSpecificDataInput {
  return {
    id: id || null,
    website: challenge.website || null,
    challengeFromDate: `${challenge.challengeFromDateMonth}.${challenge.challengeFromDateYear}`,
  };
}
