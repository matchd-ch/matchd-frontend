import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ProjectPostingsProjectPostingFragment = {
  __typename?: "ProjectPosting";
  id: string;
  slug: string;
  title: string;
  displayTitle: string;
};

export const ProjectPostingsProjectPostingFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "projectPostingsProjectPosting" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ProjectPosting" } },
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
} as unknown as DocumentNode<ProjectPostingsProjectPostingFragment, unknown>;
