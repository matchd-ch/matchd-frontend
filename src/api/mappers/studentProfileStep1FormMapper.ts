import type { StudentProfileStep1Form } from "@/models/StudentProfileStep1Form";
import { DateTime } from "luxon";
import type { MeQuery } from "../queries/me.generated";

export function studentProfileStep1FormMapper(
  user: NonNullable<MeQuery["me"]>
): StudentProfileStep1Form {
  return {
    city: user.student?.city || "",
    day: user.student?.dateOfBirth ? String(DateTime.fromSQL(user.student?.dateOfBirth).day) : "",
    month: user.student?.dateOfBirth
      ? String(DateTime.fromSQL(user.student?.dateOfBirth).month)
      : "",
    year: user.student?.dateOfBirth ? String(DateTime.fromSQL(user.student?.dateOfBirth).year) : "",
    firstName: user.firstName,
    lastName: user.lastName,
    mobile: user.student?.mobile || "",
    street: user.student?.street || "",
    zip: user.student?.zip || "",
  };
}
