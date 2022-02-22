import type { User } from "@/api/models/types";
import { StudentProfileStep2Form } from "@/models/StudentProfileStep2Form";
import { DateTime } from "luxon";

export function studentProfileStep2FormMapper(user: User): StudentProfileStep2Form {
  return {
    branchId: user.student?.branch?.id || "",
    jobFromDateMonth: user.student?.jobFromDate
      ? String(DateTime.fromSQL(user.student?.jobFromDate).month)
      : "",
    jobFromDateYear: user.student?.jobFromDate
      ? String(DateTime.fromSQL(user.student?.jobFromDate).year)
      : "",
    jobToDateMonth: user.student?.jobToDate
      ? String(DateTime.fromSQL(user.student?.jobToDate).month)
      : "",
    jobToDateYear: user.student?.jobToDate
      ? String(DateTime.fromSQL(user.student?.jobToDate).year)
      : "",
    jobTypeId: user.student?.jobType?.id || "",
  };
}
