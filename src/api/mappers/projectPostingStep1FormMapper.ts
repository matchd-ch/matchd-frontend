import { ProjectPostingStep1Form } from "@/models/ProjectPostingStep1Form";
import { ProjectPostingProjectPostingFragment } from "../queries/projectPostingFragment.generated";

export function projectPostingStep1FormMapper(
  projectPosting: ProjectPostingProjectPostingFragment | null
): ProjectPostingStep1Form {
  return {
    title: projectPosting?.title || "",
    description: projectPosting?.description || "",
    projectTypeId: projectPosting?.projectType?.id || "",
    keywords: projectPosting?.keywords?.map((keyword) => keyword.id) || [],
    compensation: projectPosting?.compensation || "",
    teamSize: projectPosting?.teamSize || 1,
  };
}
