import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import { ObtainJsonWebToken } from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/login/state";

export type Mutations<S = State> = {
  [MutationTypes.LOGIN_LOADING](state: S): void;
  [MutationTypes.LOGIN_LOADED](state: S, payload: ObtainJsonWebToken): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.LOGIN_LOADING](state: State) {
    state.loading = true;
  },
  [MutationTypes.LOGIN_LOADED](state: State, payload: ObtainJsonWebToken) {
    state.loading = false;
    state.success = payload.success || false;
    state.errors = errorCodeMapper(payload.errors);
  },
};
