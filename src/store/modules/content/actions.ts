import { createApolloClient } from "@/api/apollo-client";
import type {
  MatchChallengeInput,
  MatchJobPostingInput,
  MatchStudentInput,
} from "@/api/models/types";
import { MatchChallengeDocument } from "@/api/mutations/matchChallenge.generated";
import { MatchJobPostingDocument } from "@/api/mutations/matchJobPosting.generated";
import { MatchStudentDocument } from "@/api/mutations/matchStudent.generated";
import { BenefitsDocument } from "@/api/queries/benefits.generated";
import { BranchesDocument } from "@/api/queries/branches.generated";
import { ChallengeDocument } from "@/api/queries/challenge.generated";
import { ChallengePublicDocument } from "@/api/queries/challengePublic.generated";
import type { ChallengesQueryVariables } from "@/api/queries/challenges.generated";
import { ChallengesDocument } from "@/api/queries/challenges.generated";
import { ChallengeTypesDocument } from "@/api/queries/challengeTypes.generated";
import { CompanyDocument } from "@/api/queries/company.generated";
import { CompanyMatchingDocument } from "@/api/queries/companyMatching.generated";
import { CulturalFitsDocument } from "@/api/queries/culturalFits.generated";
import dashboardQuery from "@/api/queries/dashboard.gql";
import { JobPostingDocument } from "@/api/queries/jobPosting.generated";
import { JobPostingsDocument } from "@/api/queries/jobPostings.generated";
import { JobRequirementsDocument } from "@/api/queries/jobRequirements.generated";
import { JobTypesDocument } from "@/api/queries/jobTypes.generated";
import { KeywordsDocument } from "@/api/queries/keywords.generated";
import { LanguageLevelsDocument } from "@/api/queries/languageLevels.generated";
import { LanguagesDocument } from "@/api/queries/languages.generated";
import { MatchingDocument } from "@/api/queries/matching.generated";
import { SkillsDocument } from "@/api/queries/skills.generated";
import { SoftSkillsDocument } from "@/api/queries/softSkills.generated";
import { StudentDocument } from "@/api/queries/student.generated";
import { ZipCityJobsDocument } from "@/api/queries/zipCityJobs.generated";
import type { MatchingInput } from "@/models/MatchingInput";
import type { ZipCityJobsInput } from "@/models/ZipCityJobsInput";
import type { RootState } from "@/store";
import { MutationTypes } from "@/store/modules/content/mutation-types";
import type { Mutations } from "@/store/modules/content/mutations";
import type { State } from "@/store/modules/content/state";
import type { ActionContext, ActionTree } from "vuex";
import { config } from "./../../../config";
import { ActionTypes } from "./action-types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

const apiClient = createApolloClient(config.API_URL);

