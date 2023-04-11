import type { SelectedLanguage } from "@/models/StudentProfileStep4Form";

export interface JobPostingStep2Form {
  jobRequirements: string[];
  skills: string[];
  languages: SelectedLanguage[];
}
