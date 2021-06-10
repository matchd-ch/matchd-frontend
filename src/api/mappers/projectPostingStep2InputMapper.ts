import { IProjectPostingInputStep2 } from "@/api/models/types";
import { ProjectPostingStep2Form } from "@/models/ProjectPostingStep2Form";

export function projectPostingStep2InputMapper(
  id: string,
  projectPostingForm: ProjectPostingStep2Form
): IProjectPostingInputStep2 {
  return {
    id,
    state: projectPostingForm.state,
    employee: {
      id: projectPostingForm.employeeId,
    },
  };
}
