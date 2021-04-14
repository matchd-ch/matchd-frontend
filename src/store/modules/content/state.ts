import type {
  Attachment,
  Benefit,
  Branch,
  Company,
  CulturalFit,
  JobPosting,
  JobRequirement,
  JobType,
  Language,
  LanguageLevel,
  Match,
  Skill,
  SoftSkill,
  Student,
  ZipCity,
} from "api";

export type State = {
  jobTypes: {
    loading: boolean;
    data: JobType[];
  };
  branches: {
    loading: boolean;
    data: Branch[];
  };
  benefits: {
    loading: boolean;
    data: Benefit[];
  };
  culturalFits: {
    loading: boolean;
    data: CulturalFit[];
  };
  company: {
    loading: boolean;
    data: Company | null;
    logo: Attachment | null;
    media: Attachment[];
  };
  matches: {
    loading: boolean;
    data: Match[];
    zipCityJobsLoading: boolean;
    zipCityJobs: ZipCity[];
  };
  skills: {
    loading: boolean;
    data: Skill[];
  };
  softSkills: {
    loading: boolean;
    data: SoftSkill[];
  };
  student: {
    // FIXME: add generated types
    loading: boolean;
    data: Partial<Student> | null;
  };
  languages: {
    loading: boolean;
    data: Language[];
    levels: LanguageLevel[];
  };
  jobRequirements: {
    loading: boolean;
    data: JobRequirement[];
  };
  jobPostings: {
    loading: boolean;
    data: JobPosting[];
  };
};

export const state: State = {
  jobTypes: {
    loading: false,
    data: [],
  },
  branches: {
    loading: false,
    data: [],
  },
  benefits: {
    loading: false,
    data: [],
  },
  culturalFits: {
    loading: false,
    data: [],
  },
  company: {
    loading: false,
    data: null,
    logo: null,
    media: [],
  },
  matches: {
    loading: false,
    data: [],
    zipCityJobsLoading: false,
    zipCityJobs: [],
  },
  skills: {
    loading: false,
    data: [],
  },
  softSkills: {
    loading: false,
    data: [],
  },
  student: {
    loading: false,
    data: null,
  },
  languages: {
    loading: false,
    data: [],
    levels: [],
  },
  jobRequirements: {
    loading: false,
    data: [],
  },
  jobPostings: {
    loading: false,
    data: [],
  },
};
