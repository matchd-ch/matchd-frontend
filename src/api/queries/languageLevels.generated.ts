import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type LanguageLevelsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type LanguageLevelsQuery = {
  __typename?: "Query";
  languageLevels?: {
    __typename?: "LanguageLevelConnection";
    edges: Array<{
      __typename?: "LanguageLevelEdge";
      node?: {
        __typename?: "LanguageLevel";
        id: string;
        level: string;
        description?: string | null;
      } | null;
    } | null>;
  } | null;
};

export const LanguageLevelsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "languageLevels" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "languageLevels" },
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
                            { kind: "Field", name: { kind: "Name", value: "level" } },
                            { kind: "Field", name: { kind: "Name", value: "description" } },
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
} as unknown as DocumentNode<LanguageLevelsQuery, LanguageLevelsQueryVariables>;
