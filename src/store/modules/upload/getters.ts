import { AttachmentKey } from "@/api/models/types";
import { RootState } from "@/store";
import { Attachment, UploadConfiguration } from "api";
import { GetterTree } from "vuex";
import { QueuedFile, State } from "./state";

export type Getters = {
  uploadQueueByKey(state: State): (payload: { key: AttachmentKey }) => QueuedFile[];
  uploadConfigurationByKey(
    state: State
  ): (payload: { key: AttachmentKey }) => UploadConfiguration | undefined;
  attachmentsByKey(state: State): (payload: { key: AttachmentKey }) => Attachment[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  uploadQueueByKey: (state: State) => (payload: { key: AttachmentKey }) => {
    return state.uploadFile[payload.key]?.filter(queuedFile => !queuedFile.success) || [];
  },
  uploadConfigurationByKey: (state: State) => (payload: { key: AttachmentKey }) => {
    return state.uploadConfigurations.data.find(Attachment => Attachment.key === payload.key);
  },
  attachmentsByKey: (state: State) => (payload: { key: AttachmentKey }) => {
    return state.attachments[payload.key]?.data || [];
  },
};
