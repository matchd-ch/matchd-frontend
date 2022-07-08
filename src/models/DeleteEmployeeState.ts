import { MatchdApiError } from "@/models/MatchdApiError";

export interface DeleteEmployeeState {
  success: boolean;
  errors: MatchdApiError | null;
}
