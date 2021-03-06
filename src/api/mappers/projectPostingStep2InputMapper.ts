import { ProjectPostingSpecificDataInput } from "@/api/models/types";
import { ProjectPostingStep2Form } from "@/models/ProjectPostingStep2Form";

export function projectPostingStep2InputMapper(
  id: string | undefined,
  projectPostingForm: ProjectPostingStep2Form
): ProjectPostingSpecificDataInput {
  return {
    id: id || null,
    website: projectPostingForm.website || null,
    projectFromDate: `${projectPostingForm.projectFromDateMonth}.${projectPostingForm.projectFromDateYear}`,
  };
}
