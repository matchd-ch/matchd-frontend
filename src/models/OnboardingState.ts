import { MatchdApiError } from "@/models/MatchdApiError";

export interface OnboardingState {
  success: boolean;
  errors: MatchdApiError | null;
}
