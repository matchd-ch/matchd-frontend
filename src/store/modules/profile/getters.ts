import { MatchdApiError } from "@/models/MatchdApiError";
import { RootState } from "@/store";
import { ZipCityType } from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  onboardingLoading(state: State): boolean;
  onboardingState(state: State): { success: boolean; errors: MatchdApiError | null };
  cityByZip(state: State): (payload: { zip: string }) => string;
  nickNameSuggestions(state: State): string[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  onboardingLoading(state: State): boolean {
    return state.profile.loading;
  },
  onboardingState(state: State): { success: boolean; errors: MatchdApiError | null } {
    return {
      success: state.profile.success,
      errors: state.profile.errors || null,
    };
  },
  cityByZip: (state: State) => (payload: { zip: string }) => {
    const match = state.zipCity.data.find((location: ZipCityType) => location.zip === payload.zip);
    return match?.city || "";
  },
  nickNameSuggestions(state: State): string[] {
    return state.profile.nickNameSuggestions;
  },
};
