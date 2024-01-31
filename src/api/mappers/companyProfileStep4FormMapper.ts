import type { CompanyProfileStep4Form } from "@/models/CompanyProfileStep4Form";
import type { MeQuery } from "../queries/me.generated";

export function companyProfileStep4FormMapper(
  user: NonNullable<MeQuery["me"]>,
): CompanyProfileStep4Form {
  return {
    culturalFits: user.company?.culturalFits?.map((culturalFit) => culturalFit.id) || [],
    softSkills: user.company?.softSkills?.map((softSkill) => softSkill.id) || [],
  };
}
