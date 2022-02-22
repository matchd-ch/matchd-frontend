import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type StudentProfileAbilitiesMutationVariables = Types.Exact<{
  abilities: Types.StudentProfileInputAbilities;
}>;

export type StudentProfileAbilitiesMutation = {
  __typename?: "Mutation";
  studentProfileAbilities?: {
    __typename?: "StudentProfileAbilities";
    success?: boolean | null;
    errors?: any | null;
  } | null;
};

export const StudentProfileAbilitiesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "studentProfileAbilities" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "abilities" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "StudentProfileInputAbilities" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentProfileAbilities" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "abilities" },
                value: { kind: "Variable", name: { kind: "Name", value: "abilities" } },
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
  StudentProfileAbilitiesMutation,
  StudentProfileAbilitiesMutationVariables
>;
