import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import {
  BenefitType,
  BranchType,
  CompanyProfileStep1,
  CompanyProfileStep2,
  CompanyProfileStep3,
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
  StudentProfileStep6,
  ZipCityType,
} from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/profile/state";

export type Mutations<S = State> = {
  [MutationTypes.STUDENT_ONBOARDING_STEP_LOADING](state: S): void;
  [MutationTypes.STUDENT_ONBOARDING_STEP_LOADED](
    state: S,
    payload:
      | StudentProfileStep1
      | StudentProfileStep2
      | StudentProfileStep3
      | StudentProfileStep4
      | StudentProfileStep5
      | StudentProfileStep6
  ): void;
  [MutationTypes.COMPANY_ONBOARDING_STEP_LOADING](state: S): void;
  [MutationTypes.COMPANY_ONBOARDING_STEP_LOADED](
    state: S,
    payload: CompanyProfileStep1 | CompanyProfileStep2 | CompanyProfileStep3
  ): void;
  [MutationTypes.ZIP_CITY_LOADING](state: S): void;
  [MutationTypes.ZIP_CITY_LOADED](state: S, payload: ZipCityType[]): void;
  [MutationTypes.STUDENT_ONBOARDING_NICKNAME_SUGGESTIONS](
    state: S,
    payload: { nicknameSuggestions: string[] }
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.STUDENT_ONBOARDING_STEP_LOADING](state: State) {
    state.profile.loading = true;
  },
  [MutationTypes.STUDENT_ONBOARDING_STEP_LOADED](
    state: State,
    payload:
      | StudentProfileStep1
      | StudentProfileStep2
      | StudentProfileStep3
      | StudentProfileStep4
      | StudentProfileStep5
      | StudentProfileStep6
  ) {
    state.profile.loading = false;
    state.profile.success = payload.success || false;
    state.profile.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.COMPANY_ONBOARDING_STEP_LOADING](state: State) {
    state.profile.loading = true;
  },
  [MutationTypes.COMPANY_ONBOARDING_STEP_LOADED](
    state: State,
    payload: CompanyProfileStep1 | CompanyProfileStep2 | CompanyProfileStep3
  ) {
    state.profile.loading = false;
    state.profile.success = payload.success || false;
    state.profile.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.ZIP_CITY_LOADING](state: State) {
    state.zipCity.loading = true;
  },
  [MutationTypes.ZIP_CITY_LOADED](state: State, payload: ZipCityType[]) {
    state.zipCity.loading = false;
    state.zipCity.data = payload;
  },
  [MutationTypes.STUDENT_ONBOARDING_NICKNAME_SUGGESTIONS](
    state: State,
    payload: { nicknameSuggestions: string[] }
  ) {
    state.profile.nicknameSuggestions = payload.nicknameSuggestions;
  },
};
