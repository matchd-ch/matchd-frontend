import { CompanyProfileAdvantagesInput } from "@/api/models/types";
import { CompanyProfileStep3Form } from "@/models/CompanyProfileStep3Form";

export function companyProfileStep3InputMapper(
  companyProfileForm: CompanyProfileStep3Form
): CompanyProfileAdvantagesInput {
  return {
    branches: companyProfileForm.branches.map((branchId) => {
      return { id: branchId };
    }),
    benefits: companyProfileForm.benefits.map((benefitId) => {
      return { id: benefitId };
    }),
  };
}
