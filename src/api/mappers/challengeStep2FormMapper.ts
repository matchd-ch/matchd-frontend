import type { ChallengeStep2Form } from "@/models/ChallengeStep2Form";
import { DateTime } from "luxon";
import type { ChallengeChallengeFragment } from "../queries/challengeFragment.generated";

export function challengeStep2FormMapper(
  challenge: ChallengeChallengeFragment | null,
): ChallengeStep2Form {
  return {
    website: challenge?.website || "",
    challengeFromDateMonth: challenge?.challengeFromDate
      ? DateTime.fromSQL(challenge?.challengeFromDate).month.toString()
      : "",
    challengeFromDateYear: challenge?.challengeFromDate
      ? DateTime.fromSQL(challenge?.challengeFromDate).year.toString()
      : "",
  };
}
