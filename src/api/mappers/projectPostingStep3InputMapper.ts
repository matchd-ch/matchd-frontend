import { ProjectPostingStep3Form } from "@/models/ProjectPostingStep3Form";
import type { ProjectPostingInputAllocation } from "api";

export function projectPostingStep3InputMapper(
  id: string,
  projectPostingForm: ProjectPostingStep3Form
): ProjectPostingInputAllocation {
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
