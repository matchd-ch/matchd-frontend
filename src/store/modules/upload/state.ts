import { MatchdApiError } from "@/models/MatchdApiError";
import { AttachmentType, UploadConfiguration } from "api";

export interface QueuedFile {
  file: File;
  uploading: boolean;
  success: boolean;
  errors: MatchdApiError | null;
}

export type State = {
  uploadConfigurations: {
    loading: boolean;
    data: UploadConfiguration[];
  };
  uploadFile: {
    [k: string]: QueuedFile[];
  };
  attachments: {
    [k: string]: {
      loading: boolean;
      deleting: boolean;
      data: AttachmentType[];
    };
  };
};

export const state: State = {
  uploadConfigurations: {
    loading: false,
    data: [],
  },
  uploadFile: {},
  attachments: {},
};
