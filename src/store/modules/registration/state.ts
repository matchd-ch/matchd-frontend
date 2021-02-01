import { AccountType } from "@/models/AccountType";
import { MatchdApiError } from "@/models/MatchdApiError";
import { NewCompanyAccount, NewStudentAccount } from "@/models/NewAccount";

export type State = {
  loading: boolean;
  contactForm: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
  registerCompany: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
  registerStudent: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
  verifyAccount: {
    loading: boolean;
    success: boolean;
    errors: MatchdApiError | null;
  };
  type: AccountType;
  newAccount: NewCompanyAccount | NewStudentAccount | null;
};

export const state: State = {
  loading: false,
  contactForm: {
    loading: false,
    success: false,
    errors: null,
  },
  registerCompany: {
    loading: false,
    success: false,
    errors: null,
  },
  registerStudent: {
    loading: false,
    success: false,
    errors: null,
  },
  verifyAccount: {
    loading: false,
    success: false,
    errors: null,
  },
  type: null,
  newAccount: null,
};
