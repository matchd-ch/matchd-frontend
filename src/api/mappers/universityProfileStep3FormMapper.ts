import type { User } from "api";
import { UniversityProfileStep3Form } from "@/models/UniversityProfileStep3Form";

export function universityProfileStep3FormMapper(user: User): UniversityProfileStep3Form {
  return {
    services: user.company?.services || "",
    linkEducation: user.company?.linkEducation || "",
    linkProjects: user.company?.linkProjects || "",
    linkThesis: user.company?.linkThesis || "",
    branches: user.company?.branches?.map((branch) => branch.id) || [],
    benefits: user.company?.benefits?.map((benefit) => benefit.id) || [],
  };
}
