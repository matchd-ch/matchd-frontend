import type {
  Attachment,
  Company,
  Dashboard,
  MatchChallengePayload,
  MatchJobPostingPayload,
  MatchStudentPayload,
} from "@/api/models/types";
import { ProfileType } from "@/api/models/types";
import { BenefitsQuery } from "@/api/queries/benefits.generated";
import { BranchesQuery } from "@/api/queries/branches.generated";
import { ChallengeQuery } from "@/api/queries/challenge.generated";
import { ChallengesQuery } from "@/api/queries/challenges.generated";
import { ChallengeTypesQuery } from "@/api/queries/challengeTypes.generated";
import { CompanyQuery } from "@/api/queries/company.generated";
import { CompanyMatchingQuery } from "@/api/queries/companyMatching.generated";
import { CulturalFitsQuery } from "@/api/queries/culturalFits.generated";
import { JobPostingQuery } from "@/api/queries/jobPosting.generated";
import { JobPostingsQuery } from "@/api/queries/jobPostings.generated";
import { JobRequirementsQuery } from "@/api/queries/jobRequirements.generated";
import { JobTypesQuery } from "@/api/queries/jobTypes.generated";
import { KeywordsQuery } from "@/api/queries/keywords.generated";
import { LanguageLevelsQuery } from "@/api/queries/languageLevels.generated";
import { LanguagesQuery } from "@/api/queries/languages.generated";
import { MatchingQuery } from "@/api/queries/matching.generated";
import { SkillsQuery } from "@/api/queries/skills.generated";
import { SoftSkillsQuery } from "@/api/queries/softSkills.generated";
import { StudentQuery } from "@/api/queries/student.generated";
import { ZipCityJobsQuery } from "@/api/queries/zipCityJobs.generated";
import { ensureNoNullsAndUndefineds } from "@/helpers/typeHelpers";
import { State } from "@/store/modules/content/state";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

