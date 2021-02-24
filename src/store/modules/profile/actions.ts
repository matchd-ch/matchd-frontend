import { createApolloClient } from "@/api/apollo-client";
import {
  AttachmentKey,
  IStudentProfileInputStep1,
  IStudentProfileInputStep2,
  IStudentProfileInputStep3,
  IStudentProfileInputStep4,
  IStudentProfileInputStep5,
} from "@/api/models/types";
import { RootState } from "@/store";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/profile/mutations";
import { MutationTypes } from "@/store/modules/profile/mutation-types";
import { State } from "@/store/modules/profile/state";

import studentProfileStep1Mutation from "@/api/mutations/studentProfileStep1.gql";
import studentProfileStep2Mutation from "@/api/mutations/studentProfileStep2.gql";
import studentProfileStep3Mutation from "@/api/mutations/studentProfileStep3.gql";
import studentProfileStep4Mutation from "@/api/mutations/studentProfileStep4.gql";
import studentProfileStep5Mutation from "@/api/mutations/studentProfileStep5.gql";
import uploadMutation from "@/api/mutations/upload.gql";
import studentProfileStep3DataQuery from "@/api/queries/studentProfileStep3Data.gql";
import studentProfileStep4DataQuery from "@/api/queries/studentProfileStep4Data.gql";
import zipCityQuery from "@/api/queries/zipCity.gql";
import uploadTypesQuery from "@/api/queries/uploadConfigurations.gql";
import attachmentsQuery from "@/api/queries/attachments.gql";
import deleteAttachmentMutation from "@/api/mutations/deleteAttachment.gql";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(process.env.VUE_APP_API || "http://localhost");

