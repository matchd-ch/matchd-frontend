import type { ZipCity } from "@/api/models/types";
import { MatchdApiError } from "@/models/MatchdApiError";

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
