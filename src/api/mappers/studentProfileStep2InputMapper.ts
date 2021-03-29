import { IStudentProfileInputStep2 } from "@/api/models/types";
import { StudentProfileStep2Form } from "@/models/StudentProfileStep2Form";

export function studentProfileStep2InputMapper(
  studentProfileForm: StudentProfileStep2Form
): IStudentProfileInputStep2 {
  return {
    ...studentProfileForm,
    jobOption: { id: studentProfileForm.jobOptionId },
    jobPosition: studentProfileForm.jobPositionId ? { id: studentProfileForm.jobPositionId } : null,
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
