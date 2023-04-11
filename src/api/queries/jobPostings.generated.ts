import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type JobPostingsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type JobPostingsQuery = {
  __typename?: "Query";
  jobPostings?: {
    __typename?: "JobPostingConnection";
    edges: Array<{
      __typename?: "JobPostingEdge";
      node?: {
        __typename?: "JobPosting";
        id: string;
        slug: string;
        title: string;
        displayTitle: string;
      } | null;
    } | null>;
  } | null;
};

export const JobPostingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "jobPostings" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "jobPostings" },
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
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "jobPostingsJobPosting" },
                            },
                          ],
                        },
                      },
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
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "jobPostingsJobPosting" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "JobPosting" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<JobPostingsQuery, JobPostingsQueryVariables>;
