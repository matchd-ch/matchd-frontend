import type { Benefit } from "@/api/models/types";

export interface BenefitWithStatus extends Benefit {
  checked: boolean;
}

export interface UniversityProfileStep3Form {
  linkEducation: string;
  linkProjects: string;
  linkThesis: string;
  services: string;
  branches: string[];
  benefits: string[];
}
