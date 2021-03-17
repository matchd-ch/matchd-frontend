import { BenefitType, JobPositionType } from "api";

export interface BenefitWithStatus extends BenefitType {
  checked: boolean;
}

export interface CompanyProfileStep3Form {
  jobPositions: JobPositionType[];
  benefits: BenefitType[];
}
