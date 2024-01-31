import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type UploadChallengeMutationVariables = Types.Exact<{
  file: Types.Scalars["Upload"]["input"];
  key: Types.AttachmentKey;
  challengeId: Types.Scalars["String"]["input"];
}>;

export type UploadChallengeMutation = {
  __typename?: "Mutation";
  upload?: {
    __typename?: "UserUploadPayload";
    success?: boolean | null;
    errors?: unknown | null;
  } | null;
};

export const UploadChallengeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "uploadChallenge" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "file" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Upload" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "key" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "AttachmentKey" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "challengeId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "upload" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "file" },
                      value: { kind: "Variable", name: { kind: "Name", value: "file" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "key" },
                      value: { kind: "Variable", name: { kind: "Name", value: "key" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "challenge" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "id" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "challengeId" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "errors" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UploadChallengeMutation, UploadChallengeMutationVariables>;
