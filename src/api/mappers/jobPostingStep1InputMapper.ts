import type { JobPostingBaseDataInput } from "@/api/models/types";
import type { JobPostingStep1Form } from "@/models/JobPostingStep1Form";

export function jobPostingStep1InputMapper(
  id: string | undefined,
  jobPostingForm: JobPostingStep1Form
): JobPostingBaseDataInput {
  return {
    id: id || null,
    title: jobPostingForm.title,
    description: jobPostingForm.description || null,
    workloadFrom: +jobPostingForm.workloadFrom,
    workloadTo: +jobPostingForm.workloadTo,
    url: jobPostingForm.url || null,
    jobType: {
      id: jobPostingForm.jobTypeId,
    },
    jobPeriodByAgreement: jobPostingForm.jobPeriodByAgreement ? true : false,
    branches:
      jobPostingForm.branches?.map((branchId) => {
        return { id: branchId };
      }) || [],
    // TODO: T4054
    jobFromDate: !jobPostingForm.jobPeriodByAgreement
      ? `${jobPostingForm.jobFromDateMonth}.${jobPostingForm.jobFromDateYear}`
      : null,
    jobToDate: jobPostingForm.jobToDateOpenEnd
      ? `${jobPostingForm.jobToDateMonth}.${jobPostingForm.jobToDateYear}`
      : null,
  };
}
