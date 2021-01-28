import { MatchdApiError } from "@/models/MatchdApiError";
import { UserWithProfileNode } from "api";

export type State = {
  loading: boolean;
  success: boolean;
  errors: MatchdApiError | null;
  jwtToken: string;
  refreshToken: string;
  user: UserWithProfileNode | null;
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
  me: {
    loading: false,
  },
};
