import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type RegisterCompanyMutationVariables = Types.Exact<{
  name: Types.Scalars["String"]["input"];
  email: Types.Scalars["String"]["input"];
  password: Types.Scalars["String"]["input"];
  firstName: Types.Scalars["String"]["input"];
  lastName: Types.Scalars["String"]["input"];
  zip: Types.Scalars["String"]["input"];
  city: Types.Scalars["String"]["input"];
  uid?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  role: Types.Scalars["String"]["input"];
  type: Types.Scalars["String"]["input"];
}>;

export type RegisterCompanyMutation = {
  __typename?: "Mutation";
  registerCompany?: {
    __typename?: "RegisterCompany";
    success?: boolean | null;
    errors?: unknown | null;
  } | null;
};

export const RegisterCompanyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "registerCompany" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
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
          variable: { kind: "Variable", name: { kind: "Name", value: "zip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "city" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uid" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "role" } },
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
            name: { kind: "Name", value: "registerCompany" },
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
              {
                kind: "Argument",
                name: { kind: "Name", value: "company" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "name" },
                      value: { kind: "Variable", name: { kind: "Name", value: "name" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "zip" },
                      value: { kind: "Variable", name: { kind: "Name", value: "zip" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "city" },
                      value: { kind: "Variable", name: { kind: "Name", value: "city" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "uid" },
                      value: { kind: "Variable", name: { kind: "Name", value: "uid" } },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "employee" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "role" },
                      value: { kind: "Variable", name: { kind: "Name", value: "role" } },
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
} as unknown as DocumentNode<RegisterCompanyMutation, RegisterCompanyMutationVariables>;
