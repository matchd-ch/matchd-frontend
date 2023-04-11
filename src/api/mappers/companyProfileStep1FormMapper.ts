import type { CompanyProfileStep1Form } from "@/models/CompanyProfileStep1Form";
import type { MeQuery } from "../queries/me.generated";

export function companyProfileStep1FormMapper(
  user: NonNullable<MeQuery["me"]>
): CompanyProfileStep1Form {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.employee?.role || "",
    name: user.company?.name || "",
    city: user.company?.city || "",
    phone: user.company?.phone || "",
    street: user.company?.street || "",
    zip: user.company?.zip || "",
  };
}
