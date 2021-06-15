import { MatchdApiError } from "@/models/MatchdApiError";

export interface ProjectPostingState {
  success: boolean;
  errors: MatchdApiError | null;
  id: string;
  slug: string;
}
