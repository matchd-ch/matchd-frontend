import { JobPostingStep1Form } from "@/models/JobPostingStep1Form";
import type { JobPosting } from "api";
import { DateTime } from "luxon";

export function jobPostingStep1FormMapper(jobPosting: JobPosting): JobPostingStep1Form {
  return {
    title: jobPosting?.title || "",
    description: jobPosting?.description || "",
    url: jobPosting?.url || "",
    workload: String(jobPosting?.workload || 100),
    jobTypeId: jobPosting?.jobType?.id || "",
    branchId: jobPosting?.branch?.id || "",
    jobFromDateMonth: jobPosting?.jobFromDate
      ? DateTime.fromSQL(jobPosting?.jobFromDate).month.toString()
      : "",
    jobFromDateYear: jobPosting?.jobFromDate
      ? DateTime.fromSQL(jobPosting?.jobFromDate).year.toString()
      : "",
    jobToDateMonth: jobPosting?.jobToDate
      ? DateTime.fromSQL(jobPosting?.jobToDate).month.toString()
      : "",
    jobToDateYear: jobPosting?.jobToDate
      ? DateTime.fromSQL(jobPosting?.jobToDate).year.toString()
      : "",
  };
}
