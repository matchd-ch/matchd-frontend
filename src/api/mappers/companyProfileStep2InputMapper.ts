import { CompanyProfileInputRelations } from "@/api/models/types";
import { CompanyProfileStep2Form } from "@/models/CompanyProfileStep2Form";

export function companyProfileStep2InputMapper(
  companyProfileForm: CompanyProfileStep2Form
): CompanyProfileInputRelations {
  return {
    ...companyProfileForm,
    memberItStGallen: companyProfileForm.memberItStGallen || false,
  };
}
