import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type JobPostingAllocationMutationVariables = Types.Exact<{
  allocation: Types.JobPostingInputAllocation;
}>;

export type JobPostingAllocationMutation = {
  __typename?: "Mutation";
  jobPostingAllocation?: {
    __typename?: "JobPostingAllocationForm";
    success?: boolean | null;
    errors?: any | null;
    jobPostingId?: string | null;
    slug?: string | null;
  } | null;
};

export const JobPostingAllocationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "jobPostingAllocation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "allocation" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "JobPostingInputAllocation" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "jobPostingAllocation" },
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
                { kind: "Field", name: { kind: "Name", value: "jobPostingId" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<JobPostingAllocationMutation, JobPostingAllocationMutationVariables>;
