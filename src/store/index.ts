import { createLogger, createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import {
  store as registration,
  RegistrationStore,
  State as RegistrationState,
} from "@/store/modules/registration";

import { store as profile, ProfileStore, State as ProfileState } from "@/store/modules/profile";

import { store as login, LoginStore, State as LoginState } from "@/store/modules/login";

import { store as upload, UploadStore, State as UploadState } from "@/store/modules/upload";

import {
  store as jobPosting,
  JobPostingStore,
  State as JobPostingState,
} from "@/store/modules/jobposting";

const persistedLoginState = createPersistedState({
  paths: ["login.isLoggedIn", "login.refreshToken"],
});

export type RootState = {
  registration: RegistrationState;
  login: LoginState;
  profile: ProfileState;
  upload: UploadState;
  jobPosting: JobPostingState;
};

export type Store = RegistrationStore<Pick<RootState, "registration">> &
  LoginStore<Pick<RootState, "login">> &
  ProfileStore<Pick<RootState, "profile">> &
  UploadStore<Pick<RootState, "upload">> &
  JobPostingStore<Pick<RootState, "jobPosting">>;

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger({}), persistedLoginState] : [persistedLoginState];

export const store = createStore<RootState>({
  modules: {
    registration,
    login,
    profile,
    upload,
    jobPosting,
  },
  plugins,
});

export function useStore(): Store {
  return store as Store;
}
