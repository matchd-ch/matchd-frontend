import { MatchdApiError } from "@/models/MatchdApiError";
import { ZipCityType } from "api";

export type State = {
  profile: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
    nickNameSuggestions: string[];
  };
  zipCity: {
    loading: boolean;
    data: ZipCityType[];
  };
};

export const state: State = {
  profile: {
    loading: false,
    success: false,
    errors: null,
    nickNameSuggestions: [],
  },
  zipCity: {
    loading: false,
    data: [],
  },
};
