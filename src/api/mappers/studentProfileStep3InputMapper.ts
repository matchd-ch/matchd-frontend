import { IStudentProfileInputCharacter } from "@/api/models/types";
import { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";

export function studentProfileStep3InputMapper(
  studentProfileForm: StudentProfileStep3Form
): IStudentProfileInputCharacter {
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
