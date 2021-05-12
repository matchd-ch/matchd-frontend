import type { Benefit } from "api";

export interface BenefitWithStatus extends Benefit {
  checked: boolean;
}

export interface CompanyProfileStep3Form {
  branches: string[];
  benefits: string[];
}
