import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type UniversityProfileBaseDataMutationVariables = Types.Exact<{
  input: Types.UniversityProfileBaseDataInput;
}>;

export type UniversityProfileBaseDataMutation = {
  __typename?: "Mutation";
  universityProfileBaseData?: {
    __typename?: "UniversityProfileBaseDataPayload";
    success?: boolean | null;
    errors?: unknown | null;
  } | null;
};

export const UniversityProfileBaseDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "universityProfileBaseData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UniversityProfileBaseDataInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "universityProfileBaseData" },
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
  UniversityProfileBaseDataMutation,
  UniversityProfileBaseDataMutationVariables
>;
