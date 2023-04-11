import type { Employee } from "@/api/models/types";
import type { EmployeesEmployeeFragment } from "@/api/queries/employeesFragment.generated";
import type { JobPostingJobPostingFragment } from "@/api/queries/jobPostingFragment.generated";
import type { MatchdApiError } from "@/models/MatchdApiError";

export type State = {
  jobPosting: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
    id: string;
    slug: string;
  };
  currentJobPosting: {
    loading: boolean;
    data: JobPostingJobPostingFragment | null;
  };
  employees: {
    loading: boolean;
    data: EmployeesEmployeeFragment[];
  };
  addEmployee: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
    employee?: Employee;
  };
  deleteEmployee: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
  deleteJobPosting: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
};

export const state: State = {
  jobPosting: {
    loading: false,
    success: false,
    errors: null,
    id: "",
    slug: "",
  },
  currentJobPosting: {
    loading: false,
    data: null,
  },
  employees: {
    loading: false,
    data: [],
  },
  addEmployee: {
    loading: false,
    success: false,
    errors: null,
  },
  deleteEmployee: {
    loading: false,
    success: false,
    errors: null,
  },
  deleteJobPosting: {
    loading: false,
    success: false,
    errors: null,
  },
};
