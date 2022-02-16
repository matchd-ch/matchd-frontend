import { StudentProfileStep4Form } from "@/models/StudentProfileStep4Form";
import type { User } from "api";

export function studentProfileStep4FormMapper(user: User): StudentProfileStep4Form {
  return {
    skills:
      user.student?.skills?.edges
        .filter((edge) => edge?.node?.id !== undefined)
        .map((edge) => edge!.node!.id) || [],
    languages:
      user.student?.languages?.edges
        .filter((edge) => edge?.node?.language && edge?.node?.languageLevel)
        .map((edge) => ({
          language: edge!.node!.language,
          level: edge!.node!.languageLevel,
        })) || [],
    onlineProjects: user.student?.onlineProjects || [],
    hobbies: user.student?.hobbies || [],
    distinction: user.student?.distinction || "",
  };
}
