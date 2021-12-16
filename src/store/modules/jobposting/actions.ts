import { createApolloClient } from "@/api/apollo-client";
import addEmployeeMutation from "@/api/mutations/addEmployee.gql";
import jobPostingStep1Mutation from "@/api/mutations/jobPostingStep1.gql";
import jobPostingStep2Mutation from "@/api/mutations/jobPostingStep2.gql";
import jobPostingStep3Mutation from "@/api/mutations/jobPostingStep3.gql";
import employeesQuery from "@/api/queries/employees.gql";
import jobPostingQuery from "@/api/queries/jobPosting.gql";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/jobposting/mutation-types";
import { Mutations } from "@/store/modules/jobposting/mutations";
import { State } from "@/store/modules/jobposting/state";
import type {
  AddEmployeeInput,
  JobPostingInputStep1,
  JobPostingInputStep2,
  JobPostingInputStep3,
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
    payload: JobPostingInputStep1
  ): Promise<void>;
  [ActionTypes.SAVE_JOBPOSTING_STEP2](
    { commit }: AugmentedActionContext,
    payload: JobPostingInputStep2
  ): Promise<void>;
  [ActionTypes.SAVE_JOBPOSTING_STEP3](
    { commit }: AugmentedActionContext,
    payload: JobPostingInputStep3
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
  async [ActionTypes.SAVE_JOBPOSTING_STEP1]({ commit }, payload: JobPostingInputStep1) {
    commit(MutationTypes.JOBPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: jobPostingStep1Mutation,
      variables: payload,
    });
    commit(MutationTypes.JOBPOSTING_STEP_LOADED, response.data.jobPostingStep1);
  },
  async [ActionTypes.SAVE_JOBPOSTING_STEP2]({ commit }, payload: JobPostingInputStep2) {
    commit(MutationTypes.JOBPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: jobPostingStep2Mutation,
      variables: payload,
    });
    commit(MutationTypes.JOBPOSTING_STEP_LOADED, response.data.jobPostingStep2);
  },
  async [ActionTypes.SAVE_JOBPOSTING_STEP3]({ commit }, payload: JobPostingInputStep3) {
    commit(MutationTypes.JOBPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: jobPostingStep3Mutation,
      variables: payload,
    });
    commit(MutationTypes.JOBPOSTING_STEP_LOADED, response.data.jobPostingStep3);
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
