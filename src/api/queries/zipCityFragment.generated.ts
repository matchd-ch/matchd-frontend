import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ZipCityZipCityFragment = {
  __typename?: "ZipCity";
  zip: string;
  city: string;
  canton: string;
};

export const ZipCityZipCityFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "zipCityZipCity" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ZipCity" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "zip" } },
          { kind: "Field", name: { kind: "Name", value: "city" } },
          { kind: "Field", name: { kind: "Name", value: "canton" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ZipCityZipCityFragment, unknown>;
