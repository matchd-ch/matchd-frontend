import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type PasswordChangeMutationVariables = Types.Exact<{
  oldPassword: Types.Scalars["String"];
  newPassword1: Types.Scalars["String"];
  newPassword2: Types.Scalars["String"];
}>;

export type PasswordChangeMutation = {
  __typename?: "Mutation";
  passwordChange?: {
    __typename?: "PasswordChange";
    success?: boolean | null;
    errors?: any | null;
  } | null;
};

export const PasswordChangeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "PasswordChange" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "oldPassword" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "newPassword1" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "newPassword2" } },
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
            name: { kind: "Name", value: "passwordChange" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "oldPassword" },
                value: { kind: "Variable", name: { kind: "Name", value: "oldPassword" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "newPassword1" },
                value: { kind: "Variable", name: { kind: "Name", value: "newPassword1" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "newPassword2" },
                value: { kind: "Variable", name: { kind: "Name", value: "newPassword2" } },
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
} as unknown as DocumentNode<PasswordChangeMutation, PasswordChangeMutationVariables>;
