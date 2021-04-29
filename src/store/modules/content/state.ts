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
    logoFallback: Attachment | null;
    media: Attachment[];
  };
  match: {
    loading: boolean;
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
    loading: boolean;
    data: Student | null;
    avatar: Attachment | null;
    avatarFallback: Attachment | null;
    certificates: Attachment[];
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
  jobPosting: {
    loading: boolean;
    data: JobPosting | null;
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
    logoFallback: null,
    media: [],
  },
  match: {
    loading: false,
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
    avatar: null,
    avatarFallback: null,
    certificates: [],
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
  jobPosting: {
    loading: false,
    data: null,
  },
};
