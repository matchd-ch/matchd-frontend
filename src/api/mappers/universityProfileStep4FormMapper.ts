import type { User } from "@/api/models/types";
import { UniversityProfileStep4Form } from "@/models/UniversityProfileStep4Form";

export function universityProfileStep4FormMapper(user: User): UniversityProfileStep4Form {
  return {
    culturalFits: user.company?.culturalFits?.map((culturalFit) => culturalFit.id) || [],
    softSkills: user.company?.softSkills?.map((softSkill) => softSkill.id) || [],
  };
}
