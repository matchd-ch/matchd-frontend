import { IStudentProfileInputStep2 } from "@/api/models/types";
import { StudentProfileStep2Form } from "@/models/StudentProfileStep2Form";

export function studentProfileStep2InputMapper(
  studentProfileForm: StudentProfileStep2Form
): IStudentProfileInputStep2 {
  return {
    ...studentProfileForm,
    graduation:
      studentProfileForm.graduationMonth && studentProfileForm.graduationYear
        ? `${studentProfileForm.graduationMonth}.${studentProfileForm.graduationYear}`
        : null,
  };
}
