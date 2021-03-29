import { MatchdApiError } from "@/models/MatchdApiError";

export interface LoginState {
  success: boolean;
  errors: MatchdApiError | null;
}
