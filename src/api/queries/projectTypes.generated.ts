import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { ProjectTypesProjectTypeFragmentDoc } from "./projectTypesFragment.generated";
export type ProjectTypesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ProjectTypesQuery = {
  __typename?: "Query";
  projectTypes?: {
    __typename?: "ProjectTypeConnection";
    edges: Array<{
      __typename?: "ProjectTypeEdge";
      node?: { __typename?: "ProjectType"; id: string; name: string } | null;
    } | null>;
  } | null;
};

export const ProjectTypesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "projectTypes" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projectTypes" },
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
                              name: { kind: "Name", value: "projectTypesProjectType" },
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
    ...ProjectTypesProjectTypeFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ProjectTypesQuery, ProjectTypesQueryVariables>;
