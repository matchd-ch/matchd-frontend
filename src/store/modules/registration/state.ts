import { AccountType } from "@/models/AccountType";
import { NewCompanyAccount, NewStudentAccount } from "@/models/NewAccount";
import { Maybe, Scalars } from "api";

export type State = {
  loading: boolean;
  contactForm: {
    loading: boolean;
    success: boolean;
    errors?: string[];
  };
  registerCompany: {
    loading: boolean;
    success: boolean;
    errors?: string[];
  };
  verifyAccount: {
    loading: boolean;
    success: boolean;
    errors?: string[];
  };
  type: AccountType;
  newAccount: NewCompanyAccount | NewStudentAccount | null;
};

export const state: State = {
  loading: false,
  contactForm: {
    loading: false,
    success: false,
  },
  registerCompany: {
    loading: false,
    success: false,
  },
  verifyAccount: {
    loading: false,
    success: false,
  },
  type: null,
  newAccount: null,
};
