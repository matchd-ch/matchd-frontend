import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type JobPostingRequirementsMutationVariables = Types.Exact<{
  input: Types.JobPostingRequirementsInput;
}>;

export type JobPostingRequirementsMutation = {
  __typename?: "Mutation";
  jobPostingRequirements?: {
    __typename?: "JobPostingRequirementsPayload";
    success?: boolean | null;
    errors?: unknown | null;
    jobPostingId?: string | null;
    slug?: string | null;
  } | null;
};

export const JobPostingRequirementsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "jobPostingRequirements" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "JobPostingRequirementsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "jobPostingRequirements" },
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
} as unknown as DocumentNode<
  JobPostingRequirementsMutation,
  JobPostingRequirementsMutationVariables
>;
