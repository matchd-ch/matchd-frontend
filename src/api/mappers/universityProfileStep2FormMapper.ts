import { UniversityProfileStep2Form } from "@/models/UniversityProfileStep2Form";
import { MeQuery } from "../queries/me.generated";

export function universityProfileStep2FormMapper(
  user: NonNullable<MeQuery["me"]>
): UniversityProfileStep2Form {
  return {
    description: user.company?.description || "",
  };
}
