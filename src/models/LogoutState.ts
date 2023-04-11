import type { MatchdApiError } from "@/models/MatchdApiError";

export interface LogoutState {
  success: boolean;
  errors: MatchdApiError | null;
}
