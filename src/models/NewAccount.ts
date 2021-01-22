import { AccountType } from "@/models/AccountType";

export interface Account {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: AccountType;
}

export interface NewStudentAccount extends Account {
  mobileNumber: string;
}

export interface NewCompanyAccount extends Account {
  name: string;
  uid: string;
  zip: string;
  city: string;
  role: string;
}
