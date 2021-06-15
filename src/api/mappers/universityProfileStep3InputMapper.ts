import { IUniversityProfileInputStep3 } from "@/api/models/types";
import { UniversityProfileStep3Form } from "@/models/UniversityProfileStep3Form";

export function universityProfileStep3InputMapper(
  universityProfileForm: UniversityProfileStep3Form
): IUniversityProfileInputStep3 {
  return {
    linkEducation: universityProfileForm.linkEducation,
    linkProjects: universityProfileForm.linkProjects,
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
