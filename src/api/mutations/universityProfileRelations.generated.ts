import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type UniversityProfileRelationsMutationVariables = Types.Exact<{
  relations: Types.UniversityProfileInputRelations;
}>;

export type UniversityProfileRelationsMutation = {
  __typename?: "Mutation";
  universityProfileRelations?: {
    __typename?: "UniversityProfileRelations";
    success?: boolean | null;
    errors?: any | null;
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
          variable: { kind: "Variable", name: { kind: "Name", value: "relations" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UniversityProfileInputRelations" },
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
                name: { kind: "Name", value: "relations" },
                value: { kind: "Variable", name: { kind: "Name", value: "relations" } },
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
