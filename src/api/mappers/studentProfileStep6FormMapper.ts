import { ProfileState } from "@/api/models/types";
import { StudentProfileStep6Form } from "@/models/StudentProfileStep6Form";
import type { User } from "api";

export function studentProfileStep6FormMapper(user: User): StudentProfileStep6Form {
  return {
    state:
      user.student?.state === ProfileState.Public ? ProfileState.Public : ProfileState.Anonymous,
  };
}
