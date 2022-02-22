import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type StudentProfileCharacterMutationVariables = Types.Exact<{
  character: Types.StudentProfileInputCharacter;
}>;

export type StudentProfileCharacterMutation = {
  __typename?: "Mutation";
  studentProfileCharacter?: {
    __typename?: "StudentProfileCharacter";
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
          variable: { kind: "Variable", name: { kind: "Name", value: "character" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "StudentProfileInputCharacter" },
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
                name: { kind: "Name", value: "character" },
                value: { kind: "Variable", name: { kind: "Name", value: "character" } },
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
