import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type TopicsTopicFragment = { __typename?: "Topic"; id: string; name: string };

export const TopicsTopicFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "topicsTopic" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Topic" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TopicsTopicFragment, unknown>;
