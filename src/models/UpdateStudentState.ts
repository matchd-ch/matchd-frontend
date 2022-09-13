import { MatchdApiError } from "@/models/MatchdApiError";

export interface UpdateStudentState {
  success: boolean;
  errors: MatchdApiError | null;
}
