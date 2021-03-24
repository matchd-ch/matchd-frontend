import { Benefit, JobPosition } from "api";

export interface BenefitWithStatus extends Benefit {
  checked: boolean;
}

export interface CompanyProfileStep3Form {
  jobPositions: JobPosition[];
  benefits: Benefit[];
}
