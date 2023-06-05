export interface JobPostingStep1Form {
  title: string;
  description: string;
  jobTypeId: string;
  branches: string[];
  workloadFrom: string;
  workloadTo: string;
  jobPeriodByAgreement: boolean;
  jobFromDateMonth: string;
  jobFromDateYear: string;
  jobToDateOpenEnd: boolean;
  jobToDateMonth: string;
  jobToDateYear: string;
  url: string;
}
