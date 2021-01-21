import { AccountType } from "@/models/AccountType";

export interface Account {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface NewStudentAccount extends Account {
  handy: string;
  type: AccountType;
}

export interface NewCompanyAccount extends Account {
  company: string;
  uid: string;
  zip: string;
  city: string;
  role: string;
  type: AccountType;
}
