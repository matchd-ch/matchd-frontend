import type { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";
import type { MeQuery } from "../queries/me.generated";

export function studentProfileStep3FormMapper(
  user: NonNullable<MeQuery["me"]>,
): StudentProfileStep3Form {
  return {
    culturalFits:
      user.student?.culturalFits?.edges
        .filter((edge) => edge?.node?.id !== undefined)
        .map((edge) => edge!.node!.id) || [],
    softSkills:
      user.student?.softSkills?.edges
        .filter((edge) => edge?.node?.id !== undefined)
        .map((edge) => edge!.node!.id) || [],
  };
}
