import { StudentProfileInputCondition } from "@/api/models/types";
import { StudentProfileStep6Form } from "@/models/StudentProfileStep6Form";

export function studentProfileStep6InputMapper(
  studentProfileForm: StudentProfileStep6Form
): StudentProfileInputCondition {
  return {
    ...studentProfileForm,
  };
}
