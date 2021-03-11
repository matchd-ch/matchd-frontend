import { MatchdApiError } from "@/models/MatchdApiError";
import { JobPostingType } from "api";

export type State = {
  jobPosting: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
    id: string;
  };
  currentJobPosting: JobPostingType | null;
};

export const state: State = {
  jobPosting: {
    loading: false,
    success: false,
    errors: null,
    id: "",
  },
  currentJobPosting: null,
};
