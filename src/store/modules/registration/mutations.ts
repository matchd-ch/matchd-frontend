import { UserRequest } from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/registration/state";
import { AccountType } from "@/models/AccountType";

export type Mutations<S = State> = {
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void;
  [MutationTypes.SET_TYPE](state: S, payload: AccountType): void;
  [MutationTypes.REGISTRATION_CONTACT_FORM_LOADING](state: S): void;
  [MutationTypes.REGISTRATION_CONTACT_FORM_SENT](state: S, payload: UserRequest): void;
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
};
