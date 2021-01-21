import { UserRequest } from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/registration/state";
import { AccountType } from "@/models/AccountType";

export type Mutations<S = State> = {
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void;
  [MutationTypes.SET_TYPE](state: S, payload: AccountType): void;
  [MutationTypes.REGISTRATION_CONTACT_FORM_LOADING](state: S): void;
  [MutationTypes.REGISTRATION_COMPANY_LOADING](state: S): void;
  [MutationTypes.REGISTRATION_COMPANY_LOADED](state: S): void;
  [MutationTypes.REGISTRATION_CONTACT_FORM_SENT](state: S, payload: UserRequest): void;
  [MutationTypes.REGISTRATION_COMPANY_SET_UID](state: S, payload: { uid: string }): void;
  [MutationTypes.REGISTRATION_COMPANY_SET_CONFIRMATION](
    state: S,
    payload: { isCompany: boolean }
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_LOADING](state: State, payload: boolean) {
    state.loading = payload;
  },
  [MutationTypes.SET_TYPE](state: State, payload: AccountType) {
    state.type = payload;
  },
  [MutationTypes.REGISTRATION_CONTACT_FORM_LOADING](state: State) {
    state.contactForm.loading = true;
  },
  [MutationTypes.REGISTRATION_CONTACT_FORM_SENT](state: State, payload: UserRequest) {
    state.contactForm.loading = false;
    state.contactForm.success = payload.success || false;
  },
  [MutationTypes.REGISTRATION_COMPANY_SET_CONFIRMATION](
    state: State,
    payload: { isCompany: boolean }
  ) {
    state.registerCompany.isCompany = payload.isCompany;
  },
  [MutationTypes.REGISTRATION_COMPANY_LOADING](state: State) {
    state.registerCompany.loading = true;
  },
  [MutationTypes.REGISTRATION_COMPANY_LOADED](state: State) {
    state.registerCompany.loading = false;
  },
  [MutationTypes.REGISTRATION_COMPANY_SET_UID](state: State, payload: { uid: string }) {
    state.registerCompany.loading = false;
  },
  [MutationTypes.REGISTRATION_COMPANY_SET_DATA](state: State, payload: { uid: string }) {
    state.registerCompany.loading = false;
  },
};
