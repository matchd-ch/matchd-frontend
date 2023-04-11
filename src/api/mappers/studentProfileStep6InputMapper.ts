import type { StudentProfileConditionInput } from "@/api/models/types";
import type { StudentProfileStep6Form } from "@/models/StudentProfileStep6Form";

export function studentProfileStep6InputMapper(
  studentProfileForm: StudentProfileStep6Form
): StudentProfileConditionInput {
  return {
    ...studentProfileForm,
  };
}
