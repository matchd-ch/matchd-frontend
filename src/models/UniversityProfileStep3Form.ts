import { BenefitType, JobPositionType } from "api";

export interface BenefitWithStatus extends BenefitType {
  checked: boolean;
}

export interface UniversityProfileStep3Form {
  jobPositions: JobPositionType[];
  benefits: BenefitType[];
}
