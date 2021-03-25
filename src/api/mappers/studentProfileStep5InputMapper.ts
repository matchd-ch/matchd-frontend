import { IStudentProfileInputStep5 } from "@/api/models/types";
import { StudentProfileStep5Form } from "@/models/StudentProfileStep5Form";

export function studentProfileStep5InputMapper(
  studentProfileForm: StudentProfileStep5Form
): IStudentProfileInputStep5 {
  return {
    ...studentProfileForm,
  };
}
