import { MatchdApiError } from "@/models/MatchdApiError";
import { RootState } from "@/store";
import { JobPostingType } from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  jobPostingLoading(state: State): boolean;
  jobPostingState(state: State): { success: boolean; errors: MatchdApiError | null; id: string };
  jobPostingId(state: State): string;
  currentJobPostingStep(state: State): number;
  currentJobPosting(state: State): JobPostingType | null;
};

export const getters: GetterTree<State, RootState> & Getters = {
  jobPostingLoading(state: State): boolean {
    return state.jobPosting.loading;
  },
  jobPostingState(state: State): { success: boolean; errors: MatchdApiError | null; id: string } {
    return {
      success: state.jobPosting.success,
      errors: state.jobPosting.errors || null,
      id: state.jobPosting.id,
    };
  },
  jobPostingId(state: State): string {
    return state.jobPosting.id;
  },
  currentJobPostingStep(state: State): number {
    return state.currentJobPosting.data?.formStep || 1;
  },
  currentJobPosting(state: State): JobPostingType | null {
    return state.currentJobPosting.data;
  },
};
