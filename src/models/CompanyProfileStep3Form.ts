import { BenefitInputType, JobPositionInputType } from "api";

export interface CompanyProfileStep3Form {
  jobPosition: JobPositionInputType;
  benefits: BenefitInputType;
}
