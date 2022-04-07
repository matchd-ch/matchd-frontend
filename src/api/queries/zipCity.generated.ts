import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { ZipCityZipCityFragmentDoc } from "./zipCityFragment.generated";
export type ZipCityQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ZipCityQuery = {
  __typename?: "Query";
  zipCity: Array<{ __typename?: "ZipCity"; zip: string; city: string; canton: string }>;
};

export const ZipCityDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "zipCity" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "zipCity" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "zipCityZipCity" } },
              ],
            },
          },
        ],
      },
    },
    ...ZipCityZipCityFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ZipCityQuery, ZipCityQueryVariables>;
