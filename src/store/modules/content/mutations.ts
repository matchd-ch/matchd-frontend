import type {
  Attachment,
  Benefit,
  Branch,
  Company,
  Expectation,
  JobOption,
  JobPosition,
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
  [MutationTypes.EXPECTATIONS_LOADING](state: S): void;
  [MutationTypes.EXPECTATIONS_LOADED](state: S, payload: { expectations: Expectation[] }): void;
  [MutationTypes.JOB_OPTIONS_LOADING](state: S): void;
  [MutationTypes.JOB_OPTIONS_LOADED](state: S, payload: { jobOptions: JobOption[] }): void;
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
    state.jobOptions.loading = true;
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
    state.company.logo = payload.logo[0];
    state.company.media = payload.media;
  },
  [MutationTypes.EXPECTATIONS_LOADING](state: State) {
    state.expectations.loading = true;
  },
  [MutationTypes.EXPECTATIONS_LOADED](state: State, payload: { expectations: Expectation[] }) {
    state.expectations.loading = false;
    state.expectations.data = payload.expectations;
  },
  [MutationTypes.JOB_OPTIONS_LOADING](state: State) {
    state.jobOptions.loading = true;
  },
  [MutationTypes.JOB_OPTIONS_LOADED](state: State, payload: { jobOptions: JobOption[] }) {
    state.jobOptions.loading = false;
    state.jobOptions.data = payload.jobOptions;
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
