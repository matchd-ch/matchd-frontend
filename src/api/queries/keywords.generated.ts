import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { KeywordsKeywordFragmentDoc } from "./keywordsFragment.generated";
export type KeywordsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type KeywordsQuery = {
  __typename?: "Query";
  keywords?: {
    __typename?: "KeywordConnection";
    edges: Array<{
      __typename?: "KeywordEdge";
      node?: { __typename?: "Keyword"; id: string; name: string } | null;
    } | null>;
  } | null;
};

export const KeywordsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "keywords" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "keywords" },
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
                              name: { kind: "Name", value: "keywordsKeyword" },
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
    ...KeywordsKeywordFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<KeywordsQuery, KeywordsQueryVariables>;
