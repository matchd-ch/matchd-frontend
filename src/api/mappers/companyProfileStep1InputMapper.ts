import { ICompanyProfileInputBaseData } from "@/api/models/types";
import { CompanyProfileStep1Form } from "@/models/CompanyProfileStep1Form";

export function companyProfileStep1InputMapper(
  companyProfileForm: CompanyProfileStep1Form
): ICompanyProfileInputBaseData {
  return {
    ...companyProfileForm,
  };
}
