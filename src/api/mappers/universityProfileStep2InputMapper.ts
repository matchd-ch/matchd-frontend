import type { UniversityProfileSpecificDataInput } from "@/api/models/types";
import type { UniversityProfileStep2Form } from "@/models/UniversityProfileStep2Form";

export function universityProfileStep2InputMapper(
  universityProfileForm: UniversityProfileStep2Form,
): UniversityProfileSpecificDataInput {
  return {
    ...universityProfileForm,
  };
}
