import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type CulturalFitsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CulturalFitsQuery = {
  __typename?: "Query";
  culturalFits?: {
    __typename?: "CulturalFitConnectionsConnection";
    edges: Array<{
      __typename?: "CulturalFitConnectionsEdge";
      node?: { __typename?: "CulturalFit"; id: string; company: string; student: string } | null;
    } | null>;
  } | null;
};

export const CulturalFitsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "culturalFits" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "culturalFits" },
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
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "company" } },
                            { kind: "Field", name: { kind: "Name", value: "student" } },
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
  ],
} as unknown as DocumentNode<CulturalFitsQuery, CulturalFitsQueryVariables>;
