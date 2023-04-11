import type { Store as VuexStore } from "vuex";
import { type CommitOptions, type DispatchOptions, type Module } from "vuex";

// TODO: How to surpass cyclical dependency linting errors cleanly?
import { type RootState } from "@/store";

import { actions, type Actions } from "./actions";
import { getters, type Getters } from "./getters";
import { mutations, type Mutations } from "./mutations";
import { state } from "./state";

// eslint-disable-next-line prettier/prettier
import type { State } from "./state";

export type { State };

export type ContentStore<S = State> = Omit<VuexStore<S>, "getters" | "commit" | "dispatch"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export const store: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions,
  // namespaced: true // Can't be used at this point, since vuex 4 with action-types won't work with namespaces yet
};
