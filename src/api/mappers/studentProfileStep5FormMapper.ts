import type { User } from "@/api/models/types";
import { StudentProfileStep5Form } from "@/models/StudentProfileStep5Form";

export function studentProfileStep5FormMapper(user: User): StudentProfileStep5Form {
  return {
    nickname: user.student?.nickname || "",
  };
}
