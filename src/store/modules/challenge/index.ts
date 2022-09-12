import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from "vuex";

// TODO: How to surpass cyclical dependency linting errors cleanly?
import { RootState } from "@/store";

import { actions, Actions } from "./actions";
import { getters, Getters } from "./getters";
import { mutations, Mutations } from "./mutations";
import { state } from "./state";

// eslint-disable-next-line prettier/prettier
import type { State } from "./state";

export { State };

export type ChallengeStore<S = State> = Omit<VuexStore<S>, "getters" | "commit" | "dispatch"> & {
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
