import type {
  ChallengeMatchingInput,
  JobPostingMatchingInput,
  StudentMatchingInput,
} from "@/api/models/types";

export interface MatchingInput {
  first: number;
  skip: number;
  softBoost: number;
  techBoost: number;
  jobPostingMatchingInput?: JobPostingMatchingInput;
  challengeMatchingInput?: ChallengeMatchingInput;
  studentMatchingInput?: StudentMatchingInput;
}
