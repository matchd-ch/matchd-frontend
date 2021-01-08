import { RootState } from "@/store";
import { AccountType } from "@/models/AccountType";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  type(state: State): AccountType;
};

export const getters: GetterTree<State, RootState> & Getters = {
  type: state => {
    return state.type;
  }
};
