import {
  type ChallengeStore,
  type State as ChallengeState,
  store as challenge,
} from "@/store/modules/challenge";
import {
  type ContentStore,
  type State as ContentState,
  store as content,
} from "@/store/modules/content";
import {
  type JobPostingStore,
  type State as JobPostingState,
  store as jobPosting,
} from "@/store/modules/jobposting";
import { type LoginStore, type State as LoginState, store as login } from "@/store/modules/login";
import {
  type ProfileStore,
  type State as ProfileState,
  store as profile,
} from "@/store/modules/profile";
import {
  type RegistrationStore,
  type State as RegistrationState,
  store as registration,
} from "@/store/modules/registration";
import {
  type State as UploadState,
  store as upload,
  type UploadStore,
} from "@/store/modules/upload";
import { createLogger, createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { config } from "./../config";

const persistedLoginState = createPersistedState({
  paths: ["login.isLoggedIn", "login.refreshToken", "login.accessToken"],
});

export type RootState = {
  registration: RegistrationState;
  login: LoginState;
  profile: ProfileState;
  upload: UploadState;
  jobPosting: JobPostingState;
  challenge: ChallengeState;
  content: ContentState;
};

export type Store = RegistrationStore<Pick<RootState, "registration">> &
  LoginStore<Pick<RootState, "login">> &
  ProfileStore<Pick<RootState, "profile">> &
  UploadStore<Pick<RootState, "upload">> &
  JobPostingStore<Pick<RootState, "jobPosting">> &
  ChallengeStore<Pick<RootState, "challenge">> &
  ContentStore<Pick<RootState, "content">>;

// Plug in logger when in development environment
const debug = config.NODE_ENV !== "production";
const plugins = debug ? [createLogger({}), persistedLoginState] : [persistedLoginState];

export const store = createStore<RootState>({
  modules: {
    registration,
    login,
    profile,
    upload,
    jobPosting,
    challenge: challenge,
    content,
  },
  plugins,
});

export function useStore(): Store {
  return store as Store;
}
