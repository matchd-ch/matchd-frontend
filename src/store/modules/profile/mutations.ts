import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import { State } from "@/store/modules/profile/state";
import type {
  CompanyProfileAdvantages,
  CompanyProfileBaseData,
  CompanyProfileRelations,
  StudentProfileAbilities,
  StudentProfileBaseData,
  StudentProfileCondition,
  StudentProfileEmployment,
  StudentProfileSpecificData,
  UniversityProfileBaseData,
  UniversityProfileRelations,
  UniversityProfileSpecificData,
  ZipCity,
} from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

export type Mutations<S = State> = {
  [MutationTypes.STUDENT_ONBOARDING_STEP_LOADING](state: S): void;
  [MutationTypes.STUDENT_ONBOARDING_STEP_LOADED](
    state: S,
    payload:
      | StudentProfileBaseData
      | StudentProfileEmployment
      | StudentProfileAbilities
      | StudentProfileSpecificData
      | StudentProfileCondition
  ): void;
  [MutationTypes.COMPANY_ONBOARDING_STEP_LOADING](state: S): void;
  [MutationTypes.COMPANY_ONBOARDING_STEP_LOADED](
    state: S,
    payload: CompanyProfileBaseData | CompanyProfileRelations | CompanyProfileAdvantages
  ): void;
  [MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING](state: S): void;
  [MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED](
    state: S,
    payload: UniversityProfileBaseData | UniversityProfileSpecificData | UniversityProfileRelations
  ): void;
  [MutationTypes.ZIP_CITY_LOADING](state: S): void;
  [MutationTypes.ZIP_CITY_LOADED](state: S, payload: ZipCity[]): void;
  [MutationTypes.STUDENT_ONBOARDING_NICKNAME_SUGGESTIONS](
    state: S,
    payload: { nicknameSuggestions: string[] }
  ): void;
  [MutationTypes.CLEAR_ONBOARDING_STATE](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.STUDENT_ONBOARDING_STEP_LOADING](state: State) {
    state.profile.loading = true;
  },
  [MutationTypes.STUDENT_ONBOARDING_STEP_LOADED](
    state: State,
    payload:
      | StudentProfileBaseData
      | StudentProfileEmployment
      | StudentProfileAbilities
      | StudentProfileSpecificData
      | StudentProfileCondition
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
    payload: CompanyProfileBaseData | CompanyProfileRelations | CompanyProfileAdvantages
  ) {
    state.profile.loading = false;
    state.profile.success = payload.success || false;
    state.profile.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING](state: State) {
    state.profile.loading = true;
  },
  [MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED](
    state: State,
    payload: UniversityProfileBaseData | UniversityProfileSpecificData | UniversityProfileRelations
  ) {
    state.profile.loading = false;
    state.profile.success = payload.success || false;
    state.profile.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.ZIP_CITY_LOADING](state: State) {
    state.zipCity.loading = true;
  },
  [MutationTypes.ZIP_CITY_LOADED](state: State, payload: ZipCity[]) {
    state.zipCity.loading = false;
    state.zipCity.data = payload;
  },
  [MutationTypes.STUDENT_ONBOARDING_NICKNAME_SUGGESTIONS](
    state: State,
    payload: { nicknameSuggestions: string[] }
  ) {
    state.profile.nicknameSuggestions = payload.nicknameSuggestions;
  },
  [MutationTypes.CLEAR_ONBOARDING_STATE](state: State) {
    state.profile.loading = false;
    state.profile.success = false;
    state.profile.errors = null;
  },
};
