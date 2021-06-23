import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import type { AddEmployee, Employee, ProjectPostingStep1, ProjectPosting } from "api";

import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/projectposting/state";

export type Mutations<S = State> = {
  [MutationTypes.PROJECTPOSTING_STEP_LOADING](state: S): void;
  [MutationTypes.PROJECTPOSTING_STEP_LOADED](state: S, payload: ProjectPostingStep1): void;
  [MutationTypes.PROJECTPOSTING_LOADING](state: S): void;
  [MutationTypes.PROJECTPOSTING_LOADED](state: S, payload: ProjectPosting): void;
  [MutationTypes.CLEAR_CURRENT_PROJECTPOSTING](state: S): void;
  [MutationTypes.ADD_EMPLOYEE_LOADING](state: S): void;
  [MutationTypes.ADD_EMPLOYEE_LOADED](state: S, payload: AddEmployee): void;
  [MutationTypes.EMPLOYEES_LOADING](state: S): void;
  [MutationTypes.EMPLOYEES_LOADED](state: S, payload: Employee[]): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.PROJECTPOSTING_STEP_LOADING](state: State) {
    state.projectPosting.loading = true;
  },
  [MutationTypes.PROJECTPOSTING_STEP_LOADED](state: State, payload: ProjectPostingStep1) {
    state.projectPosting.loading = false;
    state.projectPosting.success = payload.success || false;
    state.projectPosting.errors = errorCodeMapper(payload.errors);
    if (payload.success) {
      state.projectPosting.id = payload.projectPostingId || "";
      state.projectPosting.slug = payload.slug || "";
    }
  },
  [MutationTypes.PROJECTPOSTING_LOADING](state: State) {
    state.currentProjectPosting.loading = true;
  },
  [MutationTypes.PROJECTPOSTING_LOADED](state: State, payload: ProjectPosting) {
    state.currentProjectPosting.loading = false;
    state.currentProjectPosting.data = payload;
  },
  [MutationTypes.CLEAR_CURRENT_PROJECTPOSTING](state: State) {
    state.currentProjectPosting.data = null;
  },
  [MutationTypes.ADD_EMPLOYEE_LOADING](state: State) {
    state.currentProjectPosting.loading = true;
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
