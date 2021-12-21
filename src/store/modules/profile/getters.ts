import type { OnboardingState } from "@/models/OnboardingState";
import { RootState } from "@/store";
import type { ZipCity } from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  onboardingLoading(state: State): boolean;
  onboardingState(state: State): OnboardingState;
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
