import type { Employee, ProjectPosting } from "@/api/models/types";
import { ProjectPostingState } from "@/api/models/types";
import { ProjectPostingStep3Form } from "@/models/ProjectPostingStep3Form";

export function projectPostingStep3FormMapper(
  projectPosting: ProjectPosting,
  employee?: Employee | null | undefined
): ProjectPostingStep3Form {
  return {
    employeeId: projectPosting.employee?.id || employee?.id,
    state: projectPosting.state || ProjectPostingState.Public,
  };
}
