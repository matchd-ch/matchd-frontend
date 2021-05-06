import { ICompanyProfileInputStep2 } from "@/api/models/types";
import { CompanyProfileStep2Form } from "@/models/CompanyProfileStep2Form";

export function companyProfileStep2InputMapper(
  companyProfileForm: CompanyProfileStep2Form
): ICompanyProfileInputStep2 {
  return {
    ...companyProfileForm,
    memberItStGallen: companyProfileForm.memberItStGallen || false,
  };
}
