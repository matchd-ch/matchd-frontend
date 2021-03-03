import { MatchdApiError } from "@/models/MatchdApiError";
import {
  BenefitType,
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
  benefits: {
    loading: boolean;
    data: BenefitType[];
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
  benefits: {
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
};