export interface Actions {
  [ActionTypes.BENEFITS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.BRANCHES]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.COMPANY](
    { commit }: AugmentedActionContext,
    payload: { slug: string }
  ): Promise<void>;
  [ActionTypes.COMPANY_MATCHING]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.CULTURAL_FITS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.DASHBOARD]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.JOB_POSTING](
    { commit }: AugmentedActionContext,
    payload: { slug: string }
  ): Promise<void>;
  [ActionTypes.JOB_POSTINGS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.JOB_REQUIREMENTS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.JOB_TYPE]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.LANGUAGES](
    { commit }: AugmentedActionContext,
    payload: { shortList: boolean }
  ): Promise<void>;
  [ActionTypes.LANGUAGE_LEVELS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.KEYWORDS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.MATCH_JOB_POSTING](
    { commit }: AugmentedActionContext,
    payload: MatchJobPostingInput
  ): Promise<void>;
  [ActionTypes.MATCH_CHALLENGE](
    { commit }: AugmentedActionContext,
    payload: MatchChallengeInput
  ): Promise<void>;
  [ActionTypes.MATCH_STUDENT](
    { commit }: AugmentedActionContext,
    payload: MatchStudentInput
  ): Promise<void>;
  [ActionTypes.MATCHING]({ commit }: AugmentedActionContext, payload: MatchingInput): Promise<void>;
  [ActionTypes.CHALLENGE](
    { commit }: AugmentedActionContext,
    payload: { slug: string }
  ): Promise<void>;
  [ActionTypes.CHALLENGE_PUBLIC](
    { commit }: AugmentedActionContext,
    payload: { slug: string }
  ): Promise<void>;
  [ActionTypes.CHALLENGES](
    { commit }: AugmentedActionContext,
    payload: ChallengesQueryVariables
  ): Promise<void>;
  [ActionTypes.CHALLENGE_TYPES]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.SKILLS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.SOFT_SKILLS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.STUDENT](
    { commit }: AugmentedActionContext,
    payload: { slug: string; jobPostingId?: string }
  ): Promise<void>;
  [ActionTypes.ZIP_CITY_JOBS](
    { commit }: AugmentedActionContext,
    payload: ZipCityJobsInput
  ): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.BENEFITS]({ commit }) {
    commit(MutationTypes.BENEFITS_LOADING);
    const response = await apiClient.query({
      query: BenefitsDocument,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.BENEFITS_LOADED, {
      benefits: response.data.benefits,
    });
  },
  async [ActionTypes.BRANCHES]({ commit }) {
    commit(MutationTypes.BRANCHES_LOADING);
    const response = await apiClient.query({
      query: BranchesDocument,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.BRANCHES_LOADED, {
      branches: response.data.branches,
    });
  },
  async [ActionTypes.COMPANY]({ commit }, payload: { slug: string }) {
    commit(MutationTypes.COMPANY_LOADING);
    const response = await apiClient.query({
      query: CompanyDocument,
      variables: payload,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.COMPANY_LOADED, response.data);
  },
  async [ActionTypes.COMPANY_MATCHING]({ commit }) {
    commit(MutationTypes.COMPANY_MATCHING_LOADING);
    const response = await apiClient.query({
      query: CompanyMatchingDocument,
      context: {
        batch: true,
      },
    });

    commit(MutationTypes.COMPANY_MATCHING_LOADED, {
      matches: response.data.matches,
    });
  },
  async [ActionTypes.CULTURAL_FITS]({ commit }) {
    commit(MutationTypes.CULTURAL_FITS_LOADING);
    const response = await apiClient.query({
      query: CulturalFitsDocument,
      context: {
        batch: true,
      },
    });

    commit(MutationTypes.CULTURAL_FITS_LOADED, {
      culturalFits: response.data.culturalFits,
    });
  },
  async [ActionTypes.JOB_REQUIREMENTS]({ commit }) {
    commit(MutationTypes.JOB_REQUIREMENTS_LOADING);
    const response = await apiClient.query({
      query: JobRequirementsDocument,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.JOB_REQUIREMENTS_LOADED, {
      jobRequirements: response.data.jobRequirements,
    });
  },
  async [ActionTypes.DASHBOARD]({ commit }) {
    commit(MutationTypes.DASHBOARD_LOADING);
    const response = await apiClient.query({
      query: dashboardQuery,
      fetchPolicy: "no-cache",
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.DASHBOARD_LOADED, {
      dashboard: response.data.dashboard,
    });
  },
  async [ActionTypes.JOB_POSTING]({ commit }, payload: { slug: string }) {
    commit(MutationTypes.JOB_POSTING_LOADING);
    const response = await apiClient.query({
      query: JobPostingDocument,
      fetchPolicy: "no-cache",
      variables: payload,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.JOB_POSTING_LOADED, {
      jobPosting: response.data.jobPosting,
    });
  },
  async [ActionTypes.JOB_POSTINGS]({ commit }) {
    commit(MutationTypes.JOB_POSTINGS_LOADING);
    const response = await apiClient.query({
      query: JobPostingsDocument,
      fetchPolicy: "no-cache",
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.JOB_POSTINGS_LOADED, {
      jobPostings: response.data.jobPostings,
    });
  },
  async [ActionTypes.JOB_TYPE]({ commit }) {
    commit(MutationTypes.JOB_TYPES_LOADING);
    const response = await apiClient.query({
      query: JobTypesDocument,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.JOB_TYPES_LOADED, { jobTypes: response.data.jobTypes });
  },
  async [ActionTypes.KEYWORDS]({ commit }) {
    commit(MutationTypes.KEYWORDS_LOADING);
    const response = await apiClient.query({
      query: KeywordsDocument,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.KEYWORDS_LOADED, { keywords: response.data.keywords });
  },
  async [ActionTypes.LANGUAGES]({ commit }, payload: { shortList: boolean }) {
    commit(MutationTypes.LANGUAGES_LOADING);
    const response = await apiClient.query({
      query: LanguagesDocument,
      variables: {
        ...(payload?.shortList !== undefined && { shortList: !!payload.shortList }),
      },
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.LANGUAGES_LOADED, response.data);
  },
  async [ActionTypes.LANGUAGE_LEVELS]({ commit }) {
    commit(MutationTypes.LANGUAGE_LEVELS_LOADING);
    const response = await apiClient.query({
      query: LanguageLevelsDocument,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.LANGUAGE_LEVELS_LOADED, { languageLevels: response.data.languageLevels });
  },
  async [ActionTypes.MATCH_JOB_POSTING]({ commit }, payload: MatchJobPostingInput) {
    commit(MutationTypes.MATCH_LOADING);
    const response = await apiClient.mutate({
      mutation: MatchJobPostingDocument,
      variables: payload,
    });
    if (response.data?.matchJobPosting) {
      commit(MutationTypes.MATCH_JOB_POSTING_LOADED, {
        id: payload.jobPosting?.id,
        match: response.data.matchJobPosting,
      });
    } else {
      throw new Error("MATCH_JOB_POSTING_LOADED: data or matchJobPosting is undefined");
    }
  },
  async [ActionTypes.MATCH_CHALLENGE]({ commit }, payload: MatchChallengeInput) {
    commit(MutationTypes.MATCH_LOADING);
    const response = await apiClient.mutate({
      mutation: MatchChallengeDocument,
      variables: payload,
    });
    if (response.data?.matchChallenge) {
      commit(MutationTypes.MATCH_CHALLENGE_LOADED, {
        id: payload.challenge.id,
        match: response.data.matchChallenge,
      });
    } else {
      throw new Error("MATCH_CHALLENGE_LOADED: data or matchChallenge is undefined");
    }
  },
  async [ActionTypes.MATCH_STUDENT]({ commit }, payload: MatchStudentInput) {
    commit(MutationTypes.MATCH_LOADING);
    const response = await apiClient.mutate({
      mutation: MatchStudentDocument,
      variables: payload,
    });
    if (response.data?.matchStudent) {
      commit(MutationTypes.MATCH_STUDENT_LOADED, {
        id: payload.student?.id,
        match: response.data.matchStudent,
      });
    } else {
      throw new Error("MATCH_STUDENT_LOADED: data or matchStudent is undefined");
    }
  },
  async [ActionTypes.MATCHING]({ commit }, payload: MatchingInput) {
    commit(MutationTypes.MATCHES_LOADING);
    const response = await apiClient.query({
      query: MatchingDocument,
      variables: payload,
      fetchPolicy: "no-cache",
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.MATCHES_LOADED, response.data.matches);
  },
  async [ActionTypes.SKILLS]({ commit }) {
    commit(MutationTypes.SKILLS_LOADING);
    const response = await apiClient.query({
      query: SkillsDocument,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.SKILLS_LOADED, { skills: response.data.skills });
  },
  async [ActionTypes.CHALLENGE]({ commit }, payload) {
    commit(MutationTypes.CHALLENGE_LOADING);
    const response = await apiClient.query({
      query: ChallengeDocument,
      fetchPolicy: "no-cache",
      variables: payload,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.CHALLENGE_LOADED, response.data);
  },
  async [ActionTypes.CHALLENGE_PUBLIC]({ commit }, payload) {
    commit(MutationTypes.CHALLENGE_LOADING);
    const response = await apiClient.query({
      query: ChallengePublicDocument,
      fetchPolicy: "no-cache",
      variables: payload,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.CHALLENGE_LOADED, response.data);
  },
  async [ActionTypes.CHALLENGES]({ commit }, payload) {
    commit(MutationTypes.CHALLENGES_LOADING);
    const response = await apiClient.query({
      query: ChallengesDocument,
      fetchPolicy: "no-cache",
      variables: payload,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.CHALLENGES_LOADED, {
      challenges: response.data.challenges,
    });
  },
  async [ActionTypes.CHALLENGE_TYPES]({ commit }) {
    commit(MutationTypes.CHALLENGE_TYPES_LOADING);
    const response = await apiClient.query({
      query: ChallengeTypesDocument,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.CHALLENGE_TYPES_LOADED, { challengeTypes: response.data.challengeTypes });
  },
  async [ActionTypes.SOFT_SKILLS]({ commit }) {
    commit(MutationTypes.SOFT_SKILLS_LOADING);
    const response = await apiClient.query({
      query: SoftSkillsDocument,
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.SOFT_SKILLS_LOADED, { softSkills: response.data.softSkills });
  },
  async [ActionTypes.STUDENT]({ commit }, payload: { slug: string; jobPostingId?: string }) {
    commit(MutationTypes.STUDENT_LOADING);
    const response = await apiClient.query({
      query: StudentDocument,
      variables: payload,
      fetchPolicy: "no-cache",
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.STUDENT_LOADED, {
      student: response.data.student,
      avatar: response.data.avatar,
      avatarFallback: response.data.avatarFallback,
      certificates: response.data.certificates,
    });
  },
  async [ActionTypes.ZIP_CITY_JOBS]({ commit }, payload?: ZipCityJobsInput) {
    commit(MutationTypes.ZIP_CITY_JOBS_LOADING);
    const response = await apiClient.query({
      query: ZipCityJobsDocument,
      variables: payload,
      fetchPolicy: "no-cache",
      context: {
        batch: true,
      },
    });
    commit(MutationTypes.ZIP_CITY_JOBS_LOADED, { zipCityJobs: response.data.zipCityJobs });
  },
};
