import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type JobPostingRequirementsMutationVariables = Types.Exact<{
  requirements: Types.JobPostingInputRequirements;
}>;

export type JobPostingRequirementsMutation = {
  __typename?: "Mutation";
  jobPostingRequirements?: {
    __typename?: "JobPostingRequirements";
    success?: boolean | null;
    errors?: any | null;
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
          variable: { kind: "Variable", name: { kind: "Name", value: "requirements" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "JobPostingInputRequirements" },
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
                name: { kind: "Name", value: "requirements" },
                value: { kind: "Variable", name: { kind: "Name", value: "requirements" } },
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
