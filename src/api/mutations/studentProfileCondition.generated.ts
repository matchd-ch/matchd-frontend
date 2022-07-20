import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type StudentProfileConditionMutationVariables = Types.Exact<{
  input: Types.StudentProfileConditionInput;
}>;

export type StudentProfileConditionMutation = {
  __typename?: "Mutation";
  studentProfileCondition?: {
    __typename?: "StudentProfileConditionPayload";
    success?: boolean | null;
    errors?: unknown | null;
  } | null;
};

export const StudentProfileConditionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "studentProfileCondition" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "StudentProfileConditionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentProfileCondition" },
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
  StudentProfileConditionMutation,
  StudentProfileConditionMutationVariables
>;
