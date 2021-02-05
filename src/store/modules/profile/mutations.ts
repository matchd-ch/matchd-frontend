import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import { StudentProfileStep1, ZipCityType } from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/profile/state";

export type Mutations<S = State> = {
  [MutationTypes.ONBOARDING_STEP1_LOADING](state: S): void;
  [MutationTypes.ONBOARDING_STEP1_LOADED](state: S, payload: StudentProfileStep1): void;
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
  [MutationTypes.ZIP_CITY_LOADING](state: State) {
    state.zipCity.loading = true;
  },
  [MutationTypes.ZIP_CITY_LOADED](state: State, payload: ZipCityType[]) {
    state.zipCity.loading = false;
    state.zipCity.data = payload;
  },
};
