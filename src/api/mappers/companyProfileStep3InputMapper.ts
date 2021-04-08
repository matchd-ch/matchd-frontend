import { ICompanyProfileInputStep3 } from "@/api/models/types";
import { CompanyProfileStep3Form } from "@/models/CompanyProfileStep3Form";

export function companyProfileStep3InputMapper(
  companyProfileForm: CompanyProfileStep3Form
): ICompanyProfileInputStep3 {
  return {
    branches: companyProfileForm.branches.map((branch) => {
      return { id: branch.id };
    }),
    benefits: companyProfileForm.benefits.map((benefit) => {
      return { id: benefit.id };
    }),
  };
}
