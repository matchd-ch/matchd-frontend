import { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";
import type { User } from "api";

export function studentProfileStep3FormMapper(user: User): StudentProfileStep3Form {
  return {
    culturalFits: user.student?.culturalFits.map((culturalFit) => culturalFit.id) || [],
    softSkills: user.student?.softSkills.map((softSkill) => softSkill.id) || [],
  };
}
