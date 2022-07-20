import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type MatchJobPostingMutationVariables = Types.Exact<{
  jobPosting: Types.JobPostingInput;
}>;

export type MatchJobPostingMutation = {
  __typename?: "Mutation";
  matchJobPosting?: {
    __typename?: "MatchJobPostingPayload";
    success?: boolean | null;
    errors?: unknown | null;
    confirmed: boolean;
  } | null;
};

export const MatchJobPostingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "matchJobPosting" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "jobPosting" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "JobPostingInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "matchJobPosting" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "jobPosting" },
                      value: { kind: "Variable", name: { kind: "Name", value: "jobPosting" } },
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
} as unknown as DocumentNode<MatchJobPostingMutation, MatchJobPostingMutationVariables>;
