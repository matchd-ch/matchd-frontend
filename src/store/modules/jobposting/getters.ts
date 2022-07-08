import type { Employee } from "@/api/models/types";
import { JobPostingJobPostingFragment } from "@/api/queries/jobPostingFragment.generated";
import { AddEmployeeState } from "@/models/AddEmployeeState";
import { DeleteEmployeeState } from "@/models/DeleteEmployeeState";
import { JobPostingState } from "@/models/JobPostingState";
import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  jobPostingLoading(state: State): boolean;
  jobPostingState(state: State): JobPostingState;
  jobPostingId(state: State): string;
  currentJobPostingStep(state: State): number;
  currentJobPosting(state: State): JobPostingJobPostingFragment | null;
  employees(state: State): Employee[];
  addEmployeeLoading(state: State): boolean;
  addEmployeeState(state: State): AddEmployeeState;
  deleteEmployeeLoading(state: State): boolean;
  deleteEmployeeState(state: State): DeleteEmployeeState;
};

export const getters: GetterTree<State, RootState> & Getters = {
  jobPostingLoading(state: State) {
    return state.jobPosting.loading;
  },
  jobPostingState(state: State) {
    return {
      success: state.jobPosting.success,
      errors: state.jobPosting.errors || null,
      id: state.jobPosting.id,
      slug: state.jobPosting.slug,
    };
  },
  jobPostingId(state: State) {
    return state.jobPosting.id;
  },
  currentJobPostingStep(state: State) {
    return state.currentJobPosting.data?.formStep || 1;
  },
  currentJobPosting(state: State) {
    return state.currentJobPosting.data;
  },
  employees(state: State) {
    return state.employees.data;
  },
  addEmployeeLoading(state: State) {
    return state.addEmployee.loading;
  },
  addEmployeeState(state: State) {
    return {
      success: state.addEmployee.success,
      errors: state.addEmployee.errors || null,
    };
  },
  deleteEmployeeLoading(state: State) {
    return state.deleteEmployee.loading;
  },
  deleteEmployeeState(state: State) {
    return {
      success: state.deleteEmployee.success,
      errors: state.deleteEmployee.errors || null,
    };
  },
};
