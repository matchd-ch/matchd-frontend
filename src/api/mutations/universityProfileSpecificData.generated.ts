import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type UniversityProfileSpecificDataMutationVariables = Types.Exact<{
  input: Types.UniversityProfileSpecificDataInput;
}>;

export type UniversityProfileSpecificDataMutation = {
  __typename?: "Mutation";
  universityProfileSpecificData?: {
    __typename?: "UniversityProfileSpecificDataPayload";
    success?: boolean | null;
    errors?: any | null;
  } | null;
};

export const UniversityProfileSpecificDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "universityProfileSpecificData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UniversityProfileSpecificDataInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "universityProfileSpecificData" },
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
  UniversityProfileSpecificDataMutation,
  UniversityProfileSpecificDataMutationVariables
>;
