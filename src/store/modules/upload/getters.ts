import { AttachmentKey } from "@/api/models/types";
import { RootState } from "@/store";
import { AttachmentType, UploadConfiguration } from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  uploadConfigurationByKey(
    state: State
  ): (payload: { key: AttachmentKey }) => UploadConfiguration | undefined;
  attachmentsByKey(state: State): (payload: { key: AttachmentKey }) => AttachmentType[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  uploadConfigurationByKey: (state: State) => (payload: { key: AttachmentKey }) => {
    return state.uploadConfigurations.data.find(
      attachmentType => attachmentType.key === payload.key
    );
  },
  attachmentsByKey: (state: State) => (payload: { key: AttachmentKey }) => {
    return state.attachments[payload.key]?.data || [];
  },
};
