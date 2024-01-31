import { createApolloClient } from "@/api/apollo-client";
import type { AttachmentKey } from "@/api/models/types";
import deleteAttachmentMutation from "@/api/mutations/deleteAttachment.gql";
import { UploadDocument } from "@/api/mutations/upload.generated";
import { UploadChallengeDocument } from "@/api/mutations/uploadChallenge.generated";
import attachmentsQuery from "@/api/queries/attachments.gql";
import attachmentsChallengeQuery from "@/api/queries/attachmentsChallenge.gql";
import uploadTypesQuery from "@/api/queries/uploadConfigurations.gql";
import type { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/upload/mutation-types";
import type { Mutations } from "@/store/modules/upload/mutations";
import type { State } from "@/store/modules/upload/state";
import type { ActionContext, ActionTree } from "vuex";
import { config } from "./../../../config";
import { ActionTypes } from "./action-types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(config.API_URL);

export interface Actions {
  [ActionTypes.UPLOAD_CONFIGURATIONS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.UPLOAD_FILE](
    { commit, dispatch }: AugmentedActionContext,
    payload: { key: AttachmentKey; files: FileList },
  ): Promise<void>;
  [ActionTypes.UPLOAD_CHALLENGE_FILE](
    { commit, dispatch }: AugmentedActionContext,
    payload: { key: AttachmentKey; files: FileList; id: string },
  ): Promise<void>;
  [ActionTypes.UPLOADED_FILES](
    { commit }: AugmentedActionContext,
    payload: { key: AttachmentKey },
  ): Promise<void>;
  [ActionTypes.UPLOADED_CHALLENGE_FILES](
    { commit }: AugmentedActionContext,
    payload: { key: AttachmentKey; id: string },
  ): Promise<void>;
  [ActionTypes.DELETE_FILE](
    { commit, dispatch }: AugmentedActionContext,
    payload: { key: AttachmentKey; id: string },
  ): Promise<void>;
  [ActionTypes.DELETE_CHALLENGE_FILE](
    { commit, dispatch }: AugmentedActionContext,
    payload: { key: AttachmentKey; id: string; challengeId: string },
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
    payload: { key: AttachmentKey; files: FileList },
  ) {
    commit(MutationTypes.ADD_FILE_TO_QUEUE, payload);
    for (const file of payload.files) {
      commit(MutationTypes.UPLOAD_FILE_START, { key: payload.key, file });
      const response = await apiClient.mutate({
        mutation: UploadDocument,
        variables: {
          key: payload.key,
          file: file,
        },
      });
      if (response.data?.upload) {
        commit(MutationTypes.UPLOAD_FILE_COMPLETE, {
          key: payload.key,
          file,
          response: response.data?.upload,
        });
      } else {
        throw new Error("UPLOAD_FILE_COMPLETE: upload is undefined");
      }
      await dispatch(ActionTypes.UPLOADED_FILES, { key: payload.key });
    }
  },
  async [ActionTypes.UPLOAD_CHALLENGE_FILE](
    { commit, dispatch },
    payload: { key: AttachmentKey; files: FileList; id: string },
  ) {
    commit(MutationTypes.ADD_FILE_TO_QUEUE, payload);
    for (const file of payload.files) {
      commit(MutationTypes.UPLOAD_FILE_START, { key: payload.key, file });
      const response = await apiClient.mutate({
        mutation: UploadChallengeDocument,
        variables: {
          key: payload.key,
          challengeId: payload.id,
          file: file,
        },
      });
      if (response.data?.upload) {
        commit(MutationTypes.UPLOAD_FILE_COMPLETE, {
          key: payload.key,
          file,
          response: response.data.upload,
        });
      } else {
        throw new Error("UPLOAD_FILE_COMPLETE: upload is undefined");
      }
      await dispatch(ActionTypes.UPLOADED_CHALLENGE_FILES, {
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
  async [ActionTypes.UPLOADED_CHALLENGE_FILES](
    { commit },
    payload: { key: AttachmentKey; id: string },
  ) {
    commit(MutationTypes.UPLOADED_FILES_LOADING, payload);
    const response = await apiClient.query({
      query: attachmentsChallengeQuery,
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
    payload: { key: AttachmentKey; id: string },
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
  async [ActionTypes.DELETE_CHALLENGE_FILE](
    { commit, dispatch },
    payload: { key: AttachmentKey; id: string; challengeId: string },
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
      dispatch(ActionTypes.UPLOADED_CHALLENGE_FILES, {
        key: payload.key,
        id: payload.challengeId,
      });
    }
  },
};
