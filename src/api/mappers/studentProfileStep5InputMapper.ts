import type { StudentProfileSpecificDataInput } from "@/api/models/types";
import type { StudentProfileStep5Form } from "@/models/StudentProfileStep5Form";

export function studentProfileStep5InputMapper(
  studentProfileForm: StudentProfileStep5Form
): StudentProfileSpecificDataInput {
  return {
    ...studentProfileForm,
  };
}
