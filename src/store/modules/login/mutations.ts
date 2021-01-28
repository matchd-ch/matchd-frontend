import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import { ObtainJsonWebToken, RefreshToken, UserWithProfileNode } from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/login/state";

export type Mutations<S = State> = {
  [MutationTypes.LOGIN_LOADING](state: S): void;
  [MutationTypes.LOGIN_LOADED](state: S, payload: ObtainJsonWebToken): void;
  [MutationTypes.REFRESH_LOGIN_LOADING](state: S): void;
  [MutationTypes.REFRESH_LOGIN_LOADED](state: S, payload: RefreshToken): void;
  [MutationTypes.ME_LOADING](state: S): void;
  [MutationTypes.ME_LOADED](state: S, payload: UserWithProfileNode): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.LOGIN_LOADING](state: State) {
    state.loading = true;
  },
  [MutationTypes.LOGIN_LOADED](state: State, payload: ObtainJsonWebToken) {
    state.loading = false;
    state.success = payload.success || false;
    state.errors = errorCodeMapper(payload.errors);
    state.jwtToken = payload.token || "";
    state.refreshToken = payload.refreshToken || "";
  },
  [MutationTypes.REFRESH_LOGIN_LOADING](state: State) {
    state.loading = true;
  },
  [MutationTypes.REFRESH_LOGIN_LOADED](state: State, payload: RefreshToken) {
    state.loading = false;
    state.success = payload.success || false;
    state.errors = errorCodeMapper(payload.errors);
    state.jwtToken = payload.token || "";
    state.refreshToken = payload.refreshToken || "";
  },
  [MutationTypes.ME_LOADING](state: State) {
    state.me.loading = true;
  },
  [MutationTypes.ME_LOADED](state: State, payload: UserWithProfileNode) {
    state.me.loading = false;
    state.user = {
      ...payload,
    };
  },
};
