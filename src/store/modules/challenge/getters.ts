import { ChallengeChallengeFragment } from "@/api/queries/challengeFragment.generated";
import { ChallengeState } from "@/models/ChallengeState";
import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  challengeLoading(state: State): boolean;
  challengeState(state: State): ChallengeState;
  challengeId(state: State): string;
  currentChallengeStep(state: State): number;
  currentChallenge(state: State): ChallengeChallengeFragment | null;
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
};
