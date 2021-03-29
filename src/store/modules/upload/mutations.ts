import { AttachmentKey } from "@/api/models/types";
import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import type { Attachment, DeleteAttachment, UploadConfiguration, UserUpload } from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/upload/state";

export type Mutations<S = State> = {
  [MutationTypes.CONFIGURATIONS_LOADING](state: S): void;
  [MutationTypes.CONFIGURATIONS_LOADED](state: S, payload: UploadConfiguration[]): void;
  [MutationTypes.ADD_FILE_TO_QUEUE](
    state: S,
    payload: { key: AttachmentKey; files: FileList }
  ): void;
  [MutationTypes.UPLOAD_FILE_START](state: S, payload: { key: AttachmentKey; file: File }): void;
  [MutationTypes.UPLOAD_FILE_COMPLETE](
    state: S,
    payload: { key: AttachmentKey; file: File; response: UserUpload }
  ): void;
  [MutationTypes.UPLOADED_FILES_LOADING](state: S, payload: { key: AttachmentKey }): void;
  [MutationTypes.UPLOADED_FILES_LOADED](
    state: S,
    payload: { key: AttachmentKey; data: Attachment[] }
  ): void;
  [MutationTypes.DELETE_FILE_LOADING](state: S, payload: { key: AttachmentKey }): void;
  [MutationTypes.DELETE_FILE_LOADED](
    state: S,
    payload: { key: AttachmentKey; data: DeleteAttachment }
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.CONFIGURATIONS_LOADING](state: State) {
    state.uploadConfigurations.loading = true;
  },
  [MutationTypes.CONFIGURATIONS_LOADED](state: State, payload: UploadConfiguration[]) {
    state.uploadConfigurations.loading = false;
    state.uploadConfigurations.data = payload;
  },
  [MutationTypes.ADD_FILE_TO_QUEUE](
    state: State,
    payload: { key: AttachmentKey; files: FileList }
  ) {
    state.uploadFile[payload.key] = [...payload.files].map((file) => {
      return {
        uploading: false,
        success: false,
        errors: null,
        file,
      };
    });
  },
  [MutationTypes.UPLOAD_FILE_START](state: State, payload: { key: AttachmentKey; file: File }) {
    state.uploadFile[payload.key] = state.uploadFile[payload.key].map((queuedFile) => {
      if (queuedFile.file === payload.file) {
        return {
          ...queuedFile,
          uploading: true,
        };
      }
      return queuedFile;
    });
  },
  [MutationTypes.UPLOAD_FILE_COMPLETE](
    state: State,
    payload: { key: AttachmentKey; file: File; response: UserUpload }
  ) {
    state.uploadFile[payload.key] = state.uploadFile[payload.key].map((queuedFile) => {
      if (queuedFile.file === payload.file) {
        return {
          ...queuedFile,
          uploading: false,
          success: !!payload.response.success,
          errors: errorCodeMapper(payload.response.errors),
        };
      }
      return queuedFile;
    });
  },
  [MutationTypes.UPLOADED_FILES_LOADING](state: State, payload: { key: AttachmentKey }) {
    if (!state.attachments[payload.key]) {
      state.attachments[payload.key] = { loading: true, deleting: false, data: [] };
    } else {
      state.attachments[payload.key].loading = true;
    }
  },
  [MutationTypes.UPLOADED_FILES_LOADED](
    state: State,
    payload: { key: AttachmentKey; data: Attachment[] }
  ) {
    state.attachments[payload.key].loading = false;
    state.attachments[payload.key].data = payload.data;
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
