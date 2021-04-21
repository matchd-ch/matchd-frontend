import { ProfileType } from "@/api/models/types";
import type { LoginState } from "@/models/LoginState";
import type { LogoutState } from "@/models/LogoutState";
import { PasswordResetState } from "@/models/PasswordResetState";
import type { SendPasswordResetEmailState } from "@/models/SendPasswordResetEmailState";
import { RootState } from "@/store";
import type { MatchHints, User } from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  loginLoading(state: State): boolean;
  loginState(state: State): LoginState;
  logoutLoading(state: State): boolean;
  logoutState(state: State): LogoutState;
  user(state: State): User | null;
  profileStep(state: State, getters: Getters): number | undefined;
  isStudent(state: State): boolean;
  isCompany(state: State): boolean;
  isUniversity(state: State): boolean;
  isLoggedIn(state: State): boolean;
  refreshToken(state: State): string;
  sendPasswordResetEmailLoading(state: State): boolean;
  sendPasswordResetEmailState(state: State): SendPasswordResetEmailState;
  passwordResetLoading(state: State): boolean;
  passwordResetState(state: State): PasswordResetState;
};

export const getters: GetterTree<State, RootState> & Getters = {
  loginLoading(state: State): boolean {
    return state.login.loading;
  },
  loginState(state: State): LoginState {
    return {
      success: state.login.success,
      errors: state.login.errors || null,
    };
  },
  logoutLoading(state: State): boolean {
    return state.logout.loading;
  },
  logoutState(state: State): LogoutState {
    return {
      success: state.logout.success,
      errors: state.logout.errors || null,
    };
  },
  user(state: State): User | null {
    return state.user;
  },
  profileStep(state: State, getters: Getters): number | undefined {
    if (getters["isStudent"]) {
      return state.user?.student?.profileStep;
    } else if (getters["isCompany"] || getters["isUniversity"]) {
      return state.user?.company?.profileStep;
    } else {
      return;
    }
  },
  isStudent(state: State): boolean {
    if (!state.user?.type) {
      return false;
    }
    return [ProfileType.Student, ProfileType.CollegeStudent, ProfileType.Junior].includes(
      state.user.type
    );
  },
  isCompany(state: State): boolean {
    if (!state.user?.type) {
      return false;
    }
    return [ProfileType.Company].includes(state.user.type);
  },
  isUniversity(state: State): boolean {
    if (!state.user?.type) {
      return false;
    }
    return [ProfileType.University].includes(state.user.type);
  },
  isLoggedIn(state: State): boolean {
    return state.isLoggedIn;
  },
  refreshToken(state: State): string {
    return state.refreshToken;
  },
  sendPasswordResetEmailLoading(state: State): boolean {
    return state.sendPasswordResetEmail.loading;
  },
  sendPasswordResetEmailState(state: State): SendPasswordResetEmailState {
    return {
      success: state.sendPasswordResetEmail.success,
      errors: state.sendPasswordResetEmail.errors || null,
    };
  },
  passwordResetLoading(state: State): boolean {
    return state.passwordReset.loading;
  },
  passwordResetState(state: State): PasswordResetState {
    return {
      success: state.passwordReset.success,
      errors: state.passwordReset.errors || null,
      tokenVerificationComplete: state.passwordReset.tokenVerificationComplete,
      tokenIsValid: state.passwordReset.tokenIsValid,
    };
  },
};
