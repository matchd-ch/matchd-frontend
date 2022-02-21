import { IUniversityProfileInputSpecificData } from "@/api/models/types";
import { UniversityProfileStep2Form } from "@/models/UniversityProfileStep2Form";

export function universityProfileStep2InputMapper(
  universityProfileForm: UniversityProfileStep2Form
): IUniversityProfileInputSpecificData {
  return {
    ...universityProfileForm,
  };
}
