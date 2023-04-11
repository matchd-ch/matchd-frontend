import type { ChallengeChallengeFragment } from "@/api/queries/challengeFragment.generated";
import type { ChallengeState } from "@/models/ChallengeState";
import type { DeleteChallengeState } from "@/models/DeleteChallengeState";
import type { RootState } from "@/store";
import type { GetterTree } from "vuex";
import type { State } from "./state";

export type Getters = {
  challengeLoading(state: State): boolean;
  challengeState(state: State): ChallengeState;
  challengeId(state: State): string;
  currentChallengeStep(state: State): number;
  currentChallenge(state: State): ChallengeChallengeFragment | null;
  deleteChallengeLoading(state: State): boolean;
  deleteChallengeState(state: State): DeleteChallengeState;
};

export const getters: GetterTree<State, RootState> & Getters = {
  challengeLoading(state: State) {
    return state.challenge.loading;
  },
  challengeState(state: State) {
    return {
      success: state.challenge.success,
      errors: state.challenge.errors || null,
      id: state.challenge.id,
      slug: state.challenge.slug,
    };
  },
  challengeId(state: State) {
    return state.challenge.id;
  },
  currentChallengeStep(state: State) {
    return state.currentChallenge.data?.formStep || 1;
  },
  currentChallenge(state: State) {
    return state.currentChallenge.data;
  },
  deleteChallengeLoading(state: State): boolean {
    return state.deleteChallenge.loading;
  },
  deleteChallengeState(state: State): DeleteChallengeState {
    return {
      success: state.deleteChallenge.success,
      errors: state.deleteChallenge.errors || null,
    };
  },
};
