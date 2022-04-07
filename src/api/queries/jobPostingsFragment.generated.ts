import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type JobPostingsJobPostingFragment = {
  __typename?: "JobPosting";
  id: string;
  slug: string;
  title: string;
  displayTitle: string;
};

export const JobPostingsJobPostingFragmentDoc = {
  kind: "Document",
  definitions: [
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
} as unknown as DocumentNode<JobPostingsJobPostingFragment, unknown>;
