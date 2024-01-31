import type { CompanyProfileBaseDataInput } from "@/api/models/types";
import type { CompanyProfileStep1Form } from "@/models/CompanyProfileStep1Form";

export function companyProfileStep1InputMapper(
  companyProfileForm: CompanyProfileStep1Form,
): CompanyProfileBaseDataInput {
  return {
    ...companyProfileForm,
  };
}
