import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type UniversityProfileRelationsMutationVariables = Types.Exact<{
  input: Types.UniversityProfileRelationsInput;
}>;

export type UniversityProfileRelationsMutation = {
  __typename?: "Mutation";
  universityProfileRelations?: {
    __typename?: "UniversityProfileRelationsPayload";
    success?: boolean | null;
    errors?: unknown | null;
  } | null;
};

export const UniversityProfileRelationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "universityProfileRelations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UniversityProfileRelationsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "universityProfileRelations" },
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
  UniversityProfileRelationsMutation,
  UniversityProfileRelationsMutationVariables
>;
