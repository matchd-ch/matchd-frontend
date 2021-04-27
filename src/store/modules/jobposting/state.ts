import { MatchdApiError } from "@/models/MatchdApiError";
import type { Employee, JobPosting } from "api";

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
    data: JobPosting | null;
  };
  employees: {
    loading: boolean;
    data: Employee[];
  };
  addEmployee: {
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
};
