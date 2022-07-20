import type { Maybe, Scalars } from "@/api/models/types";
import { MatchdApiError } from "@/models/MatchdApiError";

type GraphQLErrorObject = { message: string; code: string };
type GraphQLError = GraphQLErrorObject | string;

export function errorCodeMapper(
  graphQLErrors: Maybe<Scalars["ExpectedErrorType"]>
): MatchdApiError | null {
  const mappedErrors: MatchdApiError = {};

  if (!graphQLErrors || typeof graphQLErrors !== "object") {
    return null;
  }

  for (const [key, value] of Object.entries(graphQLErrors)) {
    mappedErrors[key] = (value as GraphQLError[]).map((error) =>
      typeof error === "string" ? error : error.code
    );
  }
  return mappedErrors;
}
