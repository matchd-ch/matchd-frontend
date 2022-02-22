import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ProjectPostingSpecificDataMutationVariables = Types.Exact<{
  specificData: Types.ProjectPostingInputSpecificData;
}>;

export type ProjectPostingSpecificDataMutation = {
  __typename?: "Mutation";
  projectPostingSpecificData?: {
    __typename?: "ProjectPostingSpecificData";
    success?: boolean | null;
    errors?: any | null;
    projectPostingId?: string | null;
    slug?: string | null;
  } | null;
};

export const ProjectPostingSpecificDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "projectPostingSpecificData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "specificData" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ProjectPostingInputSpecificData" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projectPostingSpecificData" },
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
  ProjectPostingSpecificDataMutation,
  ProjectPostingSpecificDataMutationVariables
>;
