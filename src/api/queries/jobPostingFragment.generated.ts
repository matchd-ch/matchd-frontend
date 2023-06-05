import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type JobPostingJobPostingFragment = {
  __typename?: "JobPosting";
  id: string;
  title: string;
  displayTitle: string;
  description: string;
  jobPeriodByAgreement: boolean;
  jobFromDate?: string | null;
  jobToDate?: string | null;
  datePublished?: string | null;
  url?: string | null;
  workloadFrom: number;
  workloadTo: number;
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
};

export const JobPostingJobPostingFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "jobPostingJobPosting" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "JobPosting" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "jobPeriodByAgreement" } },
          { kind: "Field", name: { kind: "Name", value: "jobFromDate" } },
          { kind: "Field", name: { kind: "Name", value: "jobToDate" } },
          { kind: "Field", name: { kind: "Name", value: "datePublished" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
          { kind: "Field", name: { kind: "Name", value: "workloadFrom" } },
          { kind: "Field", name: { kind: "Name", value: "workloadTo" } },
          { kind: "Field", name: { kind: "Name", value: "formStep" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "matchStatus" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "initiator" } },
                { kind: "Field", name: { kind: "Name", value: "confirmed" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "company" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "street" } },
                { kind: "Field", name: { kind: "Name", value: "zip" } },
                { kind: "Field", name: { kind: "Name", value: "city" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "jobType" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "branches" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "skills" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "jobRequirements" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "100" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "languages" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "language" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "languageLevel" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "level" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "employee" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<JobPostingJobPostingFragment, unknown>;
