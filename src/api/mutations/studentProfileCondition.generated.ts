import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type StudentProfileConditionMutationVariables = Types.Exact<{
  condition: Types.StudentProfileInputCondition;
}>;

export type StudentProfileConditionMutation = {
  __typename?: "Mutation";
  studentProfileCondition?: {
    __typename?: "StudentProfileCondition";
    success?: boolean | null;
    errors?: any | null;
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
          variable: { kind: "Variable", name: { kind: "Name", value: "condition" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "StudentProfileInputCondition" },
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
                name: { kind: "Name", value: "condition" },
                value: { kind: "Variable", name: { kind: "Name", value: "condition" } },
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
