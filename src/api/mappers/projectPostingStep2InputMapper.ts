import { IProjectPostingInputStep2 } from "@/api/models/types";
import { ProjectPostingStep2Form } from "@/models/ProjectPostingStep2Form";

export function projectPostingStep2InputMapper(
  id: string | undefined,
  projectPostingForm: ProjectPostingStep2Form
): IProjectPostingInputStep2 {
  return {
    id: id || null,
    website: projectPostingForm.website || null,
    projectFromDate: `${projectPostingForm.projectFromDateMonth}.${projectPostingForm.projectFromDateYear}`,
  };
}
