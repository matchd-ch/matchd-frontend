import type {
  JobPostingMatchingInput,
  ProjectPostingMatchingInput,
  StudentMatchingInput,
} from "@/api/models/types";

export interface MatchingInput {
  first: number;
  skip: number;
  softBoost: number;
  techBoost: number;
  jobPostingMatchingInput?: JobPostingMatchingInput;
  projectPostingMatchingInput?: ProjectPostingMatchingInput;
  studentMatchingInput?: StudentMatchingInput;
}
