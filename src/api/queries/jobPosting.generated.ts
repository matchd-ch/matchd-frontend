import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { JobPostingJobPostingFragmentDoc } from "./jobPostingFragment.generated";
export type JobPostingQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars["String"]>;
  slug?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export type JobPostingQuery = {
  __typename?: "Query";
  jobPosting?: {
    __typename?: "JobPosting";
    id: string;
    title: string;
    displayTitle: string;
    description: string;
    jobFromDate: string;
    jobToDate?: string | null;
    datePublished?: string | null;
    url?: string | null;
    workload: number;
    formStep: number;
    state: Types.JobPostingState;
    matchStatus?: {
      __typename?: "MatchStatus";
      initiator: Types.ProfileType;
      confirmed: boolean;
    } | null;
    company: {
      __typename?: "Company";
      id: string;
      slug: string;
      name: string;
      street: string;
      zip: string;
      city: string;
      type: Types.ProfileType;
    };
    jobType: { __typename?: "JobType"; id: string; name: string };
    branches: Array<{ __typename?: "Branch"; id: string; name: string }>;
    skills?: Array<{ __typename?: "Skill"; id: string; name: string }> | null;
    jobRequirements: {
      __typename?: "JobRequirementConnection";
      edges: Array<{
        __typename?: "JobRequirementEdge";
        node?: { __typename?: "JobRequirement"; id: string; name: string } | null;
      } | null>;
    };
    languages?: Array<{
      __typename?: "JobPostingLanguageRelation";
      id: string;
      language: { __typename?: "Language"; id: string; name: string };
      languageLevel: {
        __typename?: "LanguageLevel";
        id: string;
        level: string;
        description?: string | null;
      };
    }> | null;
    employee?: {
      __typename?: "Employee";
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      phone?: string | null;
    } | null;
  } | null;
};

export const JobPostingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "jobPosting" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "slug" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "jobPosting" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "jobPostingJobPosting" } },
              ],
            },
          },
        ],
      },
    },
    ...JobPostingJobPostingFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<JobPostingQuery, JobPostingQueryVariables>;
