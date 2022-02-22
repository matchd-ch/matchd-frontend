import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ProjectPostingBaseDataMutationVariables = Types.Exact<{
  baseData: Types.ProjectPostingInputBaseData;
}>;

export type ProjectPostingBaseDataMutation = {
  __typename?: "Mutation";
  projectPostingBaseData?: {
    __typename?: "ProjectPostingBaseData";
    success?: boolean | null;
    errors?: any | null;
    projectPostingId?: string | null;
    slug?: string | null;
  } | null;
};

export const ProjectPostingBaseDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "projectPostingBaseData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "baseData" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ProjectPostingInputBaseData" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projectPostingBaseData" },
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
  ProjectPostingBaseDataMutation,
  ProjectPostingBaseDataMutationVariables
>;
