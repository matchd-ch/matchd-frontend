import type { MatchdApiError } from "@/models/MatchdApiError";

export interface DeleteChallengeState {
  success: boolean;
  errors: MatchdApiError | null;
}
