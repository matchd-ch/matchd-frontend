import type { ChallengeAllocationInput } from "@/api/models/types";
import type { ChallengeStep3Form } from "@/models/ChallengeStep3Form";

export function challengeStep3InputMapper(
  id: string,
  challengeForm: ChallengeStep3Form
): ChallengeAllocationInput {
  return {
    id,
    state: challengeForm.state,
    ...(challengeForm.employeeId && {
      employee: {
        id: challengeForm.employeeId,
      },
    }),
  };
}
