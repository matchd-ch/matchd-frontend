import { RegisterCompany, UserRequest, VerifyAccount } from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/registration/state";

export type Mutations<S = State> = {
  [MutationTypes.REGISTRATION_CONTACT_FORM_SENDING](state: S): void;
  [MutationTypes.REGISTRATION_CONTACT_FORM_SENT](state: S, payload: UserRequest): void;
  [MutationTypes.REGISTRATION_COMPANY_LOADING](state: S): void;
  [MutationTypes.REGISTRATION_COMPANY_LOADED](state: S, payload: RegisterCompany): void;
  [MutationTypes.REGISTRATION_ACTIVATION_LOADING](state: S): void;
  [MutationTypes.REGISTRATION_ACTIVATION_LOADED](state: S, payload: VerifyAccount): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.REGISTRATION_CONTACT_FORM_SENDING](state: State) {
    state.contactForm.loading = true;
  },
  [MutationTypes.REGISTRATION_CONTACT_FORM_SENT](state: State, payload: UserRequest) {
    state.contactForm.loading = false;
    state.contactForm.success = payload.success || false;
  },
  [MutationTypes.REGISTRATION_COMPANY_LOADING](state: State) {
    state.registerCompany.loading = true;
  },
  [MutationTypes.REGISTRATION_COMPANY_LOADED](state: State) {
    state.registerCompany.loading = false;
  },
  [MutationTypes.REGISTRATION_ACTIVATION_LOADING](state: State) {
    state.verifyAccount.loading = true;
  },
  [MutationTypes.REGISTRATION_ACTIVATION_LOADED](state: State, payload: VerifyAccount) {
    state.verifyAccount.loading = false;
    state.verifyAccount.success = payload.success || false;
    state.verifyAccount.errors = payload.errors ? [payload.errors?.nonFieldErrors[0]?.code] : [];
  },
};
