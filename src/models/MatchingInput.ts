import type { JobPostingMatchingInput, StudentMatchingInput } from "api";

export interface MatchingInput {
  first: number;
  skip: number;
  softBoost: number;
  techBoost: number;
  jobPostingMatchingInput?: JobPostingMatchingInput;
  studentMatchingInput?: StudentMatchingInput;
}
