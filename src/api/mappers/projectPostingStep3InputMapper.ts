import type { ProjectPostingAllocationInput } from "@/api/models/types";
import { ProjectPostingStep3Form } from "@/models/ProjectPostingStep3Form";

export function projectPostingStep3InputMapper(
  id: string,
  projectPostingForm: ProjectPostingStep3Form
): ProjectPostingAllocationInput {
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
