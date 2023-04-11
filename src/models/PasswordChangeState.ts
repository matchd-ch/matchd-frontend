import type { MatchdApiError } from "@/models/MatchdApiError";

export interface PasswordChangeState {
  success: boolean;
  errors: MatchdApiError | null;
}
