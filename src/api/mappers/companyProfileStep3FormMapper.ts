import { CompanyProfileStep3Form } from "@/models/CompanyProfileStep3Form";
import type { User } from "api";

export function companyProfileStep3FormMapper(user: User): CompanyProfileStep3Form {
  return {
    branches: user.company?.branches?.map((branch) => branch.id) || [],
    benefits: user.company?.benefits?.map((benefit) => benefit.id) || [],
  };
}
