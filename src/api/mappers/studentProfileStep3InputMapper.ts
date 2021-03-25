import { IStudentProfileInputStep3 } from "@/api/models/types";
import { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";

export function studentProfileStep3InputMapper(
  studentProfileForm: StudentProfileStep3Form
): IStudentProfileInputStep3 {
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
