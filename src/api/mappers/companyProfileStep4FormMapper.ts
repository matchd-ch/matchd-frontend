import { CompanyProfileStep4Form } from "@/models/CompanyProfileStep4Form";
import type { User } from "api";

export function companyProfileStep4FormMapper(user: User): CompanyProfileStep4Form {
  return {
    culturalFits: user.company?.culturalFits?.map((culturalFit) => culturalFit.id) || [],
    softSkills: user.company?.softSkills?.map((softSkill) => softSkill.id) || [],
  };
}
