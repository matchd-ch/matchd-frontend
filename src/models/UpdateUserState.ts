import type { MatchdApiError } from "@/models/MatchdApiError";

export interface UpdateUserState {
  success: boolean;
  errors: MatchdApiError | null;
}
