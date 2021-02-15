import { MatchdApiError } from "@/models/MatchdApiError";
import {
  HobbyType,
  JobOptionType,
  JobPositionType,
  LanguageType,
  LevelType,
  SkillType,
  ZipCityType,
} from "api";

export type State = {
  profile: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
    nicknameSuggestions: string[];
  };
  zipCity: {
    loading: boolean;
    data: ZipCityType[];
  };
  jobOptions: {
    loading: boolean;
    data: JobOptionType[];
  };
  jobPositions: {
    loading: boolean;
    data: JobPositionType[];
  };
  skills: {
    loading: boolean;
    data: SkillType[];
  };
  languages: {
    loading: boolean;
    data: LanguageType[];
    levels: LevelType[];
  };
  hobby: {
    loading: boolean;
    data: HobbyType[];
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
  jobOptions: {
    loading: false,
    data: [],
  },
  jobPositions: {
    loading: false,
    data: [],
  },
  skills: {
    loading: false,
    data: [],
  },
  languages: {
    loading: false,
    data: [],
    levels: [],
  },
  hobby: {
    loading: false,
    data: [],
  },
};
