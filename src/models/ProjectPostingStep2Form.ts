import { ProjectPostingState } from "@/api/models/types";

export interface ProjectPostingStep2Form {
  state: ProjectPostingState;
  employeeId?: string;
}
