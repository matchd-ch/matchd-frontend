import { StudentProfileBaseDataInput } from "@/api/models/types";
import { StudentProfileStep1Form } from "@/models/StudentProfileStep1Form";

export function studentProfileStep1InputMapper(
  studentProfileForm: StudentProfileStep1Form
): StudentProfileBaseDataInput {
  return {
    firstName: studentProfileForm.firstName,
    lastName: studentProfileForm.lastName,
    street: studentProfileForm.street,
    zip: studentProfileForm.zip,
    city: studentProfileForm.city,
    mobile: studentProfileForm.mobile,
    dateOfBirth: `${studentProfileForm.year}-${studentProfileForm.month}-${studentProfileForm.day}`,
  };
}
