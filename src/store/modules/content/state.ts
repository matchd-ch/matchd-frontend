import type {
  Attachment,
  Benefit,
  Branch,
  Company,
  CulturalFit,
  Dashboard,
  JobPosting,
  JobRequirement,
  JobType,
  Keyword,
  Language,
  LanguageLevel,
  Match,
  ProjectPosting,
  ProjectType,
  Skill,
  SoftSkill,
  Student,
  Topic,
  ZipCity,
} from "api";

export type State = {
  dashboard: {
    loading: boolean;
    data: Dashboard | null;
  };
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
  companyMatching: {
    data: Match[];
    loading: boolean;
  };
  keywords: {
    data: Keyword[];
    loading: boolean;
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
  projectPosting: {
    loading: boolean;
    data: ProjectPosting | null;
  };
  projectPostings: {
    loading: boolean;
    data: ProjectPosting[];
  };
  projectTypes: {
    loading: boolean;
    data: ProjectType[];
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
  topics: {
    loading: boolean;
    data: Topic[];
  };
};

export const state: State = {
  dashboard: {
    loading: false,
    data: null,
  },
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
  companyMatching: {
    loading: false,
    data: [],
  },
  keywords: {
    loading: false,
    data: [],
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
  projectPosting: {
    loading: false,
    data: null,
  },
  projectPostings: {
    loading: false,
    data: [],
  },
  projectTypes: {
    loading: false,
    data: [],
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
  topics: {
    loading: false,
    data: [],
  },
};
