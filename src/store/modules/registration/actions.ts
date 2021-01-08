import { RootState } from "@/store";
import { ActionContext, ActionTree } from "vuex";

import { ActionTypes } from "./action-types";
import { Mutations } from "@/store/modules/registration/mutations";
import { MutationTypes } from "@/store/modules/registration/mutation-types";
import { State } from "@/store/modules/registration/state";

import { NewAccount } from "@/models/NewAccount";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  [ActionTypes.SAVE_REGISTRATION]({ commit }: AugmentedActionContext, payload: NewAccount): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SAVE_REGISTRATION]({ commit }) {
    commit(MutationTypes.SET_LOADING, true);
    // async stuff
    commit(MutationTypes.SET_LOADING, false);
  }
};