export type Mutations<S = State> = {
  [MutationTypes.BENEFITS_LOADING](state: S): void;
  [MutationTypes.BENEFITS_LOADED](state: S, payload: BenefitsQuery): void;
  [MutationTypes.BRANCHES_LOADING](state: S): void;
  [MutationTypes.BRANCHES_LOADED](state: S, payload: BranchesQuery): void;
  [MutationTypes.COMPANY_LOADING](state: S): void;
  [MutationTypes.COMPANY_LOADED](state: S, payload: CompanyQuery): void;
  [MutationTypes.COMPANY_MATCHING_LOADING](state: S): void;
  [MutationTypes.COMPANY_MATCHING_LOADED](state: S, payload: CompanyMatchingQuery): void;
  [MutationTypes.CULTURAL_FITS_LOADING](state: S): void;
  [MutationTypes.CULTURAL_FITS_LOADED](state: S, payload: CulturalFitsQuery): void;
  [MutationTypes.DASHBOARD_LOADING](state: S): void;
  [MutationTypes.DASHBOARD_LOADED](state: S, payload: { dashboard: Dashboard | null }): void;
  [MutationTypes.JOB_POSTING_LOADING](state: S): void;
  [MutationTypes.JOB_POSTING_LOADED](state: S, payload: JobPostingQuery): void;
  [MutationTypes.JOB_POSTINGS_LOADING](state: S): void;
  [MutationTypes.JOB_POSTINGS_LOADED](state: S, payload: JobPostingsQuery): void;
  [MutationTypes.JOB_REQUIREMENTS_LOADING](state: S): void;
  [MutationTypes.JOB_REQUIREMENTS_LOADED](state: S, payload: JobRequirementsQuery): void;
  [MutationTypes.JOB_TYPES_LOADING](state: S): void;
  [MutationTypes.JOB_TYPES_LOADED](state: S, payload: JobTypesQuery): void;
  [MutationTypes.KEYWORDS_LOADING](state: S): void;
  [MutationTypes.KEYWORDS_LOADED](state: S, payload: KeywordsQuery): void;
  [MutationTypes.LANGUAGES_LOADING](state: S): void;
  [MutationTypes.LANGUAGES_LOADED](state: S, payload: LanguagesQuery): void;
  [MutationTypes.LANGUAGE_LEVELS_LOADING](state: S): void;
  [MutationTypes.LANGUAGE_LEVELS_LOADED](state: S, payload: LanguageLevelsQuery): void;
  [MutationTypes.MATCH_LOADING](state: S): void;
  [MutationTypes.MATCH_JOB_POSTING_LOADED](
    state: S,
    payload: { id: string; match: MatchJobPostingPayload }
  ): void;
  [MutationTypes.MATCH_CHALLENGE_LOADED](
    state: S,
    payload: { id: string; match: MatchChallengePayload }
  ): void;
  [MutationTypes.MATCH_STUDENT_LOADED](
    state: S,
    payload: { id: string; match: MatchStudentPayload }
  ): void;
  [MutationTypes.MATCHES_LOADING](state: S): void;
  [MutationTypes.MATCHES_LOADED](state: S, payload: MatchingQuery["matches"]): void;
  [MutationTypes.CHALLENGE_LOADING](state: S): void;
  [MutationTypes.CHALLENGE_LOADED](state: S, payload: ChallengeQuery): void;
  [MutationTypes.CHALLENGES_LOADING](state: S): void;
  [MutationTypes.CHALLENGES_LOADED](state: S, payload: ChallengesQuery): void;
  [MutationTypes.CHALLENGE_TYPES_LOADING](state: S): void;
  [MutationTypes.CHALLENGE_TYPES_LOADED](state: S, payload: ChallengeTypesQuery): void;
  [MutationTypes.RESET_MATCHES](state: S): void;
  [MutationTypes.SKILLS_LOADING](state: S): void;
  [MutationTypes.SKILLS_LOADED](state: S, payload: SkillsQuery): void;
  [MutationTypes.SOFT_SKILLS_LOADING](state: S): void;
  [MutationTypes.SOFT_SKILLS_LOADED](state: S, payload: SoftSkillsQuery): void;
  [MutationTypes.STUDENT_LOADING](state: S): void;
  [MutationTypes.STUDENT_LOADED](state: S, payload: StudentQuery): void;
  [MutationTypes.ZIP_CITY_JOBS_LOADING](state: S): void;
  [MutationTypes.ZIP_CITY_JOBS_LOADED](state: S, payload: ZipCityJobsQuery): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.BENEFITS_LOADING](state: State) {
    state.benefits.loading = true;
  },
  [MutationTypes.BENEFITS_LOADED](state: State, payload: BenefitsQuery) {
    state.benefits.loading = false;
    state.benefits.data = ensureNoNullsAndUndefineds(
      payload.benefits?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.BRANCHES_LOADING](state: State) {
    state.branches.loading = true;
  },
  [MutationTypes.BRANCHES_LOADED](state: State, payload: BranchesQuery) {
    state.branches.loading = false;
    state.branches.data = ensureNoNullsAndUndefineds(
      payload.branches?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.COMPANY_LOADING](state: State) {
    state.company.loading = true;
    state.company.data = null;
    state.company.logo = null;
    state.company.media = [];
  },
  [MutationTypes.COMPANY_LOADED](state: State, payload: CompanyQuery) {
    state.company.loading = false;
    state.company.data = payload.company as Company;
    if (payload.logo?.edges.length ?? false) {
      state.company.logo = payload.logo?.edges[0]?.node ?? null;
    }
    if (payload.logoFallback?.edges.length ?? false) {
      state.company.logoFallback = payload.logoFallback?.edges[0]?.node ?? null;
    }
    state.company.media = ensureNoNullsAndUndefineds(
      payload.media?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.COMPANY_MATCHING_LOADING](state: State) {
    state.companyMatching.loading = true;
    state.companyMatching.data = [];
  },
  [MutationTypes.COMPANY_MATCHING_LOADED](state: State, payload: CompanyMatchingQuery) {
    state.companyMatching.loading = false;
    state.companyMatching.data = ensureNoNullsAndUndefineds(payload.matches ?? []);
  },
  [MutationTypes.CULTURAL_FITS_LOADING](state: State) {
    state.culturalFits.loading = true;
  },
  [MutationTypes.CULTURAL_FITS_LOADED](state: State, payload: CulturalFitsQuery) {
    state.culturalFits.loading = false;
    state.culturalFits.data = ensureNoNullsAndUndefineds(
      payload.culturalFits?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.DASHBOARD_LOADING](state: State) {
    state.culturalFits.loading = true;
  },
  [MutationTypes.DASHBOARD_LOADED](
    state: State,
    payload: { dashboard: Dashboard; avatar: Attachment[] | null }
  ) {
    state.dashboard.loading = false;
    state.dashboard.data = payload.dashboard;
  },
  [MutationTypes.JOB_POSTING_LOADING](state: State) {
    state.jobPosting.loading = true;
    state.jobPosting.data = null;
  },
  [MutationTypes.JOB_POSTING_LOADED](state: State, payload: JobPostingQuery) {
    state.jobPosting.loading = false;
    state.jobPosting.data = payload.jobPosting ?? null;
  },
  [MutationTypes.JOB_POSTINGS_LOADING](state: State) {
    state.jobPostings.loading = true;
  },
  [MutationTypes.JOB_POSTINGS_LOADED](state: State, payload: JobPostingsQuery) {
    state.jobPostings.loading = false;
    state.jobPostings.data = ensureNoNullsAndUndefineds(
      payload.jobPostings?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.JOB_REQUIREMENTS_LOADING](state: State) {
    state.jobRequirements.loading = true;
  },
  [MutationTypes.JOB_REQUIREMENTS_LOADED](state: State, payload: JobRequirementsQuery) {
    state.jobRequirements.loading = false;
    state.jobRequirements.data = ensureNoNullsAndUndefineds(
      payload.jobRequirements?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.JOB_TYPES_LOADING](state: State) {
    state.jobTypes.loading = true;
  },
  [MutationTypes.JOB_TYPES_LOADED](state: State, payload: JobTypesQuery) {
    state.jobTypes.loading = false;
    state.jobTypes.data = ensureNoNullsAndUndefineds(
      payload.jobTypes?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.LANGUAGES_LOADING](state: State) {
    state.languages.loading = true;
  },
  [MutationTypes.LANGUAGES_LOADED](state: State, payload: LanguagesQuery) {
    state.languages.loading = false;
    state.languages.data = ensureNoNullsAndUndefineds(
      payload.languages?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.LANGUAGE_LEVELS_LOADING](state: State) {
    state.languages.loading = true;
  },
  [MutationTypes.LANGUAGE_LEVELS_LOADED](state: State, payload: LanguageLevelsQuery) {
    state.languages.loading = false;
    state.languages.levels = ensureNoNullsAndUndefineds(
      payload.languageLevels?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.KEYWORDS_LOADING](state: State) {
    state.keywords.loading = true;
  },
  [MutationTypes.KEYWORDS_LOADED](state: State, payload: KeywordsQuery) {
    state.keywords.loading = false;
    state.keywords.data = ensureNoNullsAndUndefineds(
      payload.keywords?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.MATCH_LOADING](state: State) {
    state.match.loading = true;
  },
  [MutationTypes.MATCH_JOB_POSTING_LOADED](
    state: State,
    payload: { id: string; match: MatchJobPostingPayload }
  ) {
    state.match.loading = false;
    if (state.jobPosting.data?.id === payload.id) {
      state.jobPosting.data = {
        ...state.jobPosting.data,
        matchStatus: {
          ...state.jobPosting.data.matchStatus,
          initiator: ProfileType.Student,
          confirmed: payload.match.confirmed,
        },
      };
    }
  },
  [MutationTypes.MATCH_CHALLENGE_LOADED](
    state: State,
    payload: { id: string; match: MatchChallengePayload }
  ) {
    state.match.loading = false;
    if (state.challenge.data?.id === payload.id) {
      state.challenge.data = {
        ...state.challenge.data,
        matchStatus: {
          ...state.challenge.data.matchStatus,
          initiator: ProfileType.Student,
          confirmed: payload.match.confirmed,
        },
      };
    }
  },
  [MutationTypes.MATCH_STUDENT_LOADED](
    state: State,
    payload: { id: string; match: MatchStudentPayload }
  ) {
    state.match.loading = false;
    if (state.student.data?.id === payload.id) {
      state.student.data = {
        ...state.student.data,
        matchStatus: {
          initiator: ProfileType.Company,
          confirmed: payload.match.confirmed,
        },
      };
    }
  },
  [MutationTypes.MATCHES_LOADING](state: State) {
    state.matches.loading = true;
  },
  [MutationTypes.MATCHES_LOADED](state: State, payload: MatchingQuery["matches"]) {
    state.matches.loading = false;
    state.matches.data = ensureNoNullsAndUndefineds(payload?.filter((match) => match) ?? []);
  },
  [MutationTypes.CHALLENGE_LOADING](state: State) {
    state.challenge.loading = true;
    state.challenge.data = null;
    state.challenge.images = [];
    state.challenge.documents = [];
    state.challenge.imageFallback = null;
  },
  [MutationTypes.CHALLENGE_LOADED](state: State, payload: ChallengeQuery) {
    state.challenge.loading = false;
    state.challenge.data = payload.challenge || null;
    state.challenge.images = ensureNoNullsAndUndefineds(
      payload.images?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
    state.challenge.imageFallback = payload.imageFallback?.edges[0]?.node || null;
    state.challenge.documents = ensureNoNullsAndUndefineds(
      payload.documents?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.CHALLENGES_LOADING](state: State) {
    state.challenges.loading = true;
  },
  [MutationTypes.CHALLENGES_LOADED](state: State, payload: ChallengesQuery) {
    state.challenges.loading = false;
    state.challenges.data = ensureNoNullsAndUndefineds(
      payload.challenges?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.CHALLENGE_TYPES_LOADING](state: State) {
    state.challengeTypes.loading = true;
  },
  [MutationTypes.CHALLENGE_TYPES_LOADED](state: State, payload: ChallengeTypesQuery) {
    state.challengeTypes.loading = false;
    state.challengeTypes.data = ensureNoNullsAndUndefineds(
      payload.challengeTypes?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.RESET_MATCHES](state: State) {
    state.matches.data = [];
  },
  [MutationTypes.SKILLS_LOADING](state: State) {
    state.skills.loading = true;
  },
  [MutationTypes.SKILLS_LOADED](state: State, payload: SkillsQuery) {
    state.skills.loading = false;
    state.skills.data = ensureNoNullsAndUndefineds(
      payload.skills?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.SOFT_SKILLS_LOADING](state: State) {
    state.softSkills.loading = true;
  },
  [MutationTypes.SOFT_SKILLS_LOADED](state: State, payload: SoftSkillsQuery) {
    state.softSkills.loading = false;
    state.softSkills.data = ensureNoNullsAndUndefineds(
      payload.softSkills?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
    );
  },
  [MutationTypes.STUDENT_LOADING](state: State) {
    state.student.loading = true;
    state.student.data = null;
    state.student.avatar = null;
    state.student.avatarFallback = null;
    state.student.certificates = [];
  },
  [MutationTypes.STUDENT_LOADED](state: State, payload: StudentQuery) {
    state.student = {
      loading: false,
      data: payload.student ?? null,
      avatar: payload.avatar?.edges.filter((edge) => edge?.node)[0]?.node ?? null,
      avatarFallback: payload.avatarFallback?.edges.filter((edge) => edge?.node)[0]?.node ?? null,
      certificates: ensureNoNullsAndUndefineds(
        payload.certificates?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) ?? []
      ),
    };
  },
  [MutationTypes.ZIP_CITY_JOBS_LOADING](state: State) {
    state.matches.zipCityJobsLoading = true;
  },
  [MutationTypes.ZIP_CITY_JOBS_LOADED](state: State, payload: ZipCityJobsQuery) {
    state.matches.zipCityJobsLoading = false;
    state.matches.zipCityJobs = payload.zipCityJobs;
  },
};
