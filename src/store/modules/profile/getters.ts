import type { ZipCity } from "@/api/models/types";
import type { OnboardingState } from "@/models/OnboardingState";
import type { PasswordChangeState } from "@/models/PasswordChangeState";
import type { UpdateStudentState } from "@/models/UpdateStudentState";
import type { UpdateUserState } from "@/models/UpdateUserState";
import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  onboardingLoading(state: State): boolean;
  onboardingState(state: State): OnboardingState;
  updateStudentLoading(state: State): boolean;
  updateStudentState(state: State): UpdateStudentState;
  updateUserLoading(state: State): boolean;
  updateUserState(state: State): UpdateUserState;
  passwordChangeLoading(state: State): boolean;
  passwordChangeState(state: State): PasswordChangeState;
  cityByZip(state: State): (payload: { zip: string }) => string;
  nicknameSuggestions(state: State): string[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  onboardingLoading(state: State): boolean {
    return state.profile.loading;
  },
  onboardingState(state: State): OnboardingState {
    return {
      success: state.profile.success,
      errors: state.profile.errors || null,
    };
  },
  updateStudentLoading(state: State): boolean {
    return state.updateStudent.loading;
  },
  updateStudentState(state: State): UpdateStudentState {
    return {
      success: state.updateStudent.success,
      errors: state.updateStudent.errors || null,
    };
  },
  updateUserLoading(state: State): boolean {
    return state.updateUser.loading;
  },
  updateUserState(state: State): UpdateUserState {
    return {
      success: state.updateStudent.success,
      errors: state.updateStudent.errors || null,
    };
  },
  passwordChangeLoading(state: State): boolean {
    return state.passwordChange.loading;
  },
  passwordChangeState(state: State): PasswordChangeState {
    return {
      success: state.passwordChange.success,
      errors: state.passwordChange.errors || null,
    };
  },
  cityByZip:
    (state: State) =>
    (payload: { zip: string }): string => {
      const match = state.zipCity.data.find((location: ZipCity) => location.zip === payload.zip);
      return match?.city || "";
    },
  nicknameSuggestions(state: State): string[] {
    return state.profile.nicknameSuggestions;
  },
};
