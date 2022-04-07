import type {
  Attachment,
  Benefit,
  Branch,
  Company,
  CulturalFit,
  Dashboard,
  JobRequirement,
  JobType,
  Language,
  LanguageLevel,
  Match,
  Skill,
  SoftSkill,
  ZipCity,
} from "@/api/models/types";
import { JobPostingJobPostingFragment } from "@/api/queries/jobPostingFragment.generated";
import { JobPostingsJobPostingFragment } from "@/api/queries/jobPostingsFragment.generated";
import { KeywordsKeywordFragment } from "@/api/queries/keywordsFragment.generated";
import { MatchingQuery } from "@/api/queries/matching.generated";
import {
  ProjectPostingDocumentFragment,
  ProjectPostingImageFallbackFragment,
  ProjectPostingImageFragment,
  ProjectPostingProjectPostingFragment,
} from "@/api/queries/projectPostingFragment.generated";
import { ProjectPostingsProjectPostingFragment } from "@/api/queries/projectPostingsFragment.generated";
import { ProjectTypesProjectTypeFragment } from "@/api/queries/projectTypesFragment.generated";
import {
  StudentAvatarFallbackFragment,
  StudentAvatarFragment,
  StudentCertificatesFragment,
  StudentStudentFragment,
} from "@/api/queries/studentFragment.generated";
import { TopicsTopicFragment } from "@/api/queries/topicsFragment.generated";

export type CompanyAttachment = Pick<Attachment, "id" | "mimeType" | "url">;

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
    logo: CompanyAttachment | null;
    logoFallback: CompanyAttachment | null;
    media: CompanyAttachment[];
  };
  companyMatching: {
    data: Match[];
    loading: boolean;
  };
  keywords: {
    data: KeywordsKeywordFragment[];
    loading: boolean;
  };
  match: {
    loading: boolean;
  };
  matches: {
    loading: boolean;
    data: NonNullable<NonNullable<MatchingQuery["matches"]>[0]>[];
    zipCityJobsLoading: boolean;
    zipCityJobs: ZipCity[];
  };
  projectPosting: {
    loading: boolean;
    data: ProjectPostingProjectPostingFragment | null;
    images: ProjectPostingImageFragment[];
    imageFallback: ProjectPostingImageFallbackFragment | null;
    documents: ProjectPostingDocumentFragment[];
  };
  projectPostings: {
    loading: boolean;
    data: ProjectPostingsProjectPostingFragment[];
  };
  projectTypes: {
    loading: boolean;
    data: ProjectTypesProjectTypeFragment[];
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
    data: StudentStudentFragment | null;
    avatar: StudentAvatarFragment | null;
    avatarFallback: StudentAvatarFallbackFragment | null;
    certificates: StudentCertificatesFragment[];
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
    data: JobPostingsJobPostingFragment[];
  };
  jobPosting: {
    loading: boolean;
    data: JobPostingJobPostingFragment | null;
  };
  topics: {
    loading: boolean;
    data: TopicsTopicFragment[];
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
    images: [],
    imageFallback: null,
    documents: [],
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
