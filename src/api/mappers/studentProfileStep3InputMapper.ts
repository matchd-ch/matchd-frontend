import { IStudentProfileInputStep3 } from "@/api/models/types";
import { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";

export function studentProfileStep3InputMapper(
  studentProfileForm: StudentProfileStep3Form
): IStudentProfileInputStep3 {
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
