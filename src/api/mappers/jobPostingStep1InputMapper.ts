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
    workload: +jobPostingForm.workload,
    url: jobPostingForm.url || null,
    jobType: {
      id: jobPostingForm.jobTypeId,
    },
    branches:
      jobPostingForm.branches?.map((branchId) => {
        return { id: branchId };
      }) || [],
    jobFromDate: `${jobPostingForm.jobFromDateMonth}.${jobPostingForm.jobFromDateYear}`,
    jobToDate:
      jobPostingForm.jobToDateMonth && jobPostingForm.jobToDateYear
        ? `${jobPostingForm.jobToDateMonth}.${jobPostingForm.jobToDateYear}`
        : null,
  };
}
