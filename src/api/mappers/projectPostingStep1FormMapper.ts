import { ProjectPostingStep1Form } from "@/models/ProjectPostingStep1Form";
import type { ProjectPosting } from "api";
import { DateTime } from "luxon";

export function projectPostingStep1FormMapper(
  projectPosting: ProjectPosting | null
): ProjectPostingStep1Form {
  return {
    title: projectPosting?.title || "",
    description: projectPosting?.description || "",
    additionalInformation: projectPosting?.additionalInformation || "",
    website: projectPosting?.website || "",
    topicId: projectPosting?.topic?.id || "",
    projectTypeId: projectPosting?.projectType?.id || "",
    keywords: projectPosting?.keywords?.map((keyword) => keyword.id) || [],
    projectFromDateMonth: projectPosting?.projectFromDate
      ? DateTime.fromSQL(projectPosting?.projectFromDate).month.toString()
      : "",
    projectFromDateYear: projectPosting?.projectFromDate
      ? DateTime.fromSQL(projectPosting?.projectFromDate).year.toString()
      : "",
  };
}
