export interface JobPostingStep1Form {
  title: string;
  description: string;
  jobTypeId: string;
  branches: string[];
  fullTime: boolean;
  workload: string;
  jobFromDateMonth: string;
  jobFromDateYear: string;
  jobToDateMonth: string;
  jobToDateYear: string;
  url: string;
}
