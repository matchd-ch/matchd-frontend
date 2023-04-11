import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ChallengeTypesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ChallengeTypesQuery = {
  __typename?: "Query";
  challengeTypes?: {
    __typename?: "ChallengeTypeConnection";
    edges: Array<{
      __typename?: "ChallengeTypeEdge";
      node?: { __typename?: "ChallengeType"; id: string; name: string } | null;
    } | null>;
  } | null;
};

export const ChallengeTypesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "challengeTypes" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "challengeTypes" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "100" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "challengeTypesChallengeType" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
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
} as unknown as DocumentNode<ChallengeTypesQuery, ChallengeTypesQueryVariables>;
