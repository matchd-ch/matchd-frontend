import { MatchdApiError } from "@/models/MatchdApiError";

export interface JobPostingState {
  success: boolean;
  errors: MatchdApiError | null;
  id: string;
  slug: string;
}
