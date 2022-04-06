import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { ProjectPostingsProjectPostingFragmentDoc } from "./projectPostingsProjectPostingFragment.generated";
export type ProjectPostingsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ProjectPostingsQuery = {
  __typename?: "Query";
  projectPostings?: {
    __typename?: "ProjectPostingConnection";
    edges: Array<{
      __typename?: "ProjectPostingEdge";
      node?: {
        __typename?: "ProjectPosting";
        id: string;
        slug: string;
        title: string;
        displayTitle: string;
      } | null;
    } | null>;
  } | null;
};

export const ProjectPostingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "projectPostings" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projectPostings" },
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
                              name: { kind: "Name", value: "projectPostingsProjectPosting" },
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
    ...ProjectPostingsProjectPostingFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ProjectPostingsQuery, ProjectPostingsQueryVariables>;
