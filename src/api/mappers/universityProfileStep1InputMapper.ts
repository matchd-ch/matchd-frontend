import type { UniversityProfileBaseDataInput } from "@/api/models/types";
import type { UniversityProfileStep1Form } from "@/models/UniversityProfileStep1Form";

export function universityProfileStep1InputMapper(
  universityProfileForm: UniversityProfileStep1Form,
): UniversityProfileBaseDataInput {
  return {
    ...universityProfileForm,
  };
}
