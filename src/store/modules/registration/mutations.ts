import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/registration/state";
import { AccountType } from "@/models/AccountType";

export type Mutations<S = State> = {
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void;
  [MutationTypes.SET_TYPE](state: S, payload: AccountType): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_LOADING](state: State, payload: boolean) {
    state.loading = payload;
  },
  [MutationTypes.SET_TYPE](state: State, payload: AccountType) {
    state.type = payload;
  },
};
