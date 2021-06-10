import type { Branch } from "api";

export interface UniversityProfileStep3Form {
  services: string;
  linkEducation: string;
  linkProjects: string;
  linkThesis: string;
  branches: Branch[];
}
