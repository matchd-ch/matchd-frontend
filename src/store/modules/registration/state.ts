import { AccountType } from "@/models/AccountType";

export type State = {
  loading: boolean;
  type: AccountType;
};

export const state: State = {
  loading: false,
  type: null
};
