import { ProfileState } from "@/api/models/types";
import type { StudentProfileStep6Form } from "@/models/StudentProfileStep6Form";
import type { MeQuery } from "../queries/me.generated";

export function studentProfileStep6FormMapper(
  user: NonNullable<MeQuery["me"]>,
): StudentProfileStep6Form {
  return {
    state:
      user.student?.state === ProfileState.Public ? ProfileState.Public : ProfileState.Anonymous,
  };
}
