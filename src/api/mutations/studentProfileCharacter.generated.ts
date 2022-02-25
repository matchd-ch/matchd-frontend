import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type StudentProfileCharacterMutationVariables = Types.Exact<{
  input: Types.StudentProfileCharacterInput;
}>;

export type StudentProfileCharacterMutation = {
  __typename?: "Mutation";
  studentProfileCharacter?: {
    __typename?: "StudentProfileCharacterPayload";
    success?: boolean | null;
    errors?: any | null;
  } | null;
};

export const StudentProfileCharacterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "studentProfileCharacter" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "StudentProfileCharacterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentProfileCharacter" },
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
  StudentProfileCharacterMutation,
  StudentProfileCharacterMutationVariables
>;
