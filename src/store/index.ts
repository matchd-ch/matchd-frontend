import { ContentStore, State as ContentState, store as content } from "@/store/modules/content";
import {
  JobPostingStore,
  State as JobPostingState,
  store as jobPosting,
} from "@/store/modules/jobposting";
import { LoginStore, State as LoginState, store as login } from "@/store/modules/login";
import { ProfileStore, State as ProfileState, store as profile } from "@/store/modules/profile";
import {
  ProjectPostingStore,
  State as ProjectPostingState,
  store as projectPosting,
} from "@/store/modules/projectposting";
import {
  RegistrationStore,
  State as RegistrationState,
  store as registration,
} from "@/store/modules/registration";
import { State as UploadState, store as upload, UploadStore } from "@/store/modules/upload";
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
  projectPosting: ProjectPostingState;
  content: ContentState;
};

export type Store = RegistrationStore<Pick<RootState, "registration">> &
  LoginStore<Pick<RootState, "login">> &
  ProfileStore<Pick<RootState, "profile">> &
  UploadStore<Pick<RootState, "upload">> &
  JobPostingStore<Pick<RootState, "jobPosting">> &
  ProjectPostingStore<Pick<RootState, "projectPosting">> &
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
    projectPosting,
    content,
  },
  plugins,
});

export function useStore(): Store {
  return store as Store;
}
