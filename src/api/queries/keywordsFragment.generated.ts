import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type KeywordsKeywordFragment = { __typename?: "Keyword"; id: string; name: string };

export const KeywordsKeywordFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "keywordsKeyword" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Keyword" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<KeywordsKeywordFragment, unknown>;
