import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { TopicsTopicFragmentDoc } from "./topicsFragment.generated";
export type TopicsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TopicsQuery = {
  __typename?: "Query";
  topics?: {
    __typename?: "TopicConnection";
    edges: Array<{
      __typename?: "TopicEdge";
      node?: { __typename?: "Topic"; id: string; name: string } | null;
    } | null>;
  } | null;
};

export const TopicsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "topics" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "topics" },
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
                              name: { kind: "Name", value: "topicsTopic" },
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
    ...TopicsTopicFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<TopicsQuery, TopicsQueryVariables>;
