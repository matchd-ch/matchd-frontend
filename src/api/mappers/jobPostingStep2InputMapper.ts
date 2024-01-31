import type { JobPostingRequirementsInput } from "@/api/models/types";
import type { JobPostingStep2Form } from "@/models/JobPostingStep2Form";

export function jobPostingStep2InputMapper(
  id: string,
  jobPostingForm: JobPostingStep2Form,
): JobPostingRequirementsInput {
  return {
    id,
    skills: jobPostingForm.skills.map((skillId) => {
      return { id: skillId };
    }),
    languages: jobPostingForm.languages.map((selectedLanguage) => {
      return {
        language: selectedLanguage.language.id,
        languageLevel: selectedLanguage.level.id,
      };
    }),
    jobRequirements: jobPostingForm.jobRequirements.map((jobRequirementId) => {
      return { id: jobRequirementId };
    }),
  };
}
