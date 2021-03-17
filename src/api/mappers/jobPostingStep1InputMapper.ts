import { IJobPostingInputStep1 } from "@/api/models/types";
import { JobPostingStep1Form } from "@/models/JobPostingStep1Form";

export function jobPostingStep1InputMapper(
  id: string | undefined,
  jobPostingForm: JobPostingStep1Form
): IJobPostingInputStep1 {
  return {
    id: id || null,
    description: jobPostingForm.description,
    workload: jobPostingForm.fullTime ? "100" : jobPostingForm.workload,
    url: jobPostingForm.url,
    jobOption: {
      id: jobPostingForm.jobOptionId,
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
