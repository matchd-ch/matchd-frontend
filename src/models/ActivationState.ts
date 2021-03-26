import { MatchdApiError } from "@/models/MatchdApiError";

export interface ActivationState {
  success: boolean;
  errors: MatchdApiError | null;
}
