import type { StudentProfileBaseDataInput } from "@/api/models/types";
import type { StudentProfileStep1Form } from "@/models/StudentProfileStep1Form";

export function studentProfileStep1InputMapper(
  studentProfileForm: StudentProfileStep1Form,
): StudentProfileBaseDataInput {
  const dateOfBirth = [
    studentProfileForm.year,
    studentProfileForm.month,
    studentProfileForm.day,
  ].filter((d) => d !== "");

  return {
    firstName: studentProfileForm.firstName,
    lastName: studentProfileForm.lastName,
    street: studentProfileForm.street,
    zip: studentProfileForm.zip,
    city: studentProfileForm.city,
    mobile: studentProfileForm.mobile,
    ...(dateOfBirth.length === 3 && { dateOfBirth: dateOfBirth.join("-") }),
  };
}
