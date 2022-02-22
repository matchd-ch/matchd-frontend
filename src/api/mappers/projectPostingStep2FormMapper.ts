import type { ProjectPosting } from "@/api/models/types";
import { ProjectPostingStep2Form } from "@/models/ProjectPostingStep2Form";
import { DateTime } from "luxon";

export function projectPostingStep2FormMapper(
  projectPosting: ProjectPosting | null
): ProjectPostingStep2Form {
  return {
    website: projectPosting?.website || "",
    projectFromDateMonth: projectPosting?.projectFromDate
      ? DateTime.fromSQL(projectPosting?.projectFromDate).month.toString()
      : "",
    projectFromDateYear: projectPosting?.projectFromDate
      ? DateTime.fromSQL(projectPosting?.projectFromDate).year.toString()
      : "",
  };
}
