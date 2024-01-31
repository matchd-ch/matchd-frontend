import type { StudentProfileCharacterInput } from "@/api/models/types";
import type { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";

export function studentProfileStep3InputMapper(
  studentProfileForm: StudentProfileStep3Form,
): StudentProfileCharacterInput {
  return {
    softSkills: studentProfileForm.softSkills.map((softSkillId) => {
      return {
        id: softSkillId,
      };
    }),
    culturalFits: studentProfileForm.culturalFits.map((culturalFitId) => {
      return {
        id: culturalFitId,
      };
    }),
  };
}
