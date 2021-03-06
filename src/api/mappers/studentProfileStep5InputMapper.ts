import { StudentProfileSpecificDataInput } from "@/api/models/types";
import { StudentProfileStep5Form } from "@/models/StudentProfileStep5Form";

export function studentProfileStep5InputMapper(
  studentProfileForm: StudentProfileStep5Form
): StudentProfileSpecificDataInput {
  return {
    ...studentProfileForm,
  };
}
