import type { Benefit, Branch } from "api";

export interface BenefitWithStatus extends Benefit {
  checked: boolean;
}

export interface CompanyProfileStep3Form {
  branches: Branch[];
  benefits: Benefit[];
}
