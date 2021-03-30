import type {
  Attachment,
  Benefit,
  Branch,
  Company,
  Expectation,
  JobOption,
  JobPosition,
  Language,
  LanguageLevel,
  Skill,
  SoftSkill,
} from "api";

export type State = {
  jobOptions: {
    loading: boolean;
    data: JobOption[];
  };
  jobPositions: {
    loading: boolean;
    data: JobPosition[];
  };
  benefits: {
    loading: boolean;
    data: Benefit[];
  };
  company: {
    loading: boolean;
    data: Company | null;
    logo: Attachment | null;
    media: Attachment[];
  };
  skills: {
    loading: boolean;
    data: Skill[];
  };
  softSkills: {
    loading: boolean;
    data: SoftSkill[];
  };
  languages: {
    loading: boolean;
    data: Language[];
    levels: LanguageLevel[];
  };
  branches: {
    loading: boolean;
    data: Branch[];
  };
  expectations: {
    loading: boolean;
    data: Expectation[];
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
  company: {
    loading: false,
    data: null,
    logo: null,
    media: [],
  },
  skills: {
    loading: false,
    data: [],
  },
  softSkills: {
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
