import { UniversityProfileInputBaseData } from "@/api/models/types";
import { UniversityProfileStep1Form } from "@/models/UniversityProfileStep1Form";

export function universityProfileStep1InputMapper(
  universityProfileForm: UniversityProfileStep1Form
): UniversityProfileInputBaseData {
  return {
    ...universityProfileForm,
  };
}
