import { MatchdApiError } from "@/models/MatchdApiError";
import { User } from "api";

export type State = {
  login: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
  logout: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
  sendPasswordResetEmail: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
  passwordReset: {
    loading: boolean;
    tokenVerificationloading: boolean;
    tokenVerificationComplete: boolean;
    tokenIsValid: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
  me: {
    loading: boolean;
  };
  isLoggedIn: boolean;
  refreshToken: string;
  user: User | null;
};

export const state: State = {
  login: {
    loading: false,
    success: false,
    errors: null,
  },
  logout: {
    loading: false,
    success: false,
    errors: null,
  },
  sendPasswordResetEmail: {
    loading: false,
    success: false,
    errors: null,
  },
  passwordReset: {
    loading: false,
    tokenVerificationloading: false,
    tokenVerificationComplete: false,
    tokenIsValid: false,
    success: false,
    errors: null,
  },
  me: {
    loading: false,
  },
  isLoggedIn: false,
  refreshToken: "",
  user: null,
};
