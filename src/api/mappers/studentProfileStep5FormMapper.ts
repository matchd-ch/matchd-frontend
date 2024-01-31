import type { StudentProfileStep5Form } from "@/models/StudentProfileStep5Form";
import type { MeQuery } from "../queries/me.generated";

export function studentProfileStep5FormMapper(
  user: NonNullable<MeQuery["me"]>,
): StudentProfileStep5Form {
  return {
    nickname: user.student?.nickname || "",
  };
}
