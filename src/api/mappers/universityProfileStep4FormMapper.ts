import { UniversityProfileStep4Form } from "@/models/UniversityProfileStep4Form";
import { MeQuery } from "../queries/me.generated";

export function universityProfileStep4FormMapper(
  user: NonNullable<MeQuery["me"]>
): UniversityProfileStep4Form {
  return {
    culturalFits: user.company?.culturalFits?.map((culturalFit) => culturalFit.id) || [],
    softSkills: user.company?.softSkills?.map((softSkill) => softSkill.id) || [],
  };
}
