import type { Attachment, UploadConfiguration } from "@/api/models/types";
import { type MatchdApiError } from "@/models/MatchdApiError";

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
      data: Attachment[];
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
