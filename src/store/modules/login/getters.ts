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
};
