import type {
  Attachment,
  Benefit,
  Branch,
  Company,
  CulturalFit,
  JobPosition,
  JobRequirement,
  JobType,
  Language,
  LanguageLevel,
  Skill,
  SoftSkill,
} from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/content/state";

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
  [MutationTypes.CULTURAL_FITS_LOADING](state: S): void;
  [MutationTypes.CULTURAL_FITS_LOADED](state: S, payload: { culturalFits: CulturalFit[] }): void;
  [MutationTypes.JOB_REQUIREMENTS_LOADING](state: S): void;
  [MutationTypes.JOB_REQUIREMENTS_LOADED](
    state: S,
    payload: { jobRequirements: JobRequirement[] }
  ): void;
  [MutationTypes.JOB_TYPES_LOADING](state: S): void;
  [MutationTypes.JOB_TYPES_LOADED](state: S, payload: { jobTypes: JobType[] }): void;
  [MutationTypes.JOB_POSITIONS_LOADING](state: S): void;
  [MutationTypes.JOB_POSITIONS_LOADED](state: S, payload: { jobPositions: JobPosition[] }): void;
  [MutationTypes.LANGUAGES_LOADING](state: S): void;
  [MutationTypes.LANGUAGES_LOADED](state: S, payload: { languages: Language[] }): void;
  [MutationTypes.LANGUAGE_LEVELS_LOADING](state: S): void;
  [MutationTypes.LANGUAGE_LEVELS_LOADED](
    state: S,
    payload: { languageLevels: LanguageLevel[] }
  ): void;
  [MutationTypes.SKILLS_LOADING](state: S): void;
  [MutationTypes.SKILLS_LOADED](state: S, payload: { skills: Skill[] }): void;
  [MutationTypes.SOFT_SKILLS_LOADING](state: S): void;
  [MutationTypes.SOFT_SKILLS_LOADED](state: S, payload: { softSkills: SoftSkill[] }): void;
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
  [MutationTypes.CULTURAL_FITS_LOADING](state: State) {
    state.culturalFits.loading = true;
  },
  [MutationTypes.CULTURAL_FITS_LOADED](state: State, payload: { culturalFits: CulturalFit[] }) {
    state.culturalFits.loading = false;
    state.culturalFits.data = payload.culturalFits;
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
  [MutationTypes.JOB_POSITIONS_LOADING](state: State) {
    state.jobPositions.loading = true;
  },
  [MutationTypes.JOB_POSITIONS_LOADED](state: State, payload: { jobPositions: JobPosition[] }) {
    state.jobPositions.loading = false;
    state.jobPositions.data = payload.jobPositions;
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
};
