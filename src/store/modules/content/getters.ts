import { RootState } from "@/store";
import type {
  Benefit,
  Branch,
  Expectation,
  JobOption,
  JobPosition,
  Language,
  LanguageLevel,
  Skill,
} from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  benefits(state: State): Benefit[];
  branches(state: State): Branch[];
  expectations(state: State): Expectation[];
  jobOptions(state: State): JobOption[];
  jobPositions(state: State): JobPosition[];
  languages(state: State): Language[];
  languageLevels(state: State): LanguageLevel[];
  skills(state: State): Skill[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  benefits(state: State): Benefit[] {
    return state.benefits.data;
  },
  branches(state: State): Branch[] {
    return state.branches.data;
  },
  expectations(state: State): Expectation[] {
    return state.expectations.data;
  },
  jobOptions(state: State): JobOption[] {
    return state.jobOptions.data;
  },
  jobPositions(state: State): JobPosition[] {
    return state.jobPositions.data;
  },
  languages(state: State): Language[] {
    return state.languages.data;
  },
  languageLevels(state: State): LanguageLevel[] {
    return state.languages.levels;
  },
  skills(state: State): Skill[] {
    return state.skills.data;
  },
};
