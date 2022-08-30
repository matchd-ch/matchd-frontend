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
} from "@/api/models/types";
import {
  ChallengeChallengeFragment,
  ChallengeDocumentFragment,
  ChallengeImageFallbackFragment,
  ChallengeImageFragment,
} from "@/api/queries/challengeFragment.generated";
import { ChallengesChallengeFragment } from "@/api/queries/challengesFragment.generated";
import { ChallengeTypesChallengeTypeFragment } from "@/api/queries/challengeTypesFragment.generated";
import { JobPostingJobPostingFragment } from "@/api/queries/jobPostingFragment.generated";
import { JobPostingsJobPostingFragment } from "@/api/queries/jobPostingsFragment.generated";
import { KeywordsKeywordFragment } from "@/api/queries/keywordsFragment.generated";
import { MatchingQuery } from "@/api/queries/matching.generated";
import {
  StudentAvatarFallbackFragment,
  StudentAvatarFragment,
  StudentCertificatesFragment,
  StudentStudentFragment,
} from "@/api/queries/studentFragment.generated";
import { ZipCityZipCityFragment } from "@/api/queries/zipCityFragment.generated";

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
    zipCityJobs: ZipCityZipCityFragment[];
  };
  challenge: {
    loading: boolean;
    data: ChallengeChallengeFragment | null;
    images: ChallengeImageFragment[];
    imageFallback: ChallengeImageFallbackFragment | null;
    documents: ChallengeDocumentFragment[];
  };
  challenges: {
    loading: boolean;
    data: ChallengesChallengeFragment[];
  };
  challengeTypes: {
    loading: boolean;
    data: ChallengeTypesChallengeTypeFragment[];
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
  challenge: {
    loading: false,
    data: null,
    images: [],
    imageFallback: null,
    documents: [],
  },
  challenges: {
    loading: false,
    data: [],
  },
  challengeTypes: {
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
};
