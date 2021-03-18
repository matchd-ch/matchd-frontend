import { SelectedLanguage } from "@/models/StudentProfileStep4Form";
import { ExpectationType, SkillType } from "api";

export interface ExpectationWithStatus extends ExpectationType {
  checked: boolean;
}

export interface JobPostingStep2Form {
  expectations: ExpectationType[];
  skills: SkillType[];
  languages: SelectedLanguage[];
}
