import type { CompanyProfileRelationsInput } from "@/api/models/types";
import type { CompanyProfileStep2Form } from "@/models/CompanyProfileStep2Form";

export function companyProfileStep2InputMapper(
  companyProfileForm: CompanyProfileStep2Form,
): CompanyProfileRelationsInput {
  return {
    ...companyProfileForm,
    memberItStGallen: companyProfileForm.memberItStGallen || false,
  };
}
