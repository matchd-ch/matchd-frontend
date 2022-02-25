import { CompanyProfileValuesInput } from "@/api/models/types";
import { CompanyProfileStep4Form } from "@/models/CompanyProfileStep4Form";

export function companyProfileStep4InputMapper(
  companyProfileForm: CompanyProfileStep4Form
): CompanyProfileValuesInput {
  return {
    softSkills: companyProfileForm.softSkills.map((softSkillId) => {
      return {
        id: softSkillId,
      };
    }),
    culturalFits: companyProfileForm.culturalFits.map((culturalFitId) => {
      return {
        id: culturalFitId,
      };
    }),
  };
}
