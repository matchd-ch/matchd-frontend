import type { User } from "@/api/models/types";
import { UniversityProfileStep2Form } from "@/models/UniversityProfileStep2Form";

export function universityProfileStep2FormMapper(user: User): UniversityProfileStep2Form {
  return {
    description: user.company?.description || "",
  };
}
