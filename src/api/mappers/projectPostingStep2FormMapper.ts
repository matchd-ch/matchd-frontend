import { ProjectPostingState } from "@/api/models/types";
import { ProjectPostingStep2Form } from "@/models/ProjectPostingStep2Form";
import type { Employee, ProjectPosting } from "api";

export function projectPostingStep2FormMapper(
  projectPosting: ProjectPosting,
  employee?: Employee | null | undefined
): ProjectPostingStep2Form {
  return {
    employeeId: projectPosting.employee?.id || employee?.id,
    state: projectPosting.state || ProjectPostingState.Public,
  };
}
