import { CompanyProfileStep3Form } from "@/models/CompanyProfileStep3Form";
import { MeQuery } from "../queries/me.generated";

export function companyProfileStep3FormMapper(
  user: NonNullable<MeQuery["me"]>
): CompanyProfileStep3Form {
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
