import { StudentProfileBaseDataInput } from "@/api/models/types";
import { StudentProfileStep1Form } from "@/models/StudentProfileStep1Form";

export function studentProfileStep1InputMapper(
  studentProfileForm: StudentProfileStep1Form
): StudentProfileBaseDataInput {
  return {
    ...studentProfileForm,
    dateOfBirth: `${studentProfileForm.day}.${studentProfileForm.month}.${studentProfileForm.year}`,
  };
}
