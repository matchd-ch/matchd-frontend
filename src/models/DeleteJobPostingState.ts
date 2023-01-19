import { MatchdApiError } from "@/models/MatchdApiError";

export interface DeleteJobPostingState {
  success: boolean;
  errors: MatchdApiError | null;
}
