import type { MatchingInput } from "@/models/MatchingInput";
import type { StudentMatchingFilters } from "@/models/StudentMatchingFilters";

export function studentMatchingInputMapper(filters: StudentMatchingFilters): MatchingInput {
  return {
    studentMatchingInput: {
      jobPosting: {
        id: filters.jobPostingId,
      },
    },
    first: filters.first,
    skip: filters.skip,
    softBoost: filters.softBoost,
    techBoost: filters.techBoost,
  };
}
