import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { ProjectPostingsProjectPostingFragmentDoc } from "./projectPostingsFragment.generated";
export type ProjectPostingsQueryVariables = Types.Exact<{
  projectTypeId?: Types.InputMaybe<Types.Scalars["String"]>;
  keywordIds?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars["String"]>> | Types.InputMaybe<Types.Scalars["String"]>
  >;
  filterTalentProjects?: Types.InputMaybe<Types.Scalars["Boolean"]>;
  filterCompanyProjects?: Types.InputMaybe<Types.Scalars["Boolean"]>;
  filterUniversityProjects?: Types.InputMaybe<Types.Scalars["Boolean"]>;
}>;

export type ProjectPostingsQuery = {
  __typename?: "Query";
  projectPostings?: {
    __typename?: "ProjectPostingConnection";
    edges: Array<{
      __typename?: "ProjectPostingEdge";
      node?: {
        __typename?: "ProjectPosting";
        id: string;
        title: string;
        slug: string;
        description: string;
        teamSize?: number | null;
        compensation?: string | null;
        website: string;
        projectFromDate?: string | null;
        formStep: number;
        state: Types.ProjectPostingState;
        dateCreated?: string | null;
        datePublished?: string | null;
        projectType: { __typename?: "ProjectType"; id: string; name: string };
        keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
        employee?: {
          __typename?: "Employee";
          id: string;
          firstName?: string | null;
          lastName?: string | null;
          role: string;
          email?: string | null;
          phone?: string | null;
        } | null;
        student?: { __typename?: "Student"; id: string } | null;
        company?: { __typename?: "Company"; id: string } | null;
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
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "projectTypeId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "keywordIds" } },
          type: {
            kind: "ListType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "filterTalentProjects" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "filterCompanyProjects" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "filterUniversityProjects" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
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
                value: { kind: "IntValue", value: "1000" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "projectTypeId" },
                value: { kind: "Variable", name: { kind: "Name", value: "projectTypeId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "keywordIds" },
                value: { kind: "Variable", name: { kind: "Name", value: "keywordIds" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filterTalentProjects" },
                value: { kind: "Variable", name: { kind: "Name", value: "filterTalentProjects" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filterCompanyProjects" },
                value: { kind: "Variable", name: { kind: "Name", value: "filterCompanyProjects" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filterUniversityProjects" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filterUniversityProjects" },
                },
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
