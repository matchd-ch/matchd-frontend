import type { Employee, ProjectPosting } from "@/api/models/types";
import { ProjectPostingProjectPostingFragment } from "@/api/queries/projectPostingFragment.generated";
import { MatchdApiError } from "@/models/MatchdApiError";

export type State = {
  projectPosting: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
    id: string;
    slug: string;
  };
  currentProjectPosting: {
    loading: boolean;
    data: ProjectPostingProjectPostingFragment | null;
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
  projectPosting: {
    loading: false,
    success: false,
    errors: null,
    id: "",
    slug: "",
  },
  currentProjectPosting: {
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
