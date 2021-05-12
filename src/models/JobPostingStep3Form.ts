import { JobPostingState } from "@/api/models/types";

export interface AddEmployeeSubForm {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

export interface JobPostingStep3Form {
  state: JobPostingState;
  employeeId: string;
}
