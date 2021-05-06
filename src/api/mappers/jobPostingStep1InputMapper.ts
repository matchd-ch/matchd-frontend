import { IJobPostingInputStep1 } from "@/api/models/types";
import { JobPostingStep1Form } from "@/models/JobPostingStep1Form";

export function jobPostingStep1InputMapper(
  id: string | undefined,
  jobPostingForm: JobPostingStep1Form
): IJobPostingInputStep1 {
  return {
    id: id || null,
    title: jobPostingForm.title,
    description: jobPostingForm.description,
    workload: jobPostingForm.fullTime ? 100 : +jobPostingForm.workload,
    url: jobPostingForm.url,
    jobType: {
      id: jobPostingForm.jobTypeId,
    },
    branch: {
      id: jobPostingForm.branchId,
    },
    jobFromDate: `${jobPostingForm.jobFromDateMonth}.${jobPostingForm.jobFromDateYear}`,
    jobToDate:
      jobPostingForm.jobToDateMonth && jobPostingForm.jobToDateYear
        ? `${jobPostingForm.jobToDateMonth}.${jobPostingForm.jobToDateYear}`
        : null,
  };
}
