import { SelectedLanguage } from "@/models/StudentProfileStep4Form";
import type { JobRequirement, Skill } from "api";

export interface JobRequirementWithStatus extends JobRequirement {
  checked: boolean;
}

export interface JobPostingStep2Form {
  jobRequirements: JobRequirement[];
  skills: Skill[];
  languages: SelectedLanguage[];
}
