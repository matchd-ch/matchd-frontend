import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type CompanyProfileBaseDataMutationVariables = Types.Exact<{
  input: Types.CompanyProfileBaseDataInput;
}>;

export type CompanyProfileBaseDataMutation = {
  __typename?: "Mutation";
  companyProfileBaseData?: {
    __typename?: "CompanyProfileBaseDataPayload";
    success?: boolean | null;
    errors?: any | null;
  } | null;
};

export const CompanyProfileBaseDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "companyProfileBaseData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CompanyProfileBaseDataInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "companyProfileBaseData" },
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
} as unknown as DocumentNode<
  CompanyProfileBaseDataMutation,
  CompanyProfileBaseDataMutationVariables
>;
