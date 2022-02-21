import { ICompanyProfileInputRelations } from "@/api/models/types";
import { CompanyProfileStep2Form } from "@/models/CompanyProfileStep2Form";

export function companyProfileStep2InputMapper(
  companyProfileForm: CompanyProfileStep2Form
): ICompanyProfileInputRelations {
  return {
    ...companyProfileForm,
    memberItStGallen: companyProfileForm.memberItStGallen || false,
  };
}
