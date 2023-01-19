import type {
  AddEmployeePayload,
  ChallengeAllocationPayload,
  ChallengeBaseDataPayload,
  ChallengeSpecificDataPayload,
  DeleteChallengePayload,
} from "@/api/models/types";
import { ChallengeQuery } from "@/api/queries/challenge.generated";
import { EmployeesQuery } from "@/api/queries/employees.generated";
import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import { ensureNoNullsAndUndefineds } from "@/helpers/typeHelpers";
import { State } from "@/store/modules/challenge/state";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

type ChallengeSteps =
  | ChallengeBaseDataPayload
  | ChallengeAllocationPayload
  | ChallengeSpecificDataPayload;

export type Mutations<S = State> = {
  [MutationTypes.CHALLENGE_STEP_LOADING](state: S): void;
  [MutationTypes.CHALLENGE_STEP_LOADED](state: S, payload: ChallengeSteps): void;
  [MutationTypes.CHALLENGE_LOADING](state: S): void;
  [MutationTypes.CHALLENGE_LOADED](state: S, payload: ChallengeQuery): void;
  [MutationTypes.CLEAR_CURRENT_CHALLENGE](state: S): void;
  [MutationTypes.ADD_EMPLOYEE_LOADING](state: S): void;
  [MutationTypes.ADD_EMPLOYEE_LOADED](state: S, payload: AddEmployeePayload): void;
  [MutationTypes.EMPLOYEES_LOADING](state: S): void;
  [MutationTypes.EMPLOYEES_LOADED](state: S, payload: EmployeesQuery): void;
  [MutationTypes.DELETE_CHALLENGE_LOADING](state: S): void;
  [MutationTypes.DELETE_CHALLENGE_LOADED](state: S, payload: DeleteChallengePayload): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.CHALLENGE_STEP_LOADING](state: State) {
    state.challenge.loading = true;
  },
  [MutationTypes.CHALLENGE_STEP_LOADED](state: State, payload: ChallengeSteps) {
    state.challenge.loading = false;
    state.challenge.success = payload.success || false;
    state.challenge.errors = errorCodeMapper(payload.errors);
    if (payload.success) {
      state.challenge.id = payload.challengeId || "";
      state.challenge.slug = payload.slug || "";
    }
  },
  [MutationTypes.CHALLENGE_LOADING](state: State) {
    state.currentChallenge.loading = true;
  },
  [MutationTypes.CHALLENGE_LOADED](state: State, payload: ChallengeQuery) {
    state.currentChallenge.loading = false;
    state.currentChallenge.data = payload.challenge || null;
  },
  [MutationTypes.CLEAR_CURRENT_CHALLENGE](state: State) {
    state.currentChallenge.data = null;
  },
  [MutationTypes.ADD_EMPLOYEE_LOADING](state: State) {
    state.currentChallenge.loading = true;
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
  [MutationTypes.DELETE_CHALLENGE_LOADING](state: State) {
    state.deleteChallenge.loading = true;
  },
  [MutationTypes.DELETE_CHALLENGE_LOADED](state: State, payload: DeleteChallengePayload) {
    state.deleteChallenge.loading = false;
    state.deleteChallenge.success = payload.success || false;
    state.deleteChallenge.errors = errorCodeMapper(payload.errors);
  },
};
