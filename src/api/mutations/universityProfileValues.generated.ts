import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type UniversityProfileValuesMutationVariables = Types.Exact<{
  values: Types.UniversityProfileInputValues;
}>;

export type UniversityProfileValuesMutation = {
  __typename?: "Mutation";
  universityProfileValues?: {
    __typename?: "UniversityProfileValues";
    success?: boolean | null;
    errors?: any | null;
  } | null;
};

export const UniversityProfileValuesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "universityProfileValues" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "values" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UniversityProfileInputValues" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "universityProfileValues" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "values" },
                value: { kind: "Variable", name: { kind: "Name", value: "values" } },
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
  UniversityProfileValuesMutation,
  UniversityProfileValuesMutationVariables
>;
