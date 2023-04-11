import type { JobPostingMatchingFilters } from "@/models/JobPostingMatchingFilters";
import type { MatchingInput } from "@/models/MatchingInput";

export function jobPostingMatchingInputMapper(filters: JobPostingMatchingFilters): MatchingInput {
  return {
    jobPostingMatchingInput: {
      ...(filters.jobTypeId && {
        jobType: {
          id: filters.jobTypeId,
        },
      }),
      ...(filters.branchId && {
        branch: {
          id: filters.branchId,
        },
      }),
      ...(filters.zip && {
        zip: {
          zip: filters.zip,
        },
      }),
      ...(filters.workload && {
        workload: filters.workload,
      }),
    },
    first: filters.first,
    skip: filters.skip,
    softBoost: filters.softBoost,
    techBoost: filters.techBoost,
  };
}
