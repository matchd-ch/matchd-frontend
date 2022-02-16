import { CompanyProfileStep3Form } from "@/models/CompanyProfileStep3Form";
import type { User } from "api";

export function companyProfileStep3FormMapper(user: User): CompanyProfileStep3Form {
  return {
    branches:
      user.company?.branches?.edges
        .filter((edge) => edge?.node?.id !== undefined)
        .map((edge) => edge!.node!.id) || [],
    benefits:
      user.company?.benefits?.edges
        .filter((edge) => edge?.node?.id !== undefined)
        .map((edge) => edge!.node!.id) || [],
  };
}
