import { ICompanyProfileInputStep3 } from "@/api/models/types";
import { CompanyProfileStep3Form } from "@/models/CompanyProfileStep3Form";

export function companyProfileStep3InputMapper(
  companyProfileForm: CompanyProfileStep3Form
): ICompanyProfileInputStep3 {
  return {
    jobPositions: companyProfileForm.jobPositions.map((jobPosition) => {
      return { id: jobPosition.id };
    }),
    benefits: companyProfileForm.benefits.map((benefit) => {
      return { id: benefit.id };
    }),
  };
}
