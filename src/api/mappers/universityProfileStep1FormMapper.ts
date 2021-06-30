import type { User } from "api";
import { UniversityProfileStep1Form } from "@/models/UniversityProfileStep1Form";

export function universityProfileStep1FormMapper(user: User): UniversityProfileStep1Form {
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
