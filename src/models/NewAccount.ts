import type { AccountType } from "@/models/AccountType";

export interface Account {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: AccountType;
}

export type NewStudentAccount = Account;

export interface NewCompanyAccount extends Account {
  name: string;
  uid?: string;
  zip: string;
  city: string;
  role: string;
}
