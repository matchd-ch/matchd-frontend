import type { ZipCity } from "@/api/models/types";
import type { MatchdApiError } from "@/models/MatchdApiError";

export type State = {
  profile: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
    nicknameSuggestions: string[];
  };
  updateStudent: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
  updateUser: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
  deleteUser: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
  passwordChange: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
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
  updateStudent: {
    loading: false,
    success: false,
    errors: null,
  },
  updateUser: {
    loading: false,
    success: false,
    errors: null,
  },
  deleteUser: {
    loading: false,
    success: false,
    errors: null,
  },
  passwordChange: {
    loading: false,
    success: false,
    errors: null,
  },
  zipCity: {
    loading: false,
    data: [],
  },
};
