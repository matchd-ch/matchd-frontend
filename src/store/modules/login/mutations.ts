import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import {
  ObtainJsonWebToken,
  PasswordReset,
  RefreshToken,
  SendPasswordResetEmail,
  UserWithProfileNode,
} from "api";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { State } from "@/store/modules/login/state";

export type Mutations<S = State> = {
  [MutationTypes.LOGIN_LOADING](state: S): void;
  [MutationTypes.LOGIN_LOADED](state: S, payload: ObtainJsonWebToken): void;
  [MutationTypes.REFRESH_LOGIN_LOADING](state: S): void;
  [MutationTypes.REFRESH_LOGIN_LOADED](state: S, payload: RefreshToken): void;
  [MutationTypes.ME_LOADING](state: S): void;
  [MutationTypes.ME_LOADED](state: S, payload: UserWithProfileNode): void;
  [MutationTypes.SEND_PASSWORD_RESET_EMAIL_LOADING](state: S): void;
  [MutationTypes.SEND_PASSWORD_RESET_EMAIL_LOADED](state: S, payload: SendPasswordResetEmail): void;
  [MutationTypes.PASSWORD_RESET_LOADING](state: S): void;
  [MutationTypes.PASSWORD_RESET_LOADED](state: S, payload: PasswordReset): void;
  [MutationTypes.VERIFY_PASSWORD_RESET_TOKEN_LOADING](state: S): void;
  [MutationTypes.VERIFY_PASSWORD_RESET_TOKEN_LOADED](state: S, payload: { valid: boolean }): void;
  [MutationTypes.RESET_PASSWORD_RESET_STATE](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.LOGIN_LOADING](state: State) {
    state.loading = true;
  },
  [MutationTypes.LOGIN_LOADED](state: State, payload: ObtainJsonWebToken) {
    state.loading = false;
    state.success = payload.success || false;
    state.errors = errorCodeMapper(payload.errors);
    state.jwtToken = payload.token || "";
    state.refreshToken = payload.refreshToken || "";
  },
  [MutationTypes.REFRESH_LOGIN_LOADING](state: State) {
    state.loading = true;
  },
  [MutationTypes.REFRESH_LOGIN_LOADED](state: State, payload: RefreshToken) {
    state.loading = false;
    state.success = payload.success || false;
    state.errors = errorCodeMapper(payload.errors);
    state.jwtToken = payload.token || "";
    state.refreshToken = payload.refreshToken || "";
  },
  [MutationTypes.ME_LOADING](state: State) {
    state.me.loading = true;
  },
  [MutationTypes.ME_LOADED](state: State, payload: UserWithProfileNode) {
    state.me.loading = false;
    state.user = {
      ...payload,
    };
  },
  [MutationTypes.SEND_PASSWORD_RESET_EMAIL_LOADING](state: State) {
    state.sendPasswordResetEmail.loading = true;
  },
  [MutationTypes.SEND_PASSWORD_RESET_EMAIL_LOADED](state: State, payload: SendPasswordResetEmail) {
    state.sendPasswordResetEmail.loading = false;
    state.sendPasswordResetEmail.success = payload.success || false;
    state.sendPasswordResetEmail.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.PASSWORD_RESET_LOADING](state: State) {
    state.passwordReset.loading = true;
  },
  [MutationTypes.PASSWORD_RESET_LOADED](state: State, payload: PasswordReset) {
    state.passwordReset.loading = false;
    state.passwordReset.success = payload.success || false;
    state.passwordReset.errors = errorCodeMapper(payload.errors);
  },
  [MutationTypes.VERIFY_PASSWORD_RESET_TOKEN_LOADING](state: State) {
    state.passwordReset.tokenVerificationloading = true;
  },
  [MutationTypes.VERIFY_PASSWORD_RESET_TOKEN_LOADED](state: State, payload: { valid: boolean }) {
    state.passwordReset.tokenVerificationComplete = true;
    state.passwordReset.tokenVerificationloading = false;
    state.passwordReset.tokenIsValid = payload.valid;
  },
  [MutationTypes.RESET_PASSWORD_RESET_STATE](state: State) {
    state.passwordReset = {
      loading: false,
      success: false,
      errors: null,
      tokenVerificationComplete: false,
      tokenVerificationloading: false,
      tokenIsValid: false,
    };
    state.sendPasswordResetEmail = {
      loading: false,
      success: false,
      errors: null,
    };
  },
};
