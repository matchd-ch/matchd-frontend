import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import { State } from "@/store/modules/jobposting/state";
import type { AddEmployee, Employee, JobPosting, JobPostingBaseDataForm } from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

export type Mutations<S = State> = {
  [MutationTypes.JOBPOSTING_STEP_LOADING](state: S): void;
  [MutationTypes.JOBPOSTING_STEP_LOADED](state: S, payload: JobPostingBaseDataForm): void;
  [MutationTypes.JOBPOSTING_LOADING](state: S): void;
  [MutationTypes.JOBPOSTING_LOADED](state: S, payload: JobPosting): void;
  [MutationTypes.CLEAR_CURRENT_JOBPOSTING](state: S): void;
  [MutationTypes.ADD_EMPLOYEE_LOADING](state: S): void;
  [MutationTypes.ADD_EMPLOYEE_LOADED](state: S, payload: AddEmployee): void;
  [MutationTypes.EMPLOYEES_LOADING](state: S): void;
  [MutationTypes.EMPLOYEES_LOADED](state: S, payload: Employee[]): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.JOBPOSTING_STEP_LOADING](state: State) {
    state.jobPosting.loading = true;
  },
  [MutationTypes.JOBPOSTING_STEP_LOADED](state: State, payload: JobPostingBaseDataForm) {
    state.jobPosting.loading = false;
    state.jobPosting.success = payload.success || false;
    state.jobPosting.errors = errorCodeMapper(payload.errors);
    if (payload.success) {
      state.jobPosting.id = payload.jobPostingId || "";
      state.jobPosting.slug = payload.slug || "";
    }
  },
  [MutationTypes.JOBPOSTING_LOADING](state: State) {
    state.currentJobPosting.loading = true;
  },
  [MutationTypes.JOBPOSTING_LOADED](state: State, payload: JobPosting) {
    state.currentJobPosting.loading = false;
    state.currentJobPosting.data = payload;
  },
  [MutationTypes.CLEAR_CURRENT_JOBPOSTING](state: State) {
    state.currentJobPosting.data = null;
  },
  [MutationTypes.ADD_EMPLOYEE_LOADING](state: State) {
    state.currentJobPosting.loading = true;
  },
  [MutationTypes.ADD_EMPLOYEE_LOADED](state: State, payload: AddEmployee) {
    state.addEmployee.loading = false;
    state.addEmployee.success = payload.success || false;
    state.addEmployee.errors = errorCodeMapper(payload.errors);
    if (payload.success && payload.employee) {
      state.employees.data.push(payload.employee);
    }
  },
  [MutationTypes.EMPLOYEES_LOADING](state: State) {
    state.employees.loading = true;
  },
  [MutationTypes.EMPLOYEES_LOADED](state: State, payload: Employee[]) {
    state.employees.loading = false;
    state.employees.data = payload;
  },
};
