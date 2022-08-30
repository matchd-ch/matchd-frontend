import type { Employee } from "@/api/models/types";
import { ChallengeChallengeFragment } from "@/api/queries/challengeFragment.generated";
import { MatchdApiError } from "@/models/MatchdApiError";

export type State = {
  challenge: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
    id: string;
    slug: string;
  };
  currentChallenge: {
    loading: boolean;
    data: ChallengeChallengeFragment | null;
  };
  employees: {
    loading: boolean;
    data: Employee[];
  };
  addEmployee: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
};

export const state: State = {
  challenge: {
    loading: false,
    success: false,
    errors: null,
    id: "",
    slug: "",
  },
  currentChallenge: {
    loading: false,
    data: null,
  },
  employees: {
    loading: false,
    data: [],
  },
  addEmployee: {
    loading: false,
    success: false,
    errors: null,
  },
};
