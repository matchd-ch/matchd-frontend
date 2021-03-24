import { MatchdApiError } from "@/models/MatchdApiError";
import { ZipCity } from "api";

export type State = {
  profile: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
    nicknameSuggestions: string[];
  };
  zipCity: {
    loading: boolean;
    data: ZipCity[];
  };
};

export const state: State = {
  profile: {
    loading: false,
    success: false,
    errors: null,
    nicknameSuggestions: [],
  },
  zipCity: {
    loading: false,
    data: [],
  },
};
