import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type CompanyProfileAdvantagesMutationVariables = Types.Exact<{
  advantages: Types.CompanyProfileInputAdvantages;
}>;

export type CompanyProfileAdvantagesMutation = {
  __typename?: "Mutation";
  companyProfileAdvantages?: {
    __typename?: "CompanyProfileAdvantages";
    success?: boolean | null;
    errors?: any | null;
  } | null;
};

export const CompanyProfileAdvantagesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "companyProfileAdvantages" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "advantages" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CompanyProfileInputAdvantages" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "companyProfileAdvantages" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "advantages" },
                value: { kind: "Variable", name: { kind: "Name", value: "advantages" } },
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
  CompanyProfileAdvantagesMutation,
  CompanyProfileAdvantagesMutationVariables
>;
