import { ChallengeState } from "@/api/models/types";

export interface ChallengeStep3Form {
  state: ChallengeState;
  employeeId?: string;
}
