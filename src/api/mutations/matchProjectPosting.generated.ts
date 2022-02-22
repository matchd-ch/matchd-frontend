import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type MatchProjectPostingMutationVariables = Types.Exact<{
  projectPosting: Types.ProjectPostingInput;
}>;

export type MatchProjectPostingMutation = {
  __typename?: "Mutation";
  matchProjectPosting?: {
    __typename?: "MatchProjectPosting";
    success?: boolean | null;
    errors?: any | null;
    confirmed: boolean;
  } | null;
};

export const MatchProjectPostingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "matchProjectPosting" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "projectPosting" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ProjectPostingInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "matchProjectPosting" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "match" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "projectPosting" },
                      value: { kind: "Variable", name: { kind: "Name", value: "projectPosting" } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "errors" } },
                { kind: "Field", name: { kind: "Name", value: "confirmed" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MatchProjectPostingMutation, MatchProjectPostingMutationVariables>;
