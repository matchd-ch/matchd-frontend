import { SelectedLanguage } from "@/models/StudentProfileStep4Form";
import { Expectation, Skill } from "api";

export interface ExpectationWithStatus extends Expectation {
  checked: boolean;
}

export interface JobPostingStep2Form {
  expectations: Expectation[];
  skills: Skill[];
  languages: SelectedLanguage[];
}
