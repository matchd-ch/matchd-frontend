import type { JobPosting } from "@/api/models/types";
import { JobPostingStep2Form } from "@/models/JobPostingStep2Form";

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
    jobRequirements:
      jobPosting.jobRequirements?.edges
        .filter((edge) => edge?.node?.id !== undefined)
        .map((edge) => edge!.node!.id) || [],
  };
}
