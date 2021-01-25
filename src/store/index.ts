import { createLogger, createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import {
  store as registration,
  RegistrationStore,
  State as RegistrationState,
} from "@/store/modules/registration";

import { store as login, LoginStore, State as LoginState } from "@/store/modules/login";

const persistedLoginState = createPersistedState({
  paths: ["login.jwtToken", "login.refreshToken"],
});

export type RootState = {
  registration: RegistrationState;
  login: LoginState;
};

export type Store = RegistrationStore<Pick<RootState, "registration">> &
  LoginStore<Pick<RootState, "login">>;

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger({}), persistedLoginState] : [persistedLoginState];

export const store = createStore({
  modules: {
    registration,
    login,
  },
  plugins,
});

export function useStore(): Store {
  return store as Store;
}
