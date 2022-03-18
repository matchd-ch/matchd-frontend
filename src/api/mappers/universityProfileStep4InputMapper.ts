import { UniversityProfileValuesInput } from "@/api/models/types";
import { UniversityProfileStep4Form } from "@/models/UniversityProfileStep4Form";

export function universityProfileStep4InputMapper(
  universityProfileForm: UniversityProfileStep4Form
): UniversityProfileValuesInput {
  return {
    softSkills: universityProfileForm.softSkills.map((softSkillId) => {
      return {
        id: softSkillId,
      };
    }),
    culturalFits: universityProfileForm.culturalFits.map((culturalFitId) => {
      return {
        id: culturalFitId,
      };
    }),
  };
}
