import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type UploadConfigurationsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UploadConfigurationsQuery = {
  __typename?: "Query";
  uploadConfigurations?: Array<{
    __typename?: "UploadConfiguration";
    key: Types.AttachmentKey;
    maxFiles: number;
    contentTypesConfiguration: Array<{
      __typename?: "UploadTypeConfiguration";
      contentTypes: Array<string>;
      maxSize: number;
    }>;
  } | null> | null;
};

export const UploadConfigurationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "uploadConfigurations" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "uploadConfigurations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "key" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "contentTypesConfiguration" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "contentTypes" } },
                      { kind: "Field", name: { kind: "Name", value: "maxSize" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "maxFiles" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UploadConfigurationsQuery, UploadConfigurationsQueryVariables>;
