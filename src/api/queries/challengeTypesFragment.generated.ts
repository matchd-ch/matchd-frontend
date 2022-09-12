import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ChallengeTypesChallengeTypeFragment = {
  __typename?: "ChallengeType";
  id: string;
  name: string;
};

export const ChallengeTypesChallengeTypeFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "challengeTypesChallengeType" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ChallengeType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChallengeTypesChallengeTypeFragment, unknown>;
