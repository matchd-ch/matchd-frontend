import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import {
  ProjectPostingProjectPostingFragmentDoc,
  ProjectPostingImageFragmentDoc,
  ProjectPostingImageFallbackFragmentDoc,
  ProjectPostingDocumentFragmentDoc,
} from "./projectPostingFragment.generated";
export type ProjectPostingPublicQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars["String"]>;
  slug?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export type ProjectPostingPublicQuery = {
  __typename?: "Query";
  projectPosting?: {
    __typename?: "ProjectPosting";
    id: string;
    slug: string;
    title: string;
    displayTitle: string;
    description: string;
    teamSize?: number | null;
    compensation?: string | null;
    formStep: number;
    state: Types.ProjectPostingState;
    projectFromDate?: string | null;
    datePublished?: string | null;
    website: string;
    matchStatus?: {
      __typename?: "MatchStatus";
      initiator: Types.ProfileType;
      confirmed: boolean;
    } | null;
    keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
    projectType: { __typename?: "ProjectType"; id: string; name: string };
    company?: {
      __typename?: "Company";
      id: string;
      slug: string;
      name: string;
      street: string;
      zip: string;
      city: string;
    } | null;
    student?: {
      __typename?: "Student";
      id: string;
      slug: string;
      firstName?: string | null;
      lastName?: string | null;
      nickname?: string | null;
      city?: string | null;
    } | null;
    employee?: {
      __typename?: "Employee";
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      phone?: string | null;
      role: string;
    } | null;
  } | null;
};

export const ProjectPostingPublicDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "projectPostingPublic" },
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
            name: { kind: "Name", value: "projectPosting" },
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
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "projectPostingProjectPosting" },
                },
              ],
            },
          },
        ],
      },
    },
    ...ProjectPostingProjectPostingFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ProjectPostingPublicQuery, ProjectPostingPublicQueryVariables>;
