import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import type {
  CompanyProfileStep1,
  CompanyProfileStep2,
  CompanyProfileStep3,
  StudentProfileStep1,
  StudentProfileStep2,
  StudentProfileStep4,
  StudentProfileStep5,
  StudentProfileStep6,
  UniversityProfileStep1,
  UniversityProfileStep2,
  UniversityProfileStep3,
  ZipCity,
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
      | StudentProfileStep4
      | StudentProfileStep5
      | StudentProfileStep6
  ): void;
  [MutationTypes.COMPANY_ONBOARDING_STEP_LOADING](state: S): void;
  [MutationTypes.COMPANY_ONBOARDING_STEP_LOADED](
    state: S,
    payload: CompanyProfileStep1 | CompanyProfileStep2 | CompanyProfileStep3
  ): void;
  [MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING](state: S): void;
  [MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED](
    state: S,
    payload: UniversityProfileStep1 | UniversityProfileStep2 | UniversityProfileStep3
  ): void;
  [MutationTypes.ZIP_CITY_LOADING](state: S): void;
  [MutationTypes.ZIP_CITY_LOADED](state: S, payload: ZipCity[]): void;
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
  [MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING](state: State) {
    state.profile.loading = true;
  },
  [MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED](
    state: State,
    payload: UniversityProfileStep1 | UniversityProfileStep2 | UniversityProfileStep3
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
};
