import { ProfileType } from "@/api/models/types";
import { State } from "@/store/modules/content/state";
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
  MatchJobPosting,
  MatchProjectPosting,
  MatchStudent,
  ProjectPosting,
  ProjectType,
  Skill,
  SoftSkill,
  Student,
  Topic,
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
    payload: {
      company: Company;
      logo: Attachment[];
      media: Attachment[];
      logoFallback: Attachment[] | null;
    }
  ): void;
  [MutationTypes.COMPANY_MATCHING_LOADING](state: S): void;
  [MutationTypes.COMPANY_MATCHING_LOADED](state: S, payload: { matches: Match[] }): void;
  [MutationTypes.CULTURAL_FITS_LOADING](state: S): void;
  [MutationTypes.CULTURAL_FITS_LOADED](state: S, payload: { culturalFits: CulturalFit[] }): void;
  [MutationTypes.DASHBOARD_LOADING](state: S): void;
  [MutationTypes.DASHBOARD_LOADED](state: S, payload: { dashboard: Dashboard | null }): void;
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
  [MutationTypes.KEYWORDS_LOADING](state: S): void;
  [MutationTypes.KEYWORDS_LOADED](state: S, payload: { keywords: Keyword[] }): void;
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
  [MutationTypes.MATCH_PROJECT_POSTING_LOADED](
    state: S,
    payload: { id: string; match: MatchProjectPosting }
  ): void;
  [MutationTypes.MATCH_STUDENT_LOADED](
    state: S,
    payload: { id: string; match: MatchStudent }
  ): void;
  [MutationTypes.MATCHES_LOADING](state: S): void;
  [MutationTypes.MATCHES_LOADED](state: S, payload: { matches: Match[] }): void;
  [MutationTypes.PROJECT_POSTING_LOADING](state: S): void;
  [MutationTypes.PROJECT_POSTING_LOADED](
    state: S,
    payload: { projectPosting: ProjectPosting }
  ): void;
  [MutationTypes.PROJECT_POSTINGS_LOADING](state: S): void;
  [MutationTypes.PROJECT_POSTINGS_LOADED](
    state: S,
    payload: { projectPostings: ProjectPosting[] }
  ): void;
  [MutationTypes.PROJECT_TYPES_LOADING](state: S): void;
  [MutationTypes.PROJECT_TYPES_LOADED](state: S, payload: { projectTypes: ProjectType[] }): void;
  [MutationTypes.RESET_MATCHES](state: S): void;
  [MutationTypes.SKILLS_LOADING](state: S): void;
  [MutationTypes.SKILLS_LOADED](state: S, payload: { skills: Skill[] }): void;
  [MutationTypes.SOFT_SKILLS_LOADING](state: S): void;
  [MutationTypes.SOFT_SKILLS_LOADED](state: S, payload: { softSkills: SoftSkill[] }): void;
  [MutationTypes.STUDENT_LOADING](state: S): void;
  [MutationTypes.STUDENT_LOADED](
    state: S,
    payload: {
      student: Student;
      avatar: Attachment[];
      avatarFallback: Attachment[];
      certificates: Attachment[];
    }
  ): void;
  [MutationTypes.TOPICS_LOADING](state: S): void;
  [MutationTypes.TOPICS_LOADED](state: S, payload: { topics: Topic[] }): void;
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
    payload: {
      company: Company;
      logo: Attachment[];
      media: Attachment[];
      logoFallback: Attachment[];
    }
  ) {
    state.company.loading = false;
    state.company.data = payload.company;
    if (payload.logo.length > 0) {
      state.company.logo = payload.logo[0];
    }
    if (payload.logoFallback.length > 0) {
      state.company.logoFallback = payload.logoFallback[0];
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
  [MutationTypes.KEYWORDS_LOADING](state: State) {
    state.keywords.loading = true;
  },
  [MutationTypes.KEYWORDS_LOADED](state: State, payload: { keywords: Keyword[] }) {
    state.keywords.loading = false;
    state.keywords.data = payload.keywords;
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
  [MutationTypes.MATCH_PROJECT_POSTING_LOADED](
    state: State,
    payload: { id: string; match: MatchProjectPosting }
  ) {
    state.match.loading = false;
    if (state.projectPosting.data?.id === payload.id) {
      state.projectPosting.data = {
        ...state.projectPosting.data,
        matchStatus: {
          ...state.projectPosting.data.matchStatus,
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
  [MutationTypes.PROJECT_POSTING_LOADING](state: State) {
    state.projectPosting.loading = true;
    state.projectPosting.data = null;
    state.projectPosting.images = [];
    state.projectPosting.documents = [];
    state.projectPosting.imageFallback = null;
  },
  [MutationTypes.PROJECT_POSTING_LOADED](
    state: State,
    payload: {
      projectPosting: ProjectPosting;
      images: Attachment[];
      documents: Attachment[];
      imageFallback: Attachment[];
    }
  ) {
    state.projectPosting.loading = false;
    state.projectPosting.data = payload.projectPosting;
    state.projectPosting.images = payload.images;
    if (payload.imageFallback.length > 0) {
      state.projectPosting.imageFallback = payload.imageFallback[0];
    }
    state.projectPosting.documents = payload.documents;
  },
  [MutationTypes.PROJECT_POSTINGS_LOADING](state: State) {
    state.projectPostings.loading = true;
  },
  [MutationTypes.PROJECT_POSTINGS_LOADED](
    state: State,
    payload: { projectPostings: ProjectPosting[] }
  ) {
    state.projectPostings.loading = false;
    state.projectPostings.data = payload.projectPostings;
  },
  [MutationTypes.PROJECT_TYPES_LOADING](state: State) {
    state.projectTypes.loading = true;
  },
  [MutationTypes.PROJECT_TYPES_LOADED](state: State, payload: { projectTypes: ProjectType[] }) {
    state.projectTypes.loading = false;
    state.projectTypes.data = payload.projectTypes;
  },
  [MutationTypes.RESET_MATCHES](state: State) {
    state.matches.data = [];
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
    state.student.avatarFallback = null;
    state.student.certificates = [];
  },
  [MutationTypes.STUDENT_LOADED](
    state: State,
    payload: {
      student: Student | null;
      avatar: Attachment[];
      avatarFallback: Attachment[];
      certificates: Attachment[];
    }
  ) {
    state.student = {
      loading: false,
      data: payload.student,
      avatar: payload.avatar?.[0] ?? null,
      avatarFallback: payload.avatarFallback?.[0] ?? null,
      certificates: payload.certificates,
    };
  },
  [MutationTypes.TOPICS_LOADING](state: State) {
    state.topics.loading = true;
  },
  [MutationTypes.TOPICS_LOADED](state: State, payload: { topics: Topic[] }) {
    state.topics.loading = false;
    state.topics.data = payload.topics;
  },
  [MutationTypes.ZIP_CITY_JOBS_LOADING](state: State) {
    state.matches.zipCityJobsLoading = true;
  },
  [MutationTypes.ZIP_CITY_JOBS_LOADED](state: State, payload: { zipCityJobs: ZipCity[] }) {
    state.matches.zipCityJobsLoading = false;
    state.matches.zipCityJobs = payload.zipCityJobs;
  },
};
