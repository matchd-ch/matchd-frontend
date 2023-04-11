import type { MatchdApiError } from "@/models/MatchdApiError";

export interface SendPasswordResetEmailState {
  success: boolean;
  errors: MatchdApiError | null;
}
