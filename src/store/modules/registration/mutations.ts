import type {
  RegisterCompany,
  RegisterStudent,
  UserRequestPayload,
  VerifyAccount,
} from "@/api/models/types";
import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import type { State } from "@/store/modules/registration/state";
import type { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

export type Mutations<S = State> = {
  [MutationTypes.REGISTRATION_CONTACT_FORM_SENDING](state: S): void;
  [MutationTypes.REGISTRATION_CONTACT_FORM_SENT](state: S, payload: UserRequestPayload): void;
  [MutationTypes.REGISTRATION_COMPANY_LOADING](state: S): void;
  [MutationTypes.REGISTRATION_COMPANY_LOADED](state: S, payload: RegisterCompany): void;
  [MutationTypes.REGISTRATION_STUDENT_LOADING](state: S): void;
  [MutationTypes.REGISTRATION_STUDENT_LOADED](state: S, payload: RegisterStudent): void;
  [MutationTypes.REGISTRATION_ACTIVATION_LOADING](state: S): void;
  [MutationTypes.REGISTRATION_ACTIVATION_LOADED](state: S, payload: VerifyAccount): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.REGISTRATION_CONTACT_FORM_SENDING](state: State) {
    state.contactForm.loading = true;
  },
  [MutationTypes.REGISTRATION_CONTACT_FORM_SENT](state: State, payload: UserRequestPayload) {
    state.contactForm.loading = false;
    state.contactForm.success = payload.success || false;
  },
  [MutationTypes.REGISTRATION_COMPANY_LOADING](state: State) {
    state.registerCompany.loading = true;
  },
  [MutationTypes.REGISTRATION_COMPANY_LOADED](state: State, payload: RegisterCompany) {
    state.registerCompany.loading = false;
    state.registerCompany.success = payload.success || false;
    state.registerCompany.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.REGISTRATION_STUDENT_LOADING](state: State) {
    state.registerStudent.loading = true;
  },
  [MutationTypes.REGISTRATION_STUDENT_LOADED](state: State, payload: RegisterStudent) {
    state.registerStudent.loading = false;
    state.registerStudent.success = payload.success || false;
    state.registerStudent.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.REGISTRATION_ACTIVATION_LOADING](state: State) {
    state.verifyAccount.loading = true;
  },
  [MutationTypes.REGISTRATION_ACTIVATION_LOADED](state: State, payload: VerifyAccount) {
    state.verifyAccount.loading = false;
    state.verifyAccount.success = payload.success || false;
    state.verifyAccount.errors = errorCodeMapper(payload.errors);
  },
};
