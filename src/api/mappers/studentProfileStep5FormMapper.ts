import { StudentProfileStep5Form } from "@/models/StudentProfileStep5Form";
import type { User } from "api";

export function studentProfileStep5FormMapper(user: User): StudentProfileStep5Form {
  return {
    nickname: user.student?.nickname || "",
  };
}
