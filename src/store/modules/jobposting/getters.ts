import { MatchdApiError } from "@/models/MatchdApiError";
import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  jobPostingLoading(state: State): boolean;
  jobPostingState(state: State): { success: boolean; errors: MatchdApiError | null };
};

export const getters: GetterTree<State, RootState> & Getters = {
  jobPostingLoading(state: State): boolean {
    return state.jobPosting.loading;
  },
  jobPostingState(state: State): { success: boolean; errors: MatchdApiError | null } {
    return {
      success: state.jobPosting.success,
      errors: state.jobPosting.errors || null,
    };
  },
};
