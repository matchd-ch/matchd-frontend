import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type CompanyProfileRelationsMutationVariables = Types.Exact<{
  input: Types.CompanyProfileRelationsInput;
}>;

export type CompanyProfileRelationsMutation = {
  __typename?: "Mutation";
  companyProfileRelations?: {
    __typename?: "CompanyProfileRelationsPayload";
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
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CompanyProfileRelationsInput" },
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
  CompanyProfileRelationsMutation,
  CompanyProfileRelationsMutationVariables
>;
