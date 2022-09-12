import { UniversityProfileRelationsInput } from "@/api/models/types";
import { UniversityProfileStep3Form } from "@/models/UniversityProfileStep3Form";

export function universityProfileStep3InputMapper(
  universityProfileForm: UniversityProfileStep3Form
): UniversityProfileRelationsInput {
  return {
    linkEducation: universityProfileForm.linkEducation,
    linkChallenges: universityProfileForm.linkChallenges,
    linkThesis: universityProfileForm.linkThesis,
    services: universityProfileForm.services,
    branches: universityProfileForm.branches.map((branchId) => {
      return { id: branchId };
    }),
    benefits: universityProfileForm.benefits.map((benefitId) => {
      return { id: benefitId };
    }),
  };
}
