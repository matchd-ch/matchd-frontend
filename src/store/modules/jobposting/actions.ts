import { createApolloClient } from "@/api/apollo-client";
import addEmployeeMutation from "@/api/mutations/addEmployee.gql";
import jobPostingAllocationMutation from "@/api/mutations/jobPostingAllocation.gql";
import jobPostingBaseDataMutation from "@/api/mutations/jobPostingBaseData.gql";
import jobPostingRequirementsMutation from "@/api/mutations/jobPostingRequirements.gql";
import employeesQuery from "@/api/queries/employees.gql";
import jobPostingQuery from "@/api/queries/jobPosting.gql";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/jobposting/mutation-types";
import { Mutations } from "@/store/modules/jobposting/mutations";
import { State } from "@/store/modules/jobposting/state";
import type {
  AddEmployeeInput,
  JobPostingInputAllocation,
  JobPostingInputBaseData,
  JobPostingInputRequirements,
} from "api";
import { ActionContext, ActionTree } from "vuex";
import { config } from "./../../../config";
import { ActionTypes } from "./action-types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(config.API_URL);

export interface Actions {
  [ActionTypes.SAVE_JOBPOSTING_STEP1](
    { commit }: AugmentedActionContext,
    payload: JobPostingInputBaseData
  ): Promise<void>;
  [ActionTypes.SAVE_JOBPOSTING_STEP2](
    { commit }: AugmentedActionContext,
    payload: JobPostingInputRequirements
  ): Promise<void>;
  [ActionTypes.SAVE_JOBPOSTING_STEP3](
    { commit }: AugmentedActionContext,
    payload: JobPostingInputAllocation
  ): Promise<void>;
  [ActionTypes.JOBPOSTING](
    { commit }: AugmentedActionContext,
    payload: { slug: string }
  ): Promise<void>;
  [ActionTypes.ADD_EMPLOYEE](
    { commit }: AugmentedActionContext,
    payload: AddEmployeeInput
  ): Promise<void>;
  [ActionTypes.EMPLOYEES]({ commit }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SAVE_JOBPOSTING_STEP1]({ commit }, payload: JobPostingInputBaseData) {
    commit(MutationTypes.JOBPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: jobPostingBaseDataMutation,
      variables: payload,
    });
    commit(MutationTypes.JOBPOSTING_STEP_LOADED, response.data.jobPostingBaseData);
  },
  async [ActionTypes.SAVE_JOBPOSTING_STEP2]({ commit }, payload: JobPostingInputRequirements) {
    commit(MutationTypes.JOBPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: jobPostingRequirementsMutation,
      variables: payload,
    });
    commit(MutationTypes.JOBPOSTING_STEP_LOADED, response.data.jobPostingRequirements);
  },
  async [ActionTypes.SAVE_JOBPOSTING_STEP3]({ commit }, payload: JobPostingInputAllocation) {
    commit(MutationTypes.JOBPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: jobPostingAllocationMutation,
      variables: payload,
    });
    commit(MutationTypes.JOBPOSTING_STEP_LOADED, response.data.jobPostingAllocation);
  },
  async [ActionTypes.JOBPOSTING]({ commit }, payload: { slug: string }) {
    commit(MutationTypes.JOBPOSTING_LOADING);
    const response = await apiClient.query({
      query: jobPostingQuery,
      variables: payload,
      fetchPolicy: "no-cache",
    });
    commit(MutationTypes.JOBPOSTING_LOADED, response.data.jobPosting);
  },
  async [ActionTypes.ADD_EMPLOYEE]({ commit }, payload: AddEmployeeInput) {
    commit(MutationTypes.ADD_EMPLOYEE_LOADING);
    const response = await apiClient.mutate({
      mutation: addEmployeeMutation,
      variables: payload,
    });
    commit(MutationTypes.ADD_EMPLOYEE_LOADED, response.data.addEmployee);
  },
  async [ActionTypes.EMPLOYEES]({ commit }) {
    commit(MutationTypes.EMPLOYEES_LOADING);
    const response = await apiClient.query({
      query: employeesQuery,
      fetchPolicy: "no-cache",
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.EMPLOYEES_LOADED, response.data.me?.company?.employees);
  },
};
