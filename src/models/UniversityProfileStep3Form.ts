import { Benefit, JobPosition } from "api";

export interface BenefitWithStatus extends Benefit {
  checked: boolean;
}

export interface UniversityProfileStep3Form {
  jobPositions: JobPosition[];
  benefits: Benefit[];
}
