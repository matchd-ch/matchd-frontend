import { AccountType } from "@/models/AccountType";

export interface NewAccount {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: AccountType;
}
