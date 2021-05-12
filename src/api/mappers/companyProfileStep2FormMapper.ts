import { CompanyProfileStep2Form } from "@/models/CompanyProfileStep2Form";
import type { User } from "api";

export function companyProfileStep2FormMapper(user: User): CompanyProfileStep2Form {
  return {
    website: user.company?.website || "",
    description: user.company?.description || "",
    services: user.company?.services || "",
    ...(user.company?.memberItStGallen === true && {
      memberItStGallen: user.company?.memberItStGallen === true,
    }),
  };
}
