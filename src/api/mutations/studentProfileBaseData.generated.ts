import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type StudentProfileBaseDataMutationVariables = Types.Exact<{
  baseData: Types.StudentProfileInputBaseData;
}>;

export type StudentProfileBaseDataMutation = {
  __typename?: "Mutation";
  studentProfileBaseData?: {
    __typename?: "StudentProfileBaseData";
    success?: boolean | null;
    errors?: any | null;
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
          variable: { kind: "Variable", name: { kind: "Name", value: "baseData" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "StudentProfileInputBaseData" },
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
                name: { kind: "Name", value: "baseData" },
                value: { kind: "Variable", name: { kind: "Name", value: "baseData" } },
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
