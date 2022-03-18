import type {
  CompanyProfileAdvantagesPayload,
  CompanyProfileBaseDataPayload,
  CompanyProfileRelationsPayload,
  CompanyProfileValuesPayload,
  StudentProfileAbilitiesPayload,
  StudentProfileBaseDataPayload,
  StudentProfileCharacterPayload,
  StudentProfileConditionPayload,
  StudentProfileEmploymentPayload,
  StudentProfileSpecificDataPayload,
  UniversityProfileBaseDataPayload,
  UniversityProfileRelationsPayload,
  UniversityProfileSpecificDataPayload,
  UniversityProfileValuesPayload,
  ZipCity,
} from "@/api/models/types";
import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import { State } from "@/store/modules/profile/state";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

export type StudentProfileStep =
  | StudentProfileBaseDataPayload
  | StudentProfileEmploymentPayload
  | StudentProfileAbilitiesPayload
  | StudentProfileSpecificDataPayload
  | StudentProfileConditionPayload
  | StudentProfileCharacterPayload;

export type CompanyProfileStep =
  | CompanyProfileBaseDataPayload
  | CompanyProfileRelationsPayload
  | CompanyProfileAdvantagesPayload
  | CompanyProfileValuesPayload;

export type UniversityProfileStep =
  | UniversityProfileBaseDataPayload
  | UniversityProfileSpecificDataPayload
  | UniversityProfileRelationsPayload
  | UniversityProfileValuesPayload;

export type Mutations<S = State> = {
  [MutationTypes.STUDENT_ONBOARDING_STEP_LOADING](state: S): void;
  [MutationTypes.STUDENT_ONBOARDING_STEP_LOADED](state: S, payload: StudentProfileStep): void;
  [MutationTypes.COMPANY_ONBOARDING_STEP_LOADING](state: S): void;
  [MutationTypes.COMPANY_ONBOARDING_STEP_LOADED](state: S, payload: CompanyProfileStep): void;
  [MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING](state: S): void;
  [MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED](state: S, payload: UniversityProfileStep): void;
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
  [MutationTypes.STUDENT_ONBOARDING_STEP_LOADED](state: State, payload: StudentProfileStep) {
    state.profile.loading = false;
    state.profile.success = payload.success || false;
    state.profile.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.COMPANY_ONBOARDING_STEP_LOADING](state: State) {
    state.profile.loading = true;
  },
  [MutationTypes.COMPANY_ONBOARDING_STEP_LOADED](state: State, payload: CompanyProfileStep) {
    state.profile.loading = false;
    state.profile.success = payload.success || false;
    state.profile.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADING](state: State) {
    state.profile.loading = true;
  },
  [MutationTypes.UNIVERSITY_ONBOARDING_STEP_LOADED](state: State, payload: UniversityProfileStep) {
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
