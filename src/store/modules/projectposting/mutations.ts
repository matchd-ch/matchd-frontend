import type {
  AddEmployeePayload,
  ProjectPostingAllocationPayload,
  ProjectPostingBaseDataPayload,
  ProjectPostingSpecificDataPayload,
} from "@/api/models/types";
import { EmployeesQuery } from "@/api/queries/employees.generated";
import { ProjectPostingQuery } from "@/api/queries/projectPosting.generated";
import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import { ensureNoNullsAndUndefineds } from "@/helpers/typeHelpers";
import { State } from "@/store/modules/projectposting/state";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

type ProjectPostingSteps =
  | ProjectPostingBaseDataPayload
  | ProjectPostingAllocationPayload
  | ProjectPostingSpecificDataPayload;

export type Mutations<S = State> = {
  [MutationTypes.PROJECTPOSTING_STEP_LOADING](state: S): void;
  [MutationTypes.PROJECTPOSTING_STEP_LOADED](state: S, payload: ProjectPostingSteps): void;
  [MutationTypes.PROJECTPOSTING_LOADING](state: S): void;
  [MutationTypes.PROJECTPOSTING_LOADED](state: S, payload: ProjectPostingQuery): void;
  [MutationTypes.CLEAR_CURRENT_PROJECTPOSTING](state: S): void;
  [MutationTypes.ADD_EMPLOYEE_LOADING](state: S): void;
  [MutationTypes.ADD_EMPLOYEE_LOADED](state: S, payload: AddEmployeePayload): void;
  [MutationTypes.EMPLOYEES_LOADING](state: S): void;
  [MutationTypes.EMPLOYEES_LOADED](state: S, payload: EmployeesQuery): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.PROJECTPOSTING_STEP_LOADING](state: State) {
    state.projectPosting.loading = true;
  },
  [MutationTypes.PROJECTPOSTING_STEP_LOADED](state: State, payload: ProjectPostingSteps) {
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
  [MutationTypes.PROJECTPOSTING_LOADED](state: State, payload: ProjectPostingQuery) {
    state.currentProjectPosting.loading = false;
    state.currentProjectPosting.data = payload.projectPosting || null;
  },
  [MutationTypes.CLEAR_CURRENT_PROJECTPOSTING](state: State) {
    state.currentProjectPosting.data = null;
  },
  [MutationTypes.ADD_EMPLOYEE_LOADING](state: State) {
    state.currentProjectPosting.loading = true;
  },
  [MutationTypes.ADD_EMPLOYEE_LOADED](state: State, payload: AddEmployeePayload) {
    state.addEmployee.loading = false;
    state.addEmployee.success = payload.success || false;
    state.addEmployee.errors = errorCodeMapper(payload.errors);
    if (payload.success && payload.employee && state.employees.data) {
      state.employees.data.push(payload.employee);
    }
  },
  [MutationTypes.EMPLOYEES_LOADING](state: State) {
    state.employees.loading = true;
  },
  [MutationTypes.EMPLOYEES_LOADED](state: State, payload: EmployeesQuery) {
    state.employees.loading = false;
    state.employees.data = ensureNoNullsAndUndefineds(payload.me?.company?.employees ?? []);
  },
};
