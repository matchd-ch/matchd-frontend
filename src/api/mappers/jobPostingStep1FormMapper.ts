import { JobPostingStep1Form } from "@/models/JobPostingStep1Form";
import { DateTime } from "luxon";
import { JobPostingJobPostingFragment } from "../queries/jobPostingFragment.generated";

export function jobPostingStep1FormMapper(
  jobPosting: JobPostingJobPostingFragment | null
): JobPostingStep1Form {
  return {
    title: jobPosting?.title ?? "",
    description: jobPosting?.description ?? "",
    url: jobPosting?.url ?? "",
    workload: String(jobPosting?.workload ?? 100),
    jobTypeId: jobPosting?.jobType?.id ?? "",
    branches: jobPosting?.branches?.map((branch) => branch.id) ?? [],
    jobFromDateMonth: jobPosting?.jobFromDate
      ? DateTime.fromSQL(jobPosting.jobFromDate).month.toString()
      : "",
    jobFromDateYear: jobPosting?.jobFromDate
      ? DateTime.fromSQL(jobPosting.jobFromDate).year.toString()
      : "",
    jobToDateOpenEnd: jobPosting?.jobToDate ? "true" : "false",
    jobToDateMonth: jobPosting?.jobToDate
      ? DateTime.fromSQL(jobPosting.jobToDate).month.toString()
      : "",
    jobToDateYear: jobPosting?.jobToDate
      ? DateTime.fromSQL(jobPosting.jobToDate).year.toString()
      : "",
  };
}
