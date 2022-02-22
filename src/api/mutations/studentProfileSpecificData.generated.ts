import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type StudentProfileSpecificDataMutationVariables = Types.Exact<{
  specificData: Types.StudentProfileInputSpecificData;
}>;

export type StudentProfileSpecificDataMutation = {
  __typename?: "Mutation";
  studentProfileSpecificData?: {
    __typename?: "StudentProfileSpecificData";
    success?: boolean | null;
    errors?: any | null;
    nicknameSuggestions?: Array<string | null> | null;
  } | null;
};

export const StudentProfileSpecificDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "studentProfileSpecificData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "specificData" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "StudentProfileInputSpecificData" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentProfileSpecificData" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "specificData" },
                value: { kind: "Variable", name: { kind: "Name", value: "specificData" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "errors" } },
                { kind: "Field", name: { kind: "Name", value: "nicknameSuggestions" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StudentProfileSpecificDataMutation,
  StudentProfileSpecificDataMutationVariables
>;
