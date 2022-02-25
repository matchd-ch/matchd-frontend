import { JobPostingAllocationInput } from "@/api/models/types";
import { JobPostingStep3Form } from "@/models/JobPostingStep3Form";

export function jobPostingStep3InputMapper(
  id: string,
  jobPostingForm: JobPostingStep3Form
): JobPostingAllocationInput {
  return {
    id,
    state: jobPostingForm.state,
    employee: {
      id: jobPostingForm.employeeId,
    },
  };
}
