import { RootState } from "@/store";
import { AccountType } from "@/models/AccountType";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  type(state: State): AccountType;
  contactFormSending(state: State): boolean;
  contactFormSent(state: State): boolean;
  companyRegistrationLoading(state: State): boolean;
  activationState(state: State): { success: boolean; errors: string[] };
  activationLoading(state: State): boolean;
};

export const getters: GetterTree<State, RootState> & Getters = {
  type: state => {
    return state.type;
  },
  contactFormSending(state: State): boolean {
    return state.contactForm.loading;
  },
  contactFormSent(state: State): boolean {
    return state.contactForm.success && !state.contactForm.loading;
  },
  companyRegistrationLoading(state: State): boolean {
    return state.registerCompany.loading;
  },
  activationLoading(state: State): boolean {
    return state.verifyAccount.loading;
  },
  activationState(state: State): { success: boolean; errors: string[] } {
    return {
      success: state.verifyAccount.success,
      errors: state.verifyAccount.errors || [],
    };
  },
};
