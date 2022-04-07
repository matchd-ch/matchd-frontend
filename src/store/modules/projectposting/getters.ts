import { ProjectPostingProjectPostingFragment } from "@/api/queries/projectPostingFragment.generated";
import { ProjectPostingState } from "@/models/ProjectPostingState";
import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  projectPostingLoading(state: State): boolean;
  projectPostingState(state: State): ProjectPostingState;
  projectPostingId(state: State): string;
  currentProjectPostingStep(state: State): number;
  currentProjectPosting(state: State): ProjectPostingProjectPostingFragment | null;
};

export const getters: GetterTree<State, RootState> & Getters = {
  projectPostingLoading(state: State) {
    return state.projectPosting.loading;
  },
  projectPostingState(state: State) {
    return {
      success: state.projectPosting.success,
      errors: state.projectPosting.errors || null,
      id: state.projectPosting.id,
      slug: state.projectPosting.slug,
    };
  },
  projectPostingId(state: State) {
    return state.projectPosting.id;
  },
  currentProjectPostingStep(state: State) {
    return state.currentProjectPosting.data?.formStep || 1;
  },
  currentProjectPosting(state: State) {
    return state.currentProjectPosting.data;
  },
};
