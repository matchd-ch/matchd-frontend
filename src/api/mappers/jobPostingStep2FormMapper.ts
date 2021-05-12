import { JobPostingStep2Form } from "@/models/JobPostingStep2Form";
import type { JobPosting } from "api";

export function jobPostingStep2FormMapper(jobPosting: JobPosting): JobPostingStep2Form {
  return {
    languages:
      jobPosting.languages?.map((language) => {
        return {
          language: language.language,
          level: language.languageLevel,
        };
      }) || [],
    skills: jobPosting.skills?.map((skill) => skill.id) || [],
    jobRequirements: jobPosting.jobRequirements.map((jobRequirement) => jobRequirement.id) || [],
  };
}
