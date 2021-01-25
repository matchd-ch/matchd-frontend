import { MatchdApiError } from "@/models/MatchdApiError";
import { UserNode } from "api";

export type State = {
  loading: boolean;
  success: boolean;
  errors: MatchdApiError | null;
  jwtToken: string;
  refreshToken: string;
  user: UserNode | null;
};

export const state: State = {
  loading: false,
  success: false,
  errors: null,
  jwtToken: "",
  refreshToken: "",
  user: null,
};
