import { MatchingInput } from "@/models/MatchingInput";
import { ProjectPostingMatchingFilters } from "@/models/ProjectPostingMatchingFilters";

export function projectPostingMatchingInputMapper(
  filters: ProjectPostingMatchingFilters
): MatchingInput {
  return {
    projectPostingMatchingInput: {
      projectPosting: {
        id: filters.projectPostingId,
      },
    },
    first: filters.first,
    skip: filters.skip,
    softBoost: filters.softBoost,
    techBoost: filters.techBoost,
  };
}
