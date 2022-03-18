import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type JobPostingBaseDataMutationVariables = Types.Exact<{
  input: Types.JobPostingBaseDataInput;
}>;

export type JobPostingBaseDataMutation = {
  __typename?: "Mutation";
  jobPostingBaseData?: {
    __typename?: "JobPostingBaseDataPayload";
    success?: boolean | null;
    errors?: any | null;
    jobPostingId?: string | null;
    slug?: string | null;
  } | null;
};

export const JobPostingBaseDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "jobPostingBaseData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "JobPostingBaseDataInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "jobPostingBaseData" },
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
                { kind: "Field", name: { kind: "Name", value: "jobPostingId" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<JobPostingBaseDataMutation, JobPostingBaseDataMutationVariables>;
