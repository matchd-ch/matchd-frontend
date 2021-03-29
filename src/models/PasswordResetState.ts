import { MatchdApiError } from "@/models/MatchdApiError";

export interface PasswordResetState {
  success: boolean;
  errors: MatchdApiError | null;
  tokenVerificationComplete: boolean;
  tokenIsValid: boolean;
}
