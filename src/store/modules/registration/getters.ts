import type { ActivationState } from "@/models/ActivationState";
import type { CompanyRegistrationState } from "@/models/CompanyRegistrationState";
import type { StudentRegistrationState } from "@/models/StudentRegistrationState";
import type { RootState } from "@/store";
import type { AccountType } from "@/models/AccountType";
import type { GetterTree } from "vuex";
import type { State } from "./state";

export type Getters = {
  type(state: State): AccountType;
  contactFormSending(state: State): boolean;
  contactFormSent(state: State): boolean;
  companyRegistrationLoading(state: State): boolean;
  companyRegistrationState(state: State): CompanyRegistrationState;
  studentRegistrationLoading(state: State): boolean;
  studentRegistrationState(state: State): StudentRegistrationState;
  activationLoading(state: State): boolean;
  activationState(state: State): ActivationState;
};

export const getters: GetterTree<State, RootState> & Getters = {
  type: (state) => {
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
  companyRegistrationState(state: State): CompanyRegistrationState {
    return {
      success: state.registerCompany.success,
      errors: state.registerCompany.errors || null,
    };
  },
  studentRegistrationLoading(state: State): boolean {
    return state.registerStudent.loading;
  },
  studentRegistrationState(state: State): StudentRegistrationState {
    return {
      success: state.registerStudent.success,
      errors: state.registerStudent.errors || null,
    };
  },
  activationLoading(state: State): boolean {
    return state.verifyAccount.loading;
  },
  activationState(state: State): ActivationState {
    return {
      success: state.verifyAccount.success,
      errors: state.verifyAccount.errors || null,
    };
  },
};
