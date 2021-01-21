import { AccountType } from "@/models/AccountType";
import { NewCompanyAccount, NewStudentAccount } from "@/models/NewAccount";

export type State = {
  loading: boolean;
  contactForm: {
    loading: boolean;
    success: boolean;
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
  type: null,
  newAccount: null,
};
