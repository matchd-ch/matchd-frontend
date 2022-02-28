import { UniversityProfileStep3Form } from "@/models/UniversityProfileStep3Form";
import { MeQuery } from "../queries/me.generated";

export function universityProfileStep3FormMapper(
  user: NonNullable<MeQuery["me"]>
): UniversityProfileStep3Form {
  return {
    services: user.company?.services || "",
    linkEducation: user.company?.linkEducation || "",
    linkProjects: user.company?.linkProjects || "",
    linkThesis: user.company?.linkThesis || "",
    branches:
      user.company?.branches?.edges
        .filter((edge) => edge?.node?.id !== undefined)
        .map((edge) => edge!.node!.id) || [],
    benefits:
      user.company?.benefits?.edges
        .filter((edge) => edge?.node?.id !== undefined)
        .map((edge) => edge!.node!.id) || [],
  };
}
