import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type StudentProfileEmploymentMutationVariables = Types.Exact<{
  employment: Types.StudentProfileInputEmployment;
}>;

export type StudentProfileEmploymentMutation = {
  __typename?: "Mutation";
  studentProfileEmployment?: {
    __typename?: "StudentProfileEmployment";
    success?: boolean | null;
    errors?: any | null;
  } | null;
};

export const StudentProfileEmploymentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "studentProfileEmployment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "employment" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "StudentProfileInputEmployment" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentProfileEmployment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "employment" },
                value: { kind: "Variable", name: { kind: "Name", value: "employment" } },
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
  StudentProfileEmploymentMutation,
  StudentProfileEmploymentMutationVariables
>;
