import { AttachmentType, UploadConfiguration } from "api";

export type State = {
  uploadConfigurations: {
    loading: boolean;
    data: UploadConfiguration[];
  };
  uploadFile: {
    loading: boolean;
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
  uploadFile: {
    loading: false,
  },
  attachments: {},
};
