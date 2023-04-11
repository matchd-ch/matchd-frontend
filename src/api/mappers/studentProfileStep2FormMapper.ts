import type { StudentProfileStep2Form } from "@/models/StudentProfileStep2Form";
import { DateTime } from "luxon";
import type { MeQuery } from "../queries/me.generated";

export function studentProfileStep2FormMapper(
  user: NonNullable<MeQuery["me"]>
): StudentProfileStep2Form {
  return {
    branchId: user.student?.branch?.id ?? "",
    jobFromDateMonth: user?.student?.jobFromDate
      ? String(DateTime.fromSQL(user?.student?.jobFromDate).month)
      : "",
    jobFromDateYear: user.student?.jobFromDate
      ? String(DateTime.fromSQL(user?.student?.jobFromDate).year)
      : "",
    jobToDateMonth: user.student?.jobToDate
      ? String(DateTime.fromSQL(user?.student?.jobToDate).month)
      : "",
    jobToDateYear: user.student?.jobToDate
      ? String(DateTime.fromSQL(user?.student?.jobToDate).year)
      : "",
    jobTypeId: user.student?.jobType?.id || "",
  };
}
