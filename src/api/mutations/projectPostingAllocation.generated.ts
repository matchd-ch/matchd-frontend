import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ProjectPostingAllocationMutationVariables = Types.Exact<{
  allocation: Types.ProjectPostingInputAllocation;
}>;

export type ProjectPostingAllocationMutation = {
  __typename?: "Mutation";
  projectPostingAllocation?: {
    __typename?: "ProjectPostingAllocation";
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
          variable: { kind: "Variable", name: { kind: "Name", value: "allocation" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ProjectPostingInputAllocation" },
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
                name: { kind: "Name", value: "allocation" },
                value: { kind: "Variable", name: { kind: "Name", value: "allocation" } },
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
