import { MatchdApiError } from "@/models/MatchdApiError";
import { UserWithProfileNode } from "api";

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
  jwtToken: string;
  refreshToken: string;
  user: UserWithProfileNode | null;
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
  jwtToken: "",
  refreshToken: "",
  user: null,
};
