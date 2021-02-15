import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import {
  HobbyType,
  JobOptionType,
  JobPositionType,
  LanguageType,
  LevelType,
  SkillType,
  StudentProfileStep1,
  StudentProfileStep2,
  StudentProfileStep3,
  StudentProfileStep4,
  StudentProfileStep5,
  ZipCityType,
} from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/profile/state";

export type Mutations<S = State> = {
  [MutationTypes.ONBOARDING_STEP1_LOADING](state: S): void;
  [MutationTypes.ONBOARDING_STEP1_LOADED](state: S, payload: StudentProfileStep1): void;
  [MutationTypes.ONBOARDING_STEP2_LOADING](state: S): void;
  [MutationTypes.ONBOARDING_STEP2_LOADED](state: S, payload: StudentProfileStep2): void;
  [MutationTypes.ONBOARDING_STEP3_LOADING](state: S): void;
  [MutationTypes.ONBOARDING_STEP3_LOADED](state: S, payload: StudentProfileStep3): void;
  [MutationTypes.ONBOARDING_STEP4_LOADING](state: S): void;
  [MutationTypes.ONBOARDING_STEP4_LOADED](state: S, payload: StudentProfileStep4): void;
  [MutationTypes.ONBOARDING_STEP5_LOADING](state: S): void;
  [MutationTypes.ONBOARDING_STEP5_LOADED](state: S, payload: StudentProfileStep5): void;
  [MutationTypes.ONBOARDING_STEP3_DATA_LOADING](state: S): void;
  [MutationTypes.ONBOARDING_STEP3_DATA_LOADED](
    state: S,
    payload: { jobOptions: JobOptionType[]; jobPositions: JobPositionType[] }
  ): void;
  [MutationTypes.ONBOARDING_STEP4_DATA_LOADING](state: S): void;
  [MutationTypes.ONBOARDING_STEP4_DATA_LOADED](
    state: S,
    payload: {
      skills: SkillType[];
      languages: LanguageType[];
      languageLevels: LevelType[];
    }
  ): void;
  [MutationTypes.ZIP_CITY_LOADING](state: S): void;
  [MutationTypes.ZIP_CITY_LOADED](state: S, payload: ZipCityType[]): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ONBOARDING_STEP1_LOADING](state: State) {
    state.profile.loading = true;
  },
  [MutationTypes.ONBOARDING_STEP1_LOADED](state: State, payload: StudentProfileStep1) {
    state.profile.loading = false;
    state.profile.success = payload.success || false;
    state.profile.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.ONBOARDING_STEP2_LOADING](state: State) {
    state.profile.loading = true;
  },
  [MutationTypes.ONBOARDING_STEP2_LOADED](state: State, payload: StudentProfileStep2) {
    state.profile.loading = false;
    state.profile.success = payload.success || false;
    state.profile.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.ONBOARDING_STEP3_LOADING](state: State) {
    state.profile.loading = true;
  },
  [MutationTypes.ONBOARDING_STEP3_LOADED](state: State, payload: StudentProfileStep3) {
    state.profile.loading = false;
    state.profile.success = payload.success || false;
    state.profile.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.ONBOARDING_STEP4_LOADING](state: State) {
    state.profile.loading = true;
  },
  [MutationTypes.ONBOARDING_STEP4_LOADED](state: State, payload: StudentProfileStep4) {
    state.profile.loading = false;
    state.profile.success = payload.success || false;
    state.profile.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.ONBOARDING_STEP5_LOADING](state: State) {
    state.profile.loading = true;
  },
  [MutationTypes.ONBOARDING_STEP5_LOADED](state: State, payload: StudentProfileStep5) {
    state.profile.loading = false;
    state.profile.success = payload.success || false;
    state.profile.errors = errorCodeMapper(payload.errors);
    state.profile.nicknameSuggestions = (payload.nicknameSuggestions as string[]) || [];
  },
  [MutationTypes.ONBOARDING_STEP3_DATA_LOADING](state: State) {
    state.jobOptions.loading = true;
    state.jobPositions.loading = true;
  },
  [MutationTypes.ONBOARDING_STEP3_DATA_LOADED](
    state: State,
    payload: { jobOptions: JobOptionType[]; jobPositions: JobPositionType[] }
  ) {
    state.jobOptions.loading = false;
    state.jobPositions.loading = false;
    state.jobOptions.data = payload.jobOptions;
    state.jobPositions.data = payload.jobPositions;
  },
  [MutationTypes.ONBOARDING_STEP4_DATA_LOADING](state: State) {
    state.skills.loading = true;
    state.languages.loading = true;
  },
  [MutationTypes.ONBOARDING_STEP4_DATA_LOADED](
    state: State,
    payload: {
      skills: SkillType[];
      languages: LanguageType[];
      languageLevels: LevelType[];
    }
  ) {
    state.skills.loading = false;
    state.languages.loading = false;
    state.skills.data = payload.skills;
    state.languages.data = payload.languages;
    state.languages.levels = payload.languageLevels;
  },
  [MutationTypes.ZIP_CITY_LOADING](state: State) {
    state.zipCity.loading = true;
  },
  [MutationTypes.ZIP_CITY_LOADED](state: State, payload: ZipCityType[]) {
    state.zipCity.loading = false;
    state.zipCity.data = payload;
  },
};
