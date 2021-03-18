import { IJobPostingInputStep2 } from "@/api/models/types";
import { JobPostingStep2Form } from "@/models/JobPostingStep2Form";

export function jobPostingStep2InputMapper(
  id: string,
  jobPostingForm: JobPostingStep2Form
): IJobPostingInputStep2 {
  return {
    id,
    skills: jobPostingForm.skills.map(skill => {
      return { id: skill.id };
    }),
    languages: jobPostingForm.languages.map(selectedLanguage => {
      return {
        language: selectedLanguage.language.id,
        languageLevel: selectedLanguage.level.id,
      };
    }),
    expectations: jobPostingForm.expectations.map(expectation => {
      return { id: expectation.id };
    }),
  };
}
