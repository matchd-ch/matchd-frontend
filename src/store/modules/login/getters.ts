import { MatchdApiError } from "@/models/MatchdApiError";
import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  loginLoading(state: State): boolean;
  loginState(state: State): { success: boolean; errors: MatchdApiError | null };
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
};
