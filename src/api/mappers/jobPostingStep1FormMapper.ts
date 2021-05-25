import { JobPostingStep1Form } from "@/models/JobPostingStep1Form";
import type { JobPosting } from "api";
import { DateTime } from "luxon";

export function jobPostingStep1FormMapper(jobPosting: JobPosting | null): JobPostingStep1Form {
  return {
    title: jobPosting?.title || "",
    description: jobPosting?.description || "",
    url: jobPosting?.url || "",
    workload: String(jobPosting?.workload || 100),
    jobTypeId: jobPosting?.jobType?.id || "",
    branches: jobPosting?.branches?.map((branch) => branch.id) || [],
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
