import { MatchdApiError } from "@/models/MatchdApiError";

export interface AddEmployeeState {
  success: boolean;
  errors: MatchdApiError | null;
}
