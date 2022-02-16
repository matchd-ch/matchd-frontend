import { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";
import type { User } from "api";

export function studentProfileStep3FormMapper(user: User): StudentProfileStep3Form {
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
