import { AddEmployeeState } from "@/models/AddEmployeeState";
import { JobPostingState } from "@/models/JobPostingState";
import { RootState } from "@/store";
import type { Employee, JobPosting } from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  jobPostingLoading(state: State): boolean;
  jobPostingState(state: State): JobPostingState;
  jobPostingId(state: State): string;
  currentJobPostingStep(state: State): number;
  currentJobPosting(state: State): JobPosting | null;
  employees(state: State): Employee[];
  addEmployeeLoading(state: State): boolean;
  addEmployeeState(state: State): AddEmployeeState;
};

export const getters: GetterTree<State, RootState> & Getters = {
  jobPostingLoading(state: State): boolean {
    return state.jobPosting.loading;
  },
  jobPostingState(state: State): JobPostingState {
    return {
      success: state.jobPosting.success,
      errors: state.jobPosting.errors || null,
      id: state.jobPosting.id,
    };
  },
  jobPostingId(state: State): string {
    return state.jobPosting.id;
  },
  currentJobPostingStep(state: State): number {
    return state.currentJobPosting.data?.formStep || 1;
  },
  currentJobPosting(state: State): JobPosting | null {
    return state.currentJobPosting.data;
  },
  employees(state: State): Employee[] {
    return state.employees.data;
  },
  addEmployeeLoading(state: State): boolean {
    return state.addEmployee.loading;
  },
  addEmployeeState(state: State): AddEmployeeState {
    return {
      success: state.addEmployee.success,
      errors: state.addEmployee.errors || null,
    };
  },
};
