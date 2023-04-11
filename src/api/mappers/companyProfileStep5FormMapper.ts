import type { CompanyProfileStep5Form } from "@/models/CompanyProfileStep5Form";
import type { MeQuery } from "../queries/me.generated";

export function companyProfileStep4FormMapper(
  user: NonNullable<MeQuery["me"]>
): CompanyProfileStep5Form {
  return {
    email: user.email || "",
    password: "",
  };
}
