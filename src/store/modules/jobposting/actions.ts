import { createApolloClient } from "@/api/apollo-client";
import type {
  AddEmployeeInput,
  JobPostingAllocationInput,
  JobPostingBaseDataInput,
  JobPostingRequirementsInput,
} from "@/api/models/types";
import { AddEmployeeDocument } from "@/api/mutations/addEmployee.generated";
import { JobPostingAllocationDocument } from "@/api/mutations/jobPostingAllocation.generated";
import { JobPostingBaseDataDocument } from "@/api/mutations/jobPostingBaseData.generated";
import { JobPostingRequirementsDocument } from "@/api/mutations/jobPostingRequirements.generated";
import employeesQuery from "@/api/queries/employees.gql";
import jobPostingQuery from "@/api/queries/jobPosting.gql";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/jobposting/mutation-types";
import { Mutations } from "@/store/modules/jobposting/mutations";
import { State } from "@/store/modules/jobposting/state";
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
    payload: JobPostingBaseDataInput
  ): Promise<void>;
  [ActionTypes.SAVE_JOBPOSTING_STEP2](
    { commit }: AugmentedActionContext,
    payload: JobPostingRequirementsInput
  ): Promise<void>;
  [ActionTypes.SAVE_JOBPOSTING_STEP3](
    { commit }: AugmentedActionContext,
    payload: JobPostingAllocationInput
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
  async [ActionTypes.SAVE_JOBPOSTING_STEP1]({ commit }, payload: JobPostingBaseDataInput) {
    commit(MutationTypes.JOBPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: JobPostingBaseDataDocument,
      variables: { input: payload },
    });
    commit(MutationTypes.JOBPOSTING_STEP_LOADED, response.data?.jobPostingBaseData ?? undefined);
  },
  async [ActionTypes.SAVE_JOBPOSTING_STEP2]({ commit }, payload: JobPostingRequirementsInput) {
    commit(MutationTypes.JOBPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: JobPostingRequirementsDocument,
      variables: { input: payload },
    });
    commit(
      MutationTypes.JOBPOSTING_STEP_LOADED,
      response.data?.jobPostingRequirements ?? undefined
    );
  },
  async [ActionTypes.SAVE_JOBPOSTING_STEP3]({ commit }, payload: JobPostingAllocationInput) {
    commit(MutationTypes.JOBPOSTING_STEP_LOADING);
    const response = await apiClient.mutate({
      mutation: JobPostingAllocationDocument,
      variables: { input: payload },
    });
    commit(MutationTypes.JOBPOSTING_STEP_LOADED, response.data?.jobPostingAllocation ?? undefined);
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
      mutation: AddEmployeeDocument,
      variables: payload,
    });
    commit(MutationTypes.ADD_EMPLOYEE_LOADED, response.data?.addEmployee ?? undefined);
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
