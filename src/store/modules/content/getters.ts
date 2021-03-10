import { RootState } from "@/store";
import {
  BenefitType,
  BranchType,
  JobOptionType,
  JobPositionType,
  LanguageType,
  LevelType,
  SkillType,
} from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  contentJobOptions(state: State): JobOptionType[];
  contentJobPositions(state: State): JobPositionType[];
  contentSkills(state: State): SkillType[];
  contentLanguages(state: State): LanguageType[];
  contentLanguageLevels(state: State): LevelType[];
  contentBenefits(state: State): BenefitType[];
  contentBranches(state: State): BranchType[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  contentJobOptions(state: State): JobOptionType[] {
    return state.jobOptions.data;
  },
  contentJobPositions(state: State): JobPositionType[] {
    return state.jobPositions.data;
  },
  contentSkills(state: State): SkillType[] {
    return state.skills.data;
  },
  contentLanguages(state: State): LanguageType[] {
    return state.languages.data;
  },
  contentLanguageLevels(state: State): LevelType[] {
    return state.languages.levels;
  },
  contentBenefits(state: State): BenefitType[] {
    return state.benefits.data;
  },
  contentBranches(state: State): BranchType[] {
    return state.branches.data;
  },
};
