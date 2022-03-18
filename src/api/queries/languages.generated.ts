import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type LanguagesQueryVariables = Types.Exact<{
  shortList?: Types.InputMaybe<Types.Scalars["Boolean"]>;
}>;

export type LanguagesQuery = {
  __typename?: "Query";
  languages?: {
    __typename?: "LanguageConnection";
    edges: Array<{
      __typename?: "LanguageEdge";
      node?: { __typename?: "Language"; id: string; name: string } | null;
    } | null>;
  } | null;
};

export const LanguagesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "languages" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "shortList" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "languages" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "shortList" },
                value: { kind: "Variable", name: { kind: "Name", value: "shortList" } },
              },
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
                            { kind: "Field", name: { kind: "Name", value: "name" } },
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
} as unknown as DocumentNode<LanguagesQuery, LanguagesQueryVariables>;
