import type {
  AddEmployeePayload,
  DeleteEmployeePayload,
  DeleteJobPostingPayload,
  JobPostingAllocationPayload,
  JobPostingBaseDataPayload,
  JobPostingRequirementsPayload,
} from "@/api/models/types";
import type { EmployeesQuery } from "@/api/queries/employees.generated";
import type { JobPostingQuery } from "@/api/queries/jobPosting.generated";
import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import { ensureNoNullsAndUndefineds } from "@/helpers/typeHelpers";
import type { State } from "@/store/modules/jobposting/state";
import type { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

export type JobPostingStep =
  | JobPostingBaseDataPayload
  | JobPostingAllocationPayload
  | JobPostingRequirementsPayload;

export type Mutations<S = State> = {
  [MutationTypes.JOBPOSTING_STEP_LOADING](state: S): void;
  [MutationTypes.JOBPOSTING_STEP_LOADED](state: S, payload: JobPostingStep): void;
  [MutationTypes.JOBPOSTING_LOADING](state: S): void;
  [MutationTypes.JOBPOSTING_LOADED](state: S, payload: JobPostingQuery): void;
  [MutationTypes.CLEAR_CURRENT_JOBPOSTING](state: S): void;
  [MutationTypes.ADD_EMPLOYEE_LOADING](state: S): void;
  [MutationTypes.ADD_EMPLOYEE_LOADED](state: S, payload: AddEmployeePayload): void;
  [MutationTypes.DELETE_EMPLOYEE_LOADING](state: S): void;
  [MutationTypes.DELETE_EMPLOYEE_LOADED](state: S, payload: DeleteEmployeePayload): void;
  [MutationTypes.EMPLOYEES_LOADING](state: S): void;
  [MutationTypes.EMPLOYEES_LOADED](state: S, payload: EmployeesQuery): void;
  [MutationTypes.DELETE_JOBPOSTING_LOADING](state: S): void;
  [MutationTypes.DELETE_JOBPOSTING_LOADED](state: S, payload: DeleteJobPostingPayload): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.JOBPOSTING_STEP_LOADING](state: State) {
    state.jobPosting.loading = true;
  },
  [MutationTypes.JOBPOSTING_STEP_LOADED](state: State, payload: JobPostingStep) {
    state.jobPosting.loading = false;
    state.jobPosting.success = payload.success || false;
    state.jobPosting.errors = errorCodeMapper(payload.errors);
    state.jobPosting.id = payload.jobPostingId ?? "";
    state.jobPosting.slug = payload.slug ?? "";
  },
  [MutationTypes.JOBPOSTING_LOADING](state: State) {
    state.currentJobPosting.loading = true;
  },
  [MutationTypes.JOBPOSTING_LOADED](state: State, payload: JobPostingQuery) {
    state.currentJobPosting.loading = false;
    state.currentJobPosting.data = payload.jobPosting ?? null;
  },
  [MutationTypes.CLEAR_CURRENT_JOBPOSTING](state: State) {
    state.currentJobPosting.data = null;
  },
  [MutationTypes.ADD_EMPLOYEE_LOADING](state: State) {
    state.addEmployee.loading = true;
  },
  [MutationTypes.ADD_EMPLOYEE_LOADED](state: State, payload: AddEmployeePayload) {
    state.addEmployee.success = payload.success || false;
    state.addEmployee.errors = errorCodeMapper(payload.errors);
    state.addEmployee.employee = payload.employee ?? undefined;
    if (payload.success && payload.employee && state.employees.data) {
      state.employees.data.push(payload.employee);
    }
    state.addEmployee.loading = false;
  },
  [MutationTypes.DELETE_EMPLOYEE_LOADING](state: State) {
    state.deleteEmployee.loading = true;
  },
  [MutationTypes.DELETE_EMPLOYEE_LOADED](state: State, payload: DeleteEmployeePayload) {
    state.deleteEmployee.loading = false;
    state.deleteEmployee.success = payload.success || false;
    state.deleteEmployee.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.EMPLOYEES_LOADING](state: State) {
    state.employees.loading = true;
  },
  [MutationTypes.EMPLOYEES_LOADED](state: State, payload: EmployeesQuery) {
    state.employees.loading = false;
    state.employees.data = ensureNoNullsAndUndefineds(payload.me?.company?.employees ?? []);
  },
  [MutationTypes.DELETE_JOBPOSTING_LOADING](state: State) {
    state.deleteJobPosting.loading = true;
  },
  [MutationTypes.DELETE_JOBPOSTING_LOADED](state: State, payload: DeleteJobPostingPayload) {
    state.deleteJobPosting.loading = false;
    state.deleteJobPosting.success = payload.success || false;
    state.deleteJobPosting.errors = errorCodeMapper(payload.errors);
  },
};
