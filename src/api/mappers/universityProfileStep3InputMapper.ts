import { IUniversityProfileInputStep3 } from "@/api/models/types";
import { UniversityProfileStep3Form } from "@/models/UniversityProfileStep3Form";

export function universityProfileStep3Mapper(
  universityProfileForm: UniversityProfileStep3Form
): IUniversityProfileInputStep3 {
  return {
    ...universityProfileForm,
    branches: universityProfileForm.branches.map((branch) => {
      return { id: branch.id };
    }),
  };
}
