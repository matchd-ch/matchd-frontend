import { JobPostingInputAllocation } from "@/api/models/types";
import { JobPostingStep3Form } from "@/models/JobPostingStep3Form";

export function jobPostingStep3InputMapper(
  id: string,
  jobPostingForm: JobPostingStep3Form
): JobPostingInputAllocation {
  return {
    id,
    state: jobPostingForm.state,
    employee: {
      id: jobPostingForm.employeeId,
    },
  };
}
