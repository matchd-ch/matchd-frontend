import { MatchdApiError } from "@/models/MatchdApiError";
import { RootState } from "@/store";
import { AccountType } from "@/models/AccountType";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  type(state: State): AccountType;
  contactFormSending(state: State): boolean;
  contactFormSent(state: State): boolean;
  companyRegistrationLoading(state: State): boolean;
  companyRegistrationState(state: State): { success: boolean; errors: MatchdApiError | null };
  studentRegistrationLoading(state: State): boolean;
  studentRegistrationState(state: State): { success: boolean; errors: MatchdApiError | null };
  activationLoading(state: State): boolean;
  activationState(state: State): { success: boolean; errors: MatchdApiError | null };
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
  companyRegistrationState(state: State): { success: boolean; errors: MatchdApiError | null } {
    return {
      success: state.registerCompany.success,
      errors: state.registerCompany.errors || null,
    };
  },
  studentRegistrationLoading(state: State): boolean {
    return state.registerStudent.loading;
  },
  studentRegistrationState(state: State): { success: boolean; errors: MatchdApiError | null } {
    return {
      success: state.registerStudent.success,
      errors: state.registerStudent.errors || null,
    };
  },
  activationLoading(state: State): boolean {
    return state.verifyAccount.loading;
  },
  activationState(state: State): { success: boolean; errors: MatchdApiError | null } {
    return {
      success: state.verifyAccount.success,
      errors: state.verifyAccount.errors || null,
    };
  },
};
