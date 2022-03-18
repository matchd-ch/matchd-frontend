import type { ProjectPosting } from "@/api/models/types";
import { ProjectPostingStep1Form } from "@/models/ProjectPostingStep1Form";

export function projectPostingStep1FormMapper(
  projectPosting: ProjectPosting | null
): ProjectPostingStep1Form {
  return {
    title: projectPosting?.title || "",
    description: projectPosting?.description || "",
    additionalInformation: projectPosting?.additionalInformation || "",
    topicId: projectPosting?.topic?.id || "",
    projectTypeId: projectPosting?.projectType?.id || "",
    keywords: projectPosting?.keywords?.map((keyword) => keyword.id) || [],
  };
}
