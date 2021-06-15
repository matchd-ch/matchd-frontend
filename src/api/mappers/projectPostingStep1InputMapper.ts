import { IProjectPostingInputStep1 } from "@/api/models/types";
import { ProjectPostingStep1Form } from "@/models/ProjectPostingStep1Form";

export function projectPostingStep1InputMapper(
  id: string | undefined,
  projectPostingForm: ProjectPostingStep1Form
): IProjectPostingInputStep1 {
  return {
    id: id || null,
    title: projectPostingForm.title,
    description: projectPostingForm.description,
    additionalInformation: projectPostingForm.additionalInformation || null,
    projectType: {
      id: projectPostingForm.projectTypeId,
    },
    topic: {
      id: projectPostingForm.topicId,
    },
    keywords: projectPostingForm.keywords.map((keywordId) => {
      return {
        id: keywordId,
      };
    }),
  };
}