export interface Actions {
  [ActionTypes.ONBOARDING_STEP1](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputStep1
  ): Promise<void>;
  [ActionTypes.ONBOARDING_STEP2](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputStep2
  ): Promise<void>;
  [ActionTypes.ONBOARDING_STEP3](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputStep3
  ): Promise<void>;
  [ActionTypes.ONBOARDING_STEP4](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputStep4
  ): Promise<void>;
  [ActionTypes.ONBOARDING_STEP5](
    { commit }: AugmentedActionContext,
    payload: IStudentProfileInputStep5
  ): Promise<void>;
  [ActionTypes.ONBOARDING_STEP3_DATA]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.ONBOARDING_STEP4_DATA]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.CITY_BY_ZIP]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.UPLOAD_CONFIGURATIONS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.UPLOAD_FILE](
    { commit, dispatch }: AugmentedActionContext,
    payload: { key: AttachmentKey; files: FileList }
  ): Promise<void>;
  [ActionTypes.UPLOADED_FILES](
    { commit }: AugmentedActionContext,
    payload: { key: AttachmentKey }
  ): Promise<void>;
  [ActionTypes.DELETE_FILE](
    { commit, dispatch }: AugmentedActionContext,
    payload: { key: AttachmentKey; id: string }
  ): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.ONBOARDING_STEP1]({ commit }, payload: IStudentProfileInputStep1) {
    commit(MutationTypes.ONBOARDING_STEP1_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileStep1Mutation,
      variables: payload,
    });
    commit(MutationTypes.ONBOARDING_STEP1_LOADED, response.data.studentProfileStep1);
  },
  async [ActionTypes.ONBOARDING_STEP2]({ commit }, payload: IStudentProfileInputStep2) {
    commit(MutationTypes.ONBOARDING_STEP2_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileStep2Mutation,
      variables: payload,
    });
    commit(MutationTypes.ONBOARDING_STEP2_LOADED, response.data.studentProfileStep2);
  },
  async [ActionTypes.ONBOARDING_STEP3]({ commit }, payload: IStudentProfileInputStep3) {
    commit(MutationTypes.ONBOARDING_STEP3_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileStep3Mutation,
      variables: payload,
    });
    commit(MutationTypes.ONBOARDING_STEP3_LOADED, response.data.studentProfileStep3);
  },
  async [ActionTypes.ONBOARDING_STEP4]({ commit }, payload: IStudentProfileInputStep4) {
    commit(MutationTypes.ONBOARDING_STEP4_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileStep4Mutation,
      variables: payload,
    });
    commit(MutationTypes.ONBOARDING_STEP4_LOADED, response.data.studentProfileStep4);
  },
  async [ActionTypes.ONBOARDING_STEP5]({ commit }, payload: IStudentProfileInputStep5) {
    commit(MutationTypes.ONBOARDING_STEP5_LOADING);
    const response = await apiClient.mutate({
      mutation: studentProfileStep5Mutation,
      variables: payload,
    });
    commit(MutationTypes.ONBOARDING_STEP5_LOADED, response.data.studentProfileStep5);
  },
  async [ActionTypes.ONBOARDING_STEP3_DATA]({ commit }) {
    commit(MutationTypes.ONBOARDING_STEP3_DATA_LOADING);
    const response = await apiClient.query({
      query: studentProfileStep3DataQuery,
    });
    commit(MutationTypes.ONBOARDING_STEP3_DATA_LOADED, {
      jobPositions: response.data.jobPositions,
      jobOptions: response.data.jobOptions,
    });
  },
  async [ActionTypes.ONBOARDING_STEP4_DATA]({ commit }) {
    commit(MutationTypes.ONBOARDING_STEP4_DATA_LOADING);
    const response = await apiClient.query({
      query: studentProfileStep4DataQuery,
    });
    commit(MutationTypes.ONBOARDING_STEP4_DATA_LOADED, {
      skills: response.data.skills,
      languages: response.data.languages,
      languageLevels: response.data.languageLevels,
    });
  },
  async [ActionTypes.CITY_BY_ZIP]({ commit }) {
    commit(MutationTypes.ZIP_CITY_LOADING);
    const response = await apiClient.query({
      query: zipCityQuery,
    });
    commit(MutationTypes.ZIP_CITY_LOADED, response.data.zipCity);
  },
  async [ActionTypes.UPLOAD_CONFIGURATIONS]({ commit }) {
    commit(MutationTypes.UPLOAD_CONFIGURATIONS_LOADING);
    const response = await apiClient.query({
      query: uploadTypesQuery,
    });
    commit(MutationTypes.UPLOAD_CONFIGURATIONS_LOADED, response.data.uploadConfigurations);
  },
  async [ActionTypes.UPLOAD_FILE](
    { commit, dispatch },
    payload: { key: AttachmentKey; files: FileList }
  ) {
    for (const file of payload.files) {
      commit(MutationTypes.UPLOAD_FILE_LOADING);
      const response = await apiClient.mutate({
        mutation: uploadMutation,
        variables: {
          key: payload.key,
          file: file,
        },
      });
      commit(MutationTypes.UPLOAD_FILE_LOADED, response.data.upload);
      if (response.data.upload?.success) {
        await dispatch(ActionTypes.UPLOADED_FILES, { key: payload.key });
      }
    }
  },
  async [ActionTypes.UPLOADED_FILES]({ commit }, payload: { key: AttachmentKey }) {
    commit(MutationTypes.UPLOADED_FILES_LOADING, payload);
    const response = await apiClient.query({
      query: attachmentsQuery,
      variables: payload,
      fetchPolicy: "network-only",
    });
    commit(MutationTypes.UPLOADED_FILES_LOADED, {
      key: payload.key,
      data: response.data.attachments,
    });
  },
  async [ActionTypes.DELETE_FILE](
    { commit, dispatch },
    payload: { key: AttachmentKey; id: string }
  ) {
    commit(MutationTypes.DELETE_FILE_LOADING, payload);
    const response = await apiClient.mutate({
      mutation: deleteAttachmentMutation,
      variables: payload,
    });
    commit(MutationTypes.DELETE_FILE_LOADED, {
      key: payload.key,
      data: response.data.deleteAttachment,
    });
    if (response.data.deleteAttachment?.success) {
      dispatch(ActionTypes.UPLOADED_FILES, { key: payload.key });
    }
  },
};
