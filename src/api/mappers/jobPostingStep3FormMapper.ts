import { JobPostingState } from "@/api/models/types";
import { JobPostingStep3Form } from "@/models/JobPostingStep3Form";
import type { Employee, JobPosting } from "api";

export function jobPostingStep3FormMapper(
  jobPosting: JobPosting,
  employee: Employee
): JobPostingStep3Form {
  return {
    employeeId: jobPosting.employee?.id || employee.id,
    state: jobPosting.state || JobPostingState.Draft,
  };
}
