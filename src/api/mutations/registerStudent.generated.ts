import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type RegisterStudentMutationVariables = Types.Exact<{
  email: Types.Scalars["String"];
  password: Types.Scalars["String"];
  firstName: Types.Scalars["String"];
  lastName: Types.Scalars["String"];
  type: Types.Scalars["String"];
}>;

export type RegisterStudentMutation = {
  __typename?: "Mutation";
  registerStudent?: {
    __typename?: "RegisterStudent";
    success?: boolean | null;
    errors?: any | null;
  } | null;
};

export const RegisterStudentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "registerStudent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "email" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "firstName" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "lastName" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
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
            name: { kind: "Name", value: "registerStudent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: { kind: "Variable", name: { kind: "Name", value: "email" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: { kind: "Variable", name: { kind: "Name", value: "email" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password1" },
                value: { kind: "Variable", name: { kind: "Name", value: "password" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password2" },
                value: { kind: "Variable", name: { kind: "Name", value: "password" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "firstName" },
                value: { kind: "Variable", name: { kind: "Name", value: "firstName" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "lastName" },
                value: { kind: "Variable", name: { kind: "Name", value: "lastName" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: { kind: "Variable", name: { kind: "Name", value: "type" } },
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
} as unknown as DocumentNode<RegisterStudentMutation, RegisterStudentMutationVariables>;
