import type { UniversityProfileStep1Form } from "@/models/UniversityProfileStep1Form";
import type { MeQuery } from "../queries/me.generated";

export function universityProfileStep1FormMapper(
  user: NonNullable<MeQuery["me"]>
): UniversityProfileStep1Form {
  return {
    name: user.company?.name || "",
    street: user.company?.street || "",
    city: user.company?.city || "",
    zip: user.company?.zip || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    role: user.employee?.role || "",
    website: user.company?.website || "",
    phone: user.company?.phone || "",
    topLevelOrganisationWebsite: user.company?.topLevelOrganisationWebsite || "",
    topLevelOrganisationDescription: user.company?.topLevelOrganisationDescription || "",
  };
}
