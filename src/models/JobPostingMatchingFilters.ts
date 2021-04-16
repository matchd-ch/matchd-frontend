export interface JobPostingMatchingFilters {
  first: number;
  skip: number;
  softBoost: number;
  techBoost: number;
  jobTypeId?: string;
  branchId?: string;
  zip?: string;
  workload?: number;
}
