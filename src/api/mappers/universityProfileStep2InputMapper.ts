import { IUniversityProfileInputStep2 } from "@/api/models/types";
import { UniversityProfileStep2Form } from "@/models/UniversityProfileStep2Form";

export function universityProfileStep2InputMapper(
  universityProfileForm: UniversityProfileStep2Form
): IUniversityProfileInputStep2 {
  return {
    ...universityProfileForm,
  };
}
