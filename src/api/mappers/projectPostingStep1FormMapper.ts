import type { ProjectPosting } from "@/api/models/types";
import { ProjectPostingStep1Form } from "@/models/ProjectPostingStep1Form";
import { ProjectPostingProjectPostingFragment } from "../queries/projectPostingFragment.generated";

export function projectPostingStep1FormMapper(
  projectPosting: ProjectPostingProjectPostingFragment | null
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
