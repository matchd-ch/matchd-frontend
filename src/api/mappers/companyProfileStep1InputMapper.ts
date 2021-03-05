import { ICompanyProfileInputStep1 } from "@/api/models/types";
import { CompanyProfileStep1Form } from "@/models/CompanyProfileStep1Form";

export function companyProfileStep1Mapper(
  companyProfileForm: CompanyProfileStep1Form
): ICompanyProfileInputStep1 {
  return {
    ...companyProfileForm,
  };
}
