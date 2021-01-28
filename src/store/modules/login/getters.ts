import { MatchdApiError } from "@/models/MatchdApiError";
import { RootState } from "@/store";
import { UserWithProfileNode } from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  loginLoading(state: State): boolean;
  loginState(state: State): { success: boolean; errors: MatchdApiError | null };
  user(state: State): UserWithProfileNode | null;
  jwtToken(state: State): string;
  refreshToken(state: State): string;
  sendPasswordResetEmailLoading(state: State): boolean;
  sendPasswordResetEmailState(state: State): { success: boolean; errors: MatchdApiError | null };
  passwordResetLoading(state: State): boolean;
  passwordResetState(
    state: State
  ): {
    success: boolean;
    errors: MatchdApiError | null;
    tokenVerificationComplete: boolean;
    tokenIsValid: boolean;
  };
};

export const getters: GetterTree<State, RootState> & Getters = {
  loginLoading(state: State): boolean {
    return state.loading;
  },
  loginState(state: State): { success: boolean; errors: MatchdApiError | null } {
    return {
      success: state.success,
      errors: state.errors || null,
    };
  },
  user(state: State): UserWithProfileNode | null {
    return state.user;
  },
  jwtToken(state: State): string {
    return state.jwtToken;
  },
  refreshToken(state: State): string {
    return state.refreshToken;
  },
  sendPasswordResetEmailLoading(state: State): boolean {
    return state.sendPasswordResetEmail.loading;
  },
  sendPasswordResetEmailState(state: State): { success: boolean; errors: MatchdApiError | null } {
    return {
      success: state.sendPasswordResetEmail.success,
      errors: state.sendPasswordResetEmail.errors || null,
    };
  },
  passwordResetLoading(state: State): boolean {
    return state.passwordReset.loading;
  },
  passwordResetState(
    state: State
  ): {
    success: boolean;
    errors: MatchdApiError | null;
    tokenVerificationComplete: boolean;
    tokenIsValid: boolean;
  } {
    return {
      success: state.passwordReset.success,
      errors: state.passwordReset.errors || null,
      tokenVerificationComplete: state.passwordReset.tokenVerificationComplete,
      tokenIsValid: state.passwordReset.tokenIsValid,
    };
  },
};
