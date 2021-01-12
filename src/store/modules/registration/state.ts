import { AccountType } from "@/models/AccountType";
import { NewCompanyAccount, NewStudentAccount } from "@/models/NewAccount";

export type State = {
  loading: boolean;
  type: AccountType;
  newAccount: NewCompanyAccount | NewStudentAccount | null;
};

export const state: State = {
  loading: false,
  type: null,
  newAccount: null,
};
