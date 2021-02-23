import { MatchdApiError } from "@/models/MatchdApiError";
import {
  JobOptionType,
  JobPositionType,
  LanguageType,
  LevelType,
  SkillType,
  UploadConfiguration,
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
  uploadConfigurations: {
    loading: boolean;
    data: UploadConfiguration[];
  };
  uploadFile: {
    loading: boolean;
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
  uploadConfigurations: {
    loading: false,
    data: [],
  },
  uploadFile: {
    loading: false,
  },
};
