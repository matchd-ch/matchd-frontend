import { IJobPostingInputStep3, JobPostingState } from "@/api/models/types";
import { JobPostingStep3Form } from "@/models/JobPostingStep3Form";

export function jobPostingStep3InputMapper(
  id: string,
  jobPostingForm: JobPostingStep3Form
): IJobPostingInputStep3 {
  return {
    id,
    state: jobPostingForm.public ? JobPostingState.Public : JobPostingState.Draft,
    employee: {
      id: jobPostingForm.employeeId,
    },
  };
}
