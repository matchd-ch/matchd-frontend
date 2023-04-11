import type {
  ObtainJsonWebToken,
  PasswordReset,
  RefreshToken,
  SendPasswordResetEmail,
} from "@/api/models/types";
import type { MeQuery } from "@/api/queries/me.generated";
import { errorCodeMapper } from "@/helpers/errorCodeMapper";
import type { State } from "@/store/modules/login/state";
import type { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

export type Mutations<S = State> = {
  [MutationTypes.LOGIN_LOADING](state: S): void;
  [MutationTypes.LOGIN_LOADED](state: S, payload: ObtainJsonWebToken): void;
  [MutationTypes.LOGOUT_LOADING](state: S): void;
  [MutationTypes.LOGOUT_LOADED](state: S, payload: ObtainJsonWebToken): void;
  [MutationTypes.REFRESH_LOGIN_LOADING](state: S): void;
  [MutationTypes.REFRESH_LOGIN_LOADED](state: S, payload: RefreshToken): void;
  [MutationTypes.ME_LOADING](state: S): void;
  [MutationTypes.ME_LOADED](state: S, payload: MeQuery): void;
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
    state.login.loading = true;
  },
  [MutationTypes.LOGIN_LOADED](state: State, payload: ObtainJsonWebToken) {
    state.login.loading = false;
    state.login.success = payload.success || false;
    state.login.errors = errorCodeMapper(payload.errors);
    state.isLoggedIn = payload.success || false;
    state.refreshToken = payload.refreshToken || null;
    state.accessToken = payload.token || null;
  },
  [MutationTypes.LOGOUT_LOADING](state: State) {
    state.logout.loading = true;
  },
  [MutationTypes.LOGOUT_LOADED](state: State, payload: ObtainJsonWebToken) {
    state.logout.loading = false;
    state.logout.success = payload.success || false;
    state.logout.errors = errorCodeMapper(payload.errors);
    state.isLoggedIn = false;
    state.refreshToken = null;
    state.accessToken = null;
    state.user = null;
  },
  [MutationTypes.REFRESH_LOGIN_LOADING](state: State) {
    state.login.loading = true;
  },
  [MutationTypes.REFRESH_LOGIN_LOADED](state: State, payload: RefreshToken) {
    state.login.loading = false;
    state.login.success = payload.success || false;
    state.login.errors = errorCodeMapper(payload.errors);
    state.isLoggedIn = payload.success || false;
    state.refreshToken = payload.refreshToken || null;
    state.accessToken = payload.token || null;
  },
  [MutationTypes.ME_LOADING](state: State) {
    state.me.loading = true;
  },
  [MutationTypes.ME_LOADED](state: State, payload: MeQuery) {
    state.me.loading = false;
    state.user = payload?.me ?? null;
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
