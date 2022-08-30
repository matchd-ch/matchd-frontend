import type { Challenge, Dashboard, JobPosting, Student } from "@/api/models/types";

export interface GroupedJobPostingMatching {
  jobPosting: JobPosting;
  students: Student[];
}

export interface GroupedChallengeMatching {
  challenge: Challenge;
  students?: Student[];
}

export interface CompanyDashboard extends Dashboard {
  uniqueRequestedJobPostingMatchings: GroupedJobPostingMatching[] | undefined;
  uniqueUnconfirmedJobPostingMatchings: GroupedJobPostingMatching[] | undefined;
  uniqueJobPostingMatchings: GroupedJobPostingMatching[] | undefined;
  uniqueChallengeMatchings: GroupedChallengeMatching[] | undefined;
}
