import { StudentProfileStep4Form } from "@/models/StudentProfileStep4Form";
import type { User } from "api";

export function studentProfileStep4FormMapper(user: User): StudentProfileStep4Form {
  return {
    skills: user.student?.skills.map((skill) => skill.id) || [],
    languages:
      user.student?.languages.map((language) => {
        return {
          language: language.language,
          level: language.languageLevel,
        };
      }) || [],
    onlineProjects: user.student?.onlineProjects || [],
    hobbies: user.student?.hobbies || [],
    distinction: user.student?.distinction || "",
  };
}
