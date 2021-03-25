import { MatchdApiError } from "@/models/MatchdApiError";

export interface StudentRegistrationState {
  success: boolean;
  errors: MatchdApiError | null;
}
