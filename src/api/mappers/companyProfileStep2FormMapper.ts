import { CompanyProfileStep2Form } from "@/models/CompanyProfileStep2Form";
import { MeQuery } from "../queries/me.generated";

export function companyProfileStep2FormMapper(
  user: NonNullable<MeQuery["me"]>
): CompanyProfileStep2Form {
  return {
    website: user.company?.website || "",
    description: user.company?.description || "",
    services: user.company?.services || "",
    ...(user.company?.memberItStGallen === true && {
      memberItStGallen: user.company?.memberItStGallen === true,
    }),
  };
}
