import { ProjectPostingState } from "@/api/models/types";

export interface ProjectPostingStep3Form {
  state: ProjectPostingState;
  employeeId?: string;
}
