import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type CompanyProfileRelationsMutationVariables = Types.Exact<{
  relations: Types.CompanyProfileInputRelations;
}>;

export type CompanyProfileRelationsMutation = {
  __typename?: "Mutation";
  companyProfileRelations?: {
    __typename?: "CompanyProfileRelations";
    success?: boolean | null;
    errors?: any | null;
  } | null;
};

export const CompanyProfileRelationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "companyProfileRelations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "relations" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CompanyProfileInputRelations" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "companyProfileRelations" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "relations" },
                value: { kind: "Variable", name: { kind: "Name", value: "relations" } },
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
  CompanyProfileRelationsMutation,
  CompanyProfileRelationsMutationVariables
>;
