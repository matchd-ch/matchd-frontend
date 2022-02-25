import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type CompanyProfileValuesMutationVariables = Types.Exact<{
  input: Types.CompanyProfileValuesInput;
}>;

export type CompanyProfileValuesMutation = {
  __typename?: "Mutation";
  companyProfileValues?: {
    __typename?: "CompanyProfileValuesPayload";
    success?: boolean | null;
    errors?: any | null;
  } | null;
};

export const CompanyProfileValuesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "companyProfileValues" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CompanyProfileValuesInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "companyProfileValues" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
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
} as unknown as DocumentNode<CompanyProfileValuesMutation, CompanyProfileValuesMutationVariables>;
