import { createLogger, createStore } from "vuex";

import {
  store as registration,
  RegistrationStore,
  State as RegistrationState,
} from "@/store/modules/registration";

import { store as login, LoginStore, State as LoginState } from "@/store/modules/login";

export type RootState = {
  registration: RegistrationState;
  login: LoginState;
};

export type Store = RegistrationStore<Pick<RootState, "registration">> &
  LoginStore<Pick<RootState, "registration">>;

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  modules: {
    registration,
    login,
  },
});

export function useStore(): Store {
  return store as Store;
}
