import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type StudentProfileAbilitiesMutationVariables = Types.Exact<{
  input: Types.StudentProfileAbilitiesInput;
}>;

export type StudentProfileAbilitiesMutation = {
  __typename?: "Mutation";
  studentProfileAbilities?: {
    __typename?: "StudentProfileAbilitiesPayload";
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
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "StudentProfileAbilitiesInput" },
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
  StudentProfileAbilitiesMutation,
  StudentProfileAbilitiesMutationVariables
>;
