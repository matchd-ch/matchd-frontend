import {
  BenefitType,
  BranchType,
  ExpectationType,
  JobOptionType,
  JobPositionType,
  LanguageType,
  LevelType,
  SkillType,
} from "api";

export type State = {
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
  branches: {
    loading: boolean;
    data: BranchType[];
  };
  expectations: {
    loading: boolean;
    data: ExpectationType[];
  };
};

export const state: State = {
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
  branches: {
    loading: false,
    data: [],
  },
  expectations: {
    loading: false,
    data: [],
  },
};
