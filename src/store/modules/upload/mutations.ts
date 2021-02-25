import { AttachmentKey } from "@/api/models/types";
import { AttachmentType, DeleteAttachment, UploadConfiguration, UserUpload } from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/upload/state";

export type Mutations<S = State> = {
  [MutationTypes.UPLOAD_CONFIGURATIONS_LOADING](state: S): void;
  [MutationTypes.UPLOAD_CONFIGURATIONS_LOADED](state: S, payload: UploadConfiguration[]): void;
  [MutationTypes.UPLOAD_FILE_LOADING](state: S): void;
  [MutationTypes.UPLOAD_FILE_LOADED](state: S, payload: UserUpload): void;
  [MutationTypes.UPLOADED_FILES_LOADING](state: S, payload: { key: AttachmentKey }): void;
  [MutationTypes.UPLOADED_FILES_LOADED](
    state: S,
    payload: { key: AttachmentKey; data: AttachmentType[] }
  ): void;
  [MutationTypes.DELETE_FILE_LOADING](state: S, payload: { key: AttachmentKey }): void;
  [MutationTypes.DELETE_FILE_LOADED](
    state: S,
    payload: { key: AttachmentKey; data: DeleteAttachment }
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.UPLOAD_CONFIGURATIONS_LOADING](state: State) {
    state.uploadConfigurations.loading = true;
  },
  [MutationTypes.UPLOAD_CONFIGURATIONS_LOADED](state: State, payload: UploadConfiguration[]) {
    state.uploadConfigurations.loading = false;
    state.uploadConfigurations.data = payload;
  },
  [MutationTypes.UPLOAD_FILE_LOADING](state: State) {
    state.uploadConfigurations.loading = true;
  },
  [MutationTypes.UPLOAD_FILE_LOADED](state: State, payload: UserUpload) {
    state.uploadConfigurations.loading = false;
  },
  [MutationTypes.UPLOADED_FILES_LOADING](state: State, payload: { key: AttachmentKey }) {
    state.attachments[payload.key] = { loading: true, deleting: false, data: [] };
  },
  [MutationTypes.UPLOADED_FILES_LOADED](
    state: State,
    payload: { key: AttachmentKey; data: AttachmentType[] }
  ) {
    state.attachments[payload.key] = { loading: false, deleting: false, data: payload.data };
  },
  [MutationTypes.DELETE_FILE_LOADING](state: State, payload: { key: AttachmentKey }) {
    state.attachments[payload.key] = {
      ...state.attachments[payload.key],
      deleting: true,
    };
  },
  [MutationTypes.DELETE_FILE_LOADED](
    state: State,
    payload: { key: AttachmentKey; data: DeleteAttachment }
  ) {
    state.attachments[payload.key] = {
      ...state.attachments[payload.key],
      deleting: false,
    };
  },
};
