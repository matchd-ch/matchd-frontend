import { AccountType } from "@/models/AccountType";
import { NewCompanyAccount, NewStudentAccount } from "@/models/NewAccount";

export type State = {
  loading: boolean;
  contactForm: {
    loading: boolean;
    success: boolean;
  };
  registerCompany: {
    loading: boolean;
    success: boolean;
    isCompany: boolean | null;
    data: {
      uid: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      type: string;
      name: string;
      role: string;
      zip: string;
      city: string;
    };
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
    isCompany: null,
    data: {
      uid: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      type: "company",
      name: "",
      role: "",
      zip: "",
      city: "",
    },
  },
  type: null,
  newAccount: null,
};
