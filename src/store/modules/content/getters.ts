import { RootState } from "@/store";
import {
  BenefitType,
  BranchType,
  Company,
  ExpectationType,
  JobOptionType,
  JobPositionType,
  LanguageType,
  LevelType,
  SkillType,
} from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  benefits(state: State): BenefitType[];
  branches(state: State): BranchType[];
  company(state: State): Company | null;
  expectations(state: State): ExpectationType[];
  jobOptions(state: State): JobOptionType[];
  jobPositions(state: State): JobPositionType[];
  languages(state: State): LanguageType[];
  languageLevels(state: State): LevelType[];
  skills(state: State): SkillType[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  benefits(state: State): BenefitType[] {
    return state.benefits.data;
  },
  branches(state: State): BranchType[] {
    return state.branches.data;
  },
  company(state: State): Company | null {
    return state.company.data;
  },
  expectations(state: State): ExpectationType[] {
    return state.expectations.data;
  },
  jobOptions(state: State): JobOptionType[] {
    return state.jobOptions.data;
  },
  jobPositions(state: State): JobPositionType[] {
    return state.jobPositions.data;
  },
  languages(state: State): LanguageType[] {
    return state.languages.data;
  },
  languageLevels(state: State): LevelType[] {
    return state.languages.levels;
  },
  skills(state: State): SkillType[] {
    return state.skills.data;
  },
};
