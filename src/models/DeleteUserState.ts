import type { MatchdApiError } from "@/models/MatchdApiError";

export interface DeleteUserState {
  success: boolean;
  errors: MatchdApiError | null;
}
