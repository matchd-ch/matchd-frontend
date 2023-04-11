import type { MatchdApiError } from "@/models/MatchdApiError";

export interface ChallengeState {
  success: boolean;
  errors: MatchdApiError | null;
  id: string;
  slug: string;
}
