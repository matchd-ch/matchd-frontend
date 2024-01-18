import type { Attachment, AttachmentKey, UploadConfiguration } from "@/api/models/types";
import type { RootState } from "@/store";
import type { GetterTree } from "vuex";
import type { QueuedFile, State } from "./state";

export type Getters = {
  uploadQueueByKey(state: State): (payload: { key: AttachmentKey }) => QueuedFile[];
  uploadConfigurationByKey(
    state: State
  ): (payload: { key: AttachmentKey }) => UploadConfiguration | undefined;
  attachmentsByKey(state: State): (payload: { key: AttachmentKey }) => Attachment[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  uploadQueueByKey: (state: State) => (payload: { key: AttachmentKey }) => {
    return state.uploadFile[payload.key]?.filter((queuedFile) => !queuedFile.success) || [];
  },
  uploadConfigurationByKey: (state: State) => (payload: { key: AttachmentKey }) => {
    return state.uploadConfigurations.data.find((Attachment) => Attachment.key === payload.key);
  },
  attachmentsByKey: (state: State) => (payload: { key: AttachmentKey }) => {
    return state.attachments[payload.key]?.data ?? [];
  },
};
