import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type StudentProfileBaseDataMutationVariables = Types.Exact<{
  input: Types.StudentProfileBaseDataInput;
}>;

export type StudentProfileBaseDataMutation = {
  __typename?: "Mutation";
  studentProfileBaseData?: {
    __typename?: "StudentProfileBaseDataPayload";
    success?: boolean | null;
    errors?: unknown | null;
  } | null;
};

export const StudentProfileBaseDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "studentProfileBaseData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "StudentProfileBaseDataInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentProfileBaseData" },
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
  StudentProfileBaseDataMutation,
  StudentProfileBaseDataMutationVariables
>;
