import { RootState } from "@/store";
import { AccountType } from "@/models/AccountType";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  type(state: State): AccountType;
  contactFormLoading(state: State): boolean;
  contactFormSent(state: State): boolean;
};

export const getters: GetterTree<State, RootState> & Getters = {
  type: state => {
    return state.type;
  },
  contactFormLoading(state: State): boolean {
    return state.contactForm.loading;
  },
  contactFormSent(state: State): boolean {
    return state.contactForm.success && !state.contactForm.loading;
  },
};
