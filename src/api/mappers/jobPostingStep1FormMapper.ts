import { JobPostingStep1Form } from "@/models/JobPostingStep1Form";
import type { JobPosting } from "api";
import { DateTime } from "luxon";

export function jobPostingStep1FormMapper(jobPosting: JobPosting): JobPostingStep1Form {
  return {
    title: jobPosting?.title || "",
    description: jobPosting?.description || "",
    url: jobPosting?.url || "",
    fullTime: jobPosting?.workload === 100,
    workload: String(jobPosting?.workload || 90),
    jobTypeId: jobPosting?.jobType?.id || "",
    branchId: jobPosting?.branch?.id || "",
    jobFromDateMonth: jobPosting?.jobFromDate
      ? DateTime.fromSQL(jobPosting?.jobFromDate).month.toString()
      : "",
    jobFromDateYear: jobPosting?.jobFromDate
      ? DateTime.fromSQL(jobPosting?.jobFromDate).year.toString()
      : "",
    ...(jobPosting?.jobToDate && { jobToDateOpenEnd: "true" }),
    jobToDateMonth: jobPosting?.jobToDate
      ? DateTime.fromSQL(jobPosting?.jobToDate).month.toString()
      : "",
    jobToDateYear: jobPosting?.jobToDate
      ? DateTime.fromSQL(jobPosting?.jobToDate).year.toString()
      : "",
  };
}
