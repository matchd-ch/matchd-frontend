import { IUniversityProfileInputValues } from "@/api/models/types";
import { UniversityProfileStep4Form } from "@/models/UniversityProfileStep4Form";

export function universityProfileStep4InputMapper(
  universityProfileForm: UniversityProfileStep4Form
): IUniversityProfileInputValues {
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
