import { createApolloClient } from "@/api/apollo-client";
import { AttachmentKey } from "@/api/models/types";
import { RootState } from "@/store";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/upload/mutations";
import { MutationTypes } from "@/store/modules/upload/mutation-types";
import { State } from "@/store/modules/upload/state";

import uploadMutation from "@/api/mutations/upload.gql";
import uploadTypesQuery from "@/api/queries/uploadConfigurations.gql";
import attachmentsQuery from "@/api/queries/attachments.gql";
import attachmentsProjectPostingQuery from "@/api/queries/attachmentsProjectPosting.gql";
import uploadProjectPostingMutation from "@/api/mutations/uploadProjectPosting.gql";

import deleteAttachmentMutation from "@/api/mutations/deleteAttachment.gql";
import getEnv from "@/helpers/env";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(getEnv("VUE_APP_API", "http://localhost"));

export interface Actions {
  [ActionTypes.UPLOAD_CONFIGURATIONS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.UPLOAD_FILE](
    { commit, dispatch }: AugmentedActionContext,
    payload: { key: AttachmentKey; files: FileList }
  ): Promise<void>;
  [ActionTypes.UPLOAD_PROJECT_POSTING_FILE](
    { commit, dispatch }: AugmentedActionContext,
    payload: { key: AttachmentKey; files: FileList; id: string }
  ): Promise<void>;
  [ActionTypes.UPLOADED_FILES](
    { commit }: AugmentedActionContext,
    payload: { key: AttachmentKey }
  ): Promise<void>;
  [ActionTypes.UPLOADED_PROJECT_POSTING_FILES](
    { commit }: AugmentedActionContext,
    payload: { key: AttachmentKey; id: string }
  ): Promise<void>;
  [ActionTypes.DELETE_FILE](
    { commit, dispatch }: AugmentedActionContext,
    payload: { key: AttachmentKey; id: string }
  ): Promise<void>;
  [ActionTypes.DELETE_PROJECT_POSTING_FILE](
    { commit, dispatch }: AugmentedActionContext,
    payload: { key: AttachmentKey; id: string; projectPostingId: string }
  ): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.UPLOAD_CONFIGURATIONS]({ commit }) {
    commit(MutationTypes.CONFIGURATIONS_LOADING);
    const response = await apiClient.query({
      query: uploadTypesQuery,
    });
    commit(MutationTypes.CONFIGURATIONS_LOADED, response.data.uploadConfigurations);
  },
  async [ActionTypes.UPLOAD_FILE](
    { commit, dispatch },
    payload: { key: AttachmentKey; files: FileList }
  ) {
    commit(MutationTypes.ADD_FILE_TO_QUEUE, payload);
    for (const file of payload.files) {
      commit(MutationTypes.UPLOAD_FILE_START, { key: payload.key, file });
      const response = await apiClient.mutate({
        mutation: uploadMutation,
        variables: {
          key: payload.key,
          file: file,
        },
      });
      commit(MutationTypes.UPLOAD_FILE_COMPLETE, {
        key: payload.key,
        file,
        response: response.data.upload,
      });
      await dispatch(ActionTypes.UPLOADED_FILES, { key: payload.key });
    }
  },
  async [ActionTypes.UPLOAD_PROJECT_POSTING_FILE](
    { commit, dispatch },
    payload: { key: AttachmentKey; files: FileList; id: string }
  ) {
    commit(MutationTypes.ADD_FILE_TO_QUEUE, payload);
    for (const file of payload.files) {
      commit(MutationTypes.UPLOAD_FILE_START, { key: payload.key, file });
      const response = await apiClient.mutate({
        mutation: uploadProjectPostingMutation,
        variables: {
          key: payload.key,
          projectPostingId: payload.id,
          file: file,
        },
      });
      commit(MutationTypes.UPLOAD_FILE_COMPLETE, {
        key: payload.key,
        file,
        response: response.data.upload,
      });
      await dispatch(ActionTypes.UPLOADED_PROJECT_POSTING_FILES, {
        key: payload.key,
        id: payload.id,
      });
    }
  },
  async [ActionTypes.UPLOADED_FILES]({ commit }, payload: { key: AttachmentKey }) {
    commit(MutationTypes.UPLOADED_FILES_LOADING, payload);
    const response = await apiClient.query({
      query: attachmentsQuery,
      variables: payload,
      fetchPolicy: "no-cache",
    });
    commit(MutationTypes.UPLOADED_FILES_LOADED, {
      key: payload.key,
      data: response.data.attachments,
    });
  },
  async [ActionTypes.UPLOADED_PROJECT_POSTING_FILES](
    { commit },
    payload: { key: AttachmentKey; id: string }
  ) {
    commit(MutationTypes.UPLOADED_FILES_LOADING, payload);
    const response = await apiClient.query({
      query: attachmentsProjectPostingQuery,
      variables: payload,
      fetchPolicy: "no-cache",
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
  async [ActionTypes.DELETE_PROJECT_POSTING_FILE](
    { commit, dispatch },
    payload: { key: AttachmentKey; id: string; projectPostingId: string }
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
      dispatch(ActionTypes.UPLOADED_PROJECT_POSTING_FILES, {
        key: payload.key,
        id: payload.projectPostingId,
      });
    }
  },
};
