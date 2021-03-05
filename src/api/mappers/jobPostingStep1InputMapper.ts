import { JobPostingStep1Form } from "@/models/JobPostingStep1Form";
import { JobPostingInputStep1 } from "@/store/modules/jobposting/actions";

export function jobPostingStep1InputMapper(
  jobPostingForm: JobPostingStep1Form
): JobPostingInputStep1 {
  return {
    ...jobPostingForm,
  };
}
