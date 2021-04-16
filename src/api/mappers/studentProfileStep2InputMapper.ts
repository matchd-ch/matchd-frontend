import { IStudentProfileInputStep2 } from "@/api/models/types";
import { StudentProfileStep2Form } from "@/models/StudentProfileStep2Form";

export function studentProfileStep2InputMapper(
  studentProfileForm: StudentProfileStep2Form
): IStudentProfileInputStep2 {
  return {
    ...studentProfileForm,
    jobType: { id: studentProfileForm.jobTypeId },
    branch: studentProfileForm.branchId ? { id: studentProfileForm.branchId } : null,
    jobFromDate:
      studentProfileForm.jobFromDateMonth && studentProfileForm.jobFromDateYear
        ? `${studentProfileForm.jobFromDateMonth}.${studentProfileForm.jobFromDateYear}`
        : null,
    jobToDate:
      studentProfileForm.jobToDateMonth && studentProfileForm.jobToDateYear
        ? `${studentProfileForm.jobToDateMonth}.${studentProfileForm.jobToDateYear}`
        : null,
  };
}
