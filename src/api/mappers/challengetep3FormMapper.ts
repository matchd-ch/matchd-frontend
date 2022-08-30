import type { Employee } from "@/api/models/types";
import { ChallengeState } from "@/api/models/types";
import { ChallengeStep3Form } from "@/models/ChallengeStep3Form";
import { ChallengeChallengeFragment } from "../queries/challengeFragment.generated";

export function challengeStep3FormMapper(
  challenge: ChallengeChallengeFragment,
  employee?: Employee | null | undefined
): ChallengeStep3Form {
  return {
    employeeId: challenge.employee?.id || employee?.id,
    state: challenge.state || ChallengeState.Public,
  };
}
