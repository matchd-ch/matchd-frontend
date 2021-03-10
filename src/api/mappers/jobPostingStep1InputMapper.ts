import { IJobPostingInputStep1 } from "@/api/models/types";
import { JobPostingStep1Form } from "@/models/JobPostingStep1Form";

export function jobPostingStep1InputMapper(
  jobPostingForm: JobPostingStep1Form
): IJobPostingInputStep1 {
  return {
    description: jobPostingForm.description,
    workload: jobPostingForm.workload,
    url: jobPostingForm.url,
    jobOption: {
      id: jobPostingForm.jobOptionId,
    },
    jobFromDate: `${jobPostingForm.jobFromDateMonth}.${jobPostingForm.jobFromDateYear}`,
    jobToDate:
      jobPostingForm.jobToDateMonth && jobPostingForm.jobToDateYear
        ? `${jobPostingForm.jobToDateMonth}.${jobPostingForm.jobToDateYear}`
        : null,
  };
}
