import { IJobPostingInputStep1 } from "@/api/models/types";
import { JobPostingStep1Form } from "@/models/JobPostingStep1Form";

export function jobPostingStep1InputMapper(
  id: string | undefined,
  jobPostingForm: JobPostingStep1Form
): IJobPostingInputStep1 {
  return {
    id: id || null,
    title: jobPostingForm.title,
    description: jobPostingForm.description || null,
    workload: +jobPostingForm.workload,
    url: jobPostingForm.url || null,
    jobType: {
      id: jobPostingForm.jobTypeId,
    },
    branches:
      jobPostingForm.branches?.map((branchId) => {
        return { id: branchId };
      }) || [],
    jobFromDate: `${jobPostingForm.jobFromDateMonth}.${jobPostingForm.jobFromDateYear}`,
    jobToDate:
      jobPostingForm.jobToDateMonth && jobPostingForm.jobToDateYear
        ? `${jobPostingForm.jobToDateMonth}.${jobPostingForm.jobToDateYear}`
        : null,
  };
}
