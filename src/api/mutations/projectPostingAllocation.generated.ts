import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ProjectPostingAllocationMutationVariables = Types.Exact<{
  input: Types.ProjectPostingAllocationInput;
}>;

export type ProjectPostingAllocationMutation = {
  __typename?: "Mutation";
  projectPostingAllocation?: {
    __typename?: "ProjectPostingAllocationPayload";
    success?: boolean | null;
    errors?: any | null;
    projectPostingId?: string | null;
    slug?: string | null;
  } | null;
};

export const ProjectPostingAllocationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "projectPostingAllocation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ProjectPostingAllocationInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projectPostingAllocation" },
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
                { kind: "Field", name: { kind: "Name", value: "projectPostingId" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ProjectPostingAllocationMutation,
  ProjectPostingAllocationMutationVariables
>;
