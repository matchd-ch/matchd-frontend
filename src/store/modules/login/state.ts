import { MatchdApiError } from "@/models/MatchdApiError";
import { UserWithProfileNode } from "api";

export type State = {
  loading: boolean;
  success: boolean;
  errors: MatchdApiError | null;
  jwtToken: string;
  refreshToken: string;
  user: UserWithProfileNode | null;
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
};

export const state: State = {
  loading: false,
  success: false,
  errors: null,
  jwtToken: "",
  refreshToken: "",
  user: null,
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
};
