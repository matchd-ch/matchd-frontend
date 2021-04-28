import { ProfileType } from "@/api/models/types";
import { State } from "@/store/modules/content/state";
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
  MatchJobPosting,
  MatchStudent,
  Skill,
  SoftSkill,
  Student,
  ZipCity,
} from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

export type Mutations<S = State> = {
  [MutationTypes.BENEFITS_LOADING](state: S): void;
  [MutationTypes.BENEFITS_LOADED](state: S, payload: { benefits: Benefit[] }): void;
  [MutationTypes.BRANCHES_LOADING](state: S): void;
  [MutationTypes.BRANCHES_LOADED](state: S, payload: { branches: Branch[] }): void;
  [MutationTypes.COMPANY_LOADING](state: S): void;
  [MutationTypes.COMPANY_LOADED](
    state: S,
    payload: { company: Company; logo: Attachment[]; media: Attachment[] }
  ): void;
  [MutationTypes.COMPANY_MATCHING_LOADING](state: S): void;
  [MutationTypes.COMPANY_MATCHING_LOADED](state: S, payload: { matches: Match[] }): void;
  [MutationTypes.CULTURAL_FITS_LOADING](state: S): void;
  [MutationTypes.CULTURAL_FITS_LOADED](state: S, payload: { culturalFits: CulturalFit[] }): void;
  [MutationTypes.JOB_POSTING_LOADING](state: S): void;
  [MutationTypes.JOB_POSTING_LOADED](state: S, payload: { jobPosting: JobPosting }): void;
  [MutationTypes.JOB_POSTINGS_LOADING](state: S): void;
  [MutationTypes.JOB_POSTINGS_LOADED](state: S, payload: { jobPostings: JobPosting[] }): void;
  [MutationTypes.JOB_REQUIREMENTS_LOADING](state: S): void;
  [MutationTypes.JOB_REQUIREMENTS_LOADED](
    state: S,
    payload: { jobRequirements: JobRequirement[] }
  ): void;
  [MutationTypes.JOB_TYPES_LOADING](state: S): void;
  [MutationTypes.JOB_TYPES_LOADED](state: S, payload: { jobTypes: JobType[] }): void;
  [MutationTypes.LANGUAGES_LOADING](state: S): void;
  [MutationTypes.LANGUAGES_LOADED](state: S, payload: { languages: Language[] }): void;
  [MutationTypes.LANGUAGE_LEVELS_LOADING](state: S): void;
  [MutationTypes.LANGUAGE_LEVELS_LOADED](
    state: S,
    payload: { languageLevels: LanguageLevel[] }
  ): void;
  [MutationTypes.MATCH_LOADING](state: S): void;
  [MutationTypes.MATCH_JOB_POSTING_LOADED](
    state: S,
    payload: { id: string; match: MatchJobPosting }
  ): void;
  [MutationTypes.MATCH_STUDENT_LOADED](
    state: S,
    payload: { id: string; match: MatchStudent }
  ): void;
  [MutationTypes.MATCHES_LOADING](state: S): void;
  [MutationTypes.MATCHES_LOADED](state: S, payload: { matches: Match[] }): void;
  [MutationTypes.SKILLS_LOADING](state: S): void;
  [MutationTypes.SKILLS_LOADED](state: S, payload: { skills: Skill[] }): void;
  [MutationTypes.SOFT_SKILLS_LOADING](state: S): void;
  [MutationTypes.SOFT_SKILLS_LOADED](state: S, payload: { softSkills: SoftSkill[] }): void;
  [MutationTypes.STUDENT_LOADING](state: S): void;
  [MutationTypes.STUDENT_LOADED](
    state: S,
    payload: { student: Student; avatar: Attachment[]; certificates: Attachment[] }
  ): void;
  [MutationTypes.ZIP_CITY_JOBS_LOADING](state: S): void;
  [MutationTypes.ZIP_CITY_JOBS_LOADED](state: S, payload: { zipCityJobs: ZipCity[] }): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.BENEFITS_LOADING](state: State) {
    state.benefits.loading = true;
  },
  [MutationTypes.BENEFITS_LOADED](state: State, payload: { benefits: Benefit[] }) {
    state.benefits.loading = false;
    state.benefits.data = payload.benefits;
  },
  [MutationTypes.BRANCHES_LOADING](state: State) {
    state.branches.loading = true;
  },
  [MutationTypes.BRANCHES_LOADED](state: State, payload: { branches: Branch[] }) {
    state.branches.loading = false;
    state.branches.data = payload.branches;
  },
  [MutationTypes.COMPANY_LOADING](state: State) {
    state.company.loading = true;
    state.company.data = null;
    state.company.logo = null;
    state.company.media = [];
  },
  [MutationTypes.COMPANY_LOADED](
    state: State,
    payload: { company: Company; logo: Attachment[]; media: Attachment[] }
  ) {
    state.company.loading = false;
    state.company.data = payload.company;
    if (payload.logo.length > 0) {
      state.company.logo = payload.logo[0];
    }
    state.company.media = payload.media;
  },
  [MutationTypes.COMPANY_MATCHING_LOADING](state: State) {
    state.companyMatching.loading = true;
    state.companyMatching.data = [];
  },
  [MutationTypes.COMPANY_MATCHING_LOADED](state: State, payload: { matches: Match[] }) {
    state.companyMatching.loading = false;
    state.companyMatching.data = payload.matches;
  },
  [MutationTypes.CULTURAL_FITS_LOADING](state: State) {
    state.culturalFits.loading = true;
  },
  [MutationTypes.CULTURAL_FITS_LOADED](state: State, payload: { culturalFits: CulturalFit[] }) {
    state.culturalFits.loading = false;
    state.culturalFits.data = payload.culturalFits;
  },
  [MutationTypes.JOB_POSTING_LOADING](state: State) {
    state.jobPosting.loading = true;
    state.jobPosting.data = null;
  },
  [MutationTypes.JOB_POSTING_LOADED](state: State, payload: { jobPosting: JobPosting }) {
    state.jobPosting.loading = false;
    state.jobPosting.data = payload.jobPosting;
  },
  [MutationTypes.JOB_POSTINGS_LOADING](state: State) {
    state.jobPostings.loading = true;
  },
  [MutationTypes.JOB_POSTINGS_LOADED](state: State, payload: { jobPostings: JobPosting[] }) {
    state.jobPostings.loading = false;
    state.jobPostings.data = payload.jobPostings;
  },
  [MutationTypes.JOB_REQUIREMENTS_LOADING](state: State) {
    state.jobRequirements.loading = true;
  },
  [MutationTypes.JOB_REQUIREMENTS_LOADED](
    state: State,
    payload: { jobRequirements: JobRequirement[] }
  ) {
    state.jobRequirements.loading = false;
    state.jobRequirements.data = payload.jobRequirements;
  },
  [MutationTypes.JOB_TYPES_LOADING](state: State) {
    state.jobTypes.loading = true;
  },
  [MutationTypes.JOB_TYPES_LOADED](state: State, payload: { jobTypes: JobType[] }) {
    state.jobTypes.loading = false;
    state.jobTypes.data = payload.jobTypes;
  },
  [MutationTypes.LANGUAGES_LOADING](state: State) {
    state.languages.loading = true;
  },
  [MutationTypes.LANGUAGES_LOADED](state: State, payload: { languages: Language[] }) {
    state.languages.loading = false;
    state.languages.data = payload.languages;
  },
  [MutationTypes.LANGUAGE_LEVELS_LOADING](state: State) {
    state.languages.loading = true;
  },
  [MutationTypes.LANGUAGE_LEVELS_LOADED](
    state: State,
    payload: { languageLevels: LanguageLevel[] }
  ) {
    state.languages.loading = false;
    state.languages.levels = payload.languageLevels;
  },
  [MutationTypes.MATCH_LOADING](state: State) {
    state.match.loading = true;
  },
  [MutationTypes.MATCH_JOB_POSTING_LOADED](
    state: State,
    payload: { id: string; match: MatchJobPosting }
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
  [MutationTypes.MATCH_STUDENT_LOADED](state: State, payload: { id: string; match: MatchStudent }) {
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
  [MutationTypes.MATCHES_LOADED](state: State, payload: { matches: Match[] }) {
    state.matches.loading = false;
    state.matches.data = payload.matches;
  },
  [MutationTypes.SKILLS_LOADING](state: State) {
    state.skills.loading = true;
  },
  [MutationTypes.SKILLS_LOADED](state: State, payload: { skills: Skill[] }) {
    state.skills.loading = false;
    state.skills.data = payload.skills;
  },
  [MutationTypes.SOFT_SKILLS_LOADING](state: State) {
    state.softSkills.loading = true;
  },
  [MutationTypes.SOFT_SKILLS_LOADED](state: State, payload: { softSkills: SoftSkill[] }) {
    state.softSkills.loading = false;
    state.softSkills.data = payload.softSkills;
  },
  [MutationTypes.STUDENT_LOADING](state: State) {
    state.student.loading = true;
    state.student.data = null;
    state.student.avatar = null;
    state.student.certificates = [];
  },
  [MutationTypes.STUDENT_LOADED](
    state: State,
    payload: {
      student: Student | null;
      avatar: Attachment[];
      certificates: Attachment[];
    }
  ) {
    state.student = {
      loading: false,
      data: payload.student,
      avatar: payload.avatar?.[0] ?? null,
      certificates: payload.certificates,
    };
  },
  [MutationTypes.ZIP_CITY_JOBS_LOADING](state: State) {
    state.matches.zipCityJobsLoading = true;
  },
  [MutationTypes.ZIP_CITY_JOBS_LOADED](state: State, payload: { zipCityJobs: ZipCity[] }) {
    state.matches.zipCityJobsLoading = false;
    state.matches.zipCityJobs = payload.zipCityJobs;
  },
};
