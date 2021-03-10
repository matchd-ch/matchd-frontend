import { MatchdApiError } from "@/models/MatchdApiError";

export type State = {
  jobPosting: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
    id: string;
  };
};

export const state: State = {
  jobPosting: {
    loading: false,
    success: false,
    errors: null,
    id: "",
  },
};
