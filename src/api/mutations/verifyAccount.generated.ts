import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type VerifyAccountMutationVariables = Types.Exact<{
  token: Types.Scalars["String"];
}>;

export type VerifyAccountMutation = {
  __typename?: "Mutation";
  verifyAccount?: {
    __typename?: "VerifyAccount";
    success?: boolean | null;
    errors?: unknown | null;
  } | null;
};

export const VerifyAccountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "verifyAccount" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "token" } },
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
            name: { kind: "Name", value: "verifyAccount" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: { kind: "Variable", name: { kind: "Name", value: "token" } },
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
} as unknown as DocumentNode<VerifyAccountMutation, VerifyAccountMutationVariables>;
