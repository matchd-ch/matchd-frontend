import type { Dashboard, JobPosting, ProjectPosting, Student } from "@/api/models/types";

export interface GroupedJobPostingMatching {
  jobPosting: JobPosting;
  students: Student[];
}

export interface GroupedProjectPostingMatching {
  projectPosting: ProjectPosting;
  students?: Student[];
}

export interface CompanyDashboard extends Dashboard {
  uniqueRequestedJobPostingMatchings: GroupedJobPostingMatching[] | undefined;
  uniqueUnconfirmedJobPostingMatchings: GroupedJobPostingMatching[] | undefined;
  uniqueJobPostingMatchings: GroupedJobPostingMatching[] | undefined;
  uniqueProjectPostingMatchings: GroupedProjectPostingMatching[] | undefined;
}
