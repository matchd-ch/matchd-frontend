import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ProjectTypesProjectTypeFragment = {
  __typename?: "ProjectType";
  id: string;
  name: string;
};

export const ProjectTypesProjectTypeFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "projectTypesProjectType" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ProjectType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectTypesProjectTypeFragment, unknown>;
