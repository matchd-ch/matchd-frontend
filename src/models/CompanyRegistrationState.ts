import { MatchdApiError } from "@/models/MatchdApiError";

export interface CompanyRegistrationState {
  success: boolean;
  errors: MatchdApiError | null;
}
