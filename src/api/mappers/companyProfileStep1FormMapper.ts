import { CompanyProfileStep1Form } from "@/models/CompanyProfileStep1Form";
import type { User } from "api";

export function companyProfileStep1FormMapper(user: User): CompanyProfileStep1Form {
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
