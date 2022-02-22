import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type SoftSkillsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type SoftSkillsQuery = {
  __typename?: "Query";
  softSkills?: {
    __typename?: "SoftSkillConnectionsConnection";
    edges: Array<{
      __typename?: "SoftSkillConnectionsEdge";
      node?: { __typename?: "SoftSkill"; id: string; company: string; student: string } | null;
    } | null>;
  } | null;
};

export const SoftSkillsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "softSkills" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "softSkills" },
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
} as unknown as DocumentNode<SoftSkillsQuery, SoftSkillsQueryVariables>;
