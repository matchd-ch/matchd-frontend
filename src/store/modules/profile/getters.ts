import { AttachmentKey } from "@/api/models/types";
import { MatchdApiError } from "@/models/MatchdApiError";
import { RootState } from "@/store";
import {
  AttachmentType,
  JobOptionType,
  JobPositionType,
  LanguageType,
  LevelType,
  SkillType,
  UploadConfiguration,
  ZipCityType,
} from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  onboardingLoading(state: State): boolean;
  onboardingState(state: State): { success: boolean; errors: MatchdApiError | null };
  cityByZip(state: State): (payload: { zip: string }) => string;
  nicknameSuggestions(state: State): string[];
  jobOptions(state: State): JobOptionType[];
  jobPositions(state: State): JobPositionType[];
  skills(state: State): SkillType[];
  languages(state: State): LanguageType[];
  languageLevels(state: State): LevelType[];
  uploadConfigurationByKey(
    state: State
  ): (payload: { key: AttachmentKey }) => UploadConfiguration | undefined;
  attachmentsByKey(state: State): (payload: { key: AttachmentKey }) => AttachmentType[];
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
  nicknameSuggestions(state: State): string[] {
    return state.profile.nicknameSuggestions;
  },
  jobOptions(state: State): JobOptionType[] {
    return state.jobOptions.data;
  },
  jobPositions(state: State): JobPositionType[] {
    return state.jobPositions.data;
  },
  skills(state: State): SkillType[] {
    return state.skills.data;
  },
  languages(state: State): LanguageType[] {
    return state.languages.data;
  },
  languageLevels(state: State): LevelType[] {
    return state.languages.levels;
  },
  uploadConfigurationByKey: (state: State) => (payload: { key: AttachmentKey }) => {
    return state.uploadConfigurations.data.find(
      attachmentType => attachmentType.key === payload.key
    );
  },
  attachmentsByKey: (state: State) => (payload: { key: AttachmentKey }) => {
    return state.attachments[payload.key]?.data || [];
  },
};
