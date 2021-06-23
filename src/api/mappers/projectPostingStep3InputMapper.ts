import { IProjectPostingInputStep3 } from "@/api/models/types";
import { ProjectPostingStep3Form } from "@/models/ProjectPostingStep3Form";

export function projectPostingStep3InputMapper(
  id: string,
  projectPostingForm: ProjectPostingStep3Form
): IProjectPostingInputStep3 {
  return {
    id,
    state: projectPostingForm.state,
    ...(projectPostingForm.employeeId && {
      employee: {
        id: projectPostingForm.employeeId,
      },
    }),
  };
}
