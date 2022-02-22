import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type MatchingQueryVariables = Types.Exact<{
  studentMatchingInput?: Types.InputMaybe<Types.StudentMatchingInput>;
  jobPostingMatchingInput?: Types.InputMaybe<Types.JobPostingMatchingInput>;
  projectPostingMatchingInput?: Types.InputMaybe<Types.ProjectPostingMatchingInput>;
  softBoost: Types.Scalars["Int"];
  techBoost: Types.Scalars["Int"];
  first?: Types.InputMaybe<Types.Scalars["Int"]>;
  skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export type MatchingQuery = {
  __typename?: "Query";
  matches?: Array<{
    __typename?: "Match";
    name: string;
    title?: string | null;
    description?: string | null;
    avatar?: string | null;
    type: Types.MatchType;
    slug: string;
    score: number;
    rawScore: number;
    keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
    matchStatus?: {
      __typename?: "MatchStatus";
      confirmed: boolean;
      initiator: Types.ProfileType;
    } | null;
  } | null> | null;
};

export const MatchingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "matching" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "studentMatchingInput" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "StudentMatchingInput" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "jobPostingMatchingInput" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "JobPostingMatchingInput" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "projectPostingMatchingInput" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "ProjectPostingMatchingInput" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "softBoost" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "techBoost" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "matches" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "studentMatching" },
                value: { kind: "Variable", name: { kind: "Name", value: "studentMatchingInput" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "jobPostingMatching" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "jobPostingMatchingInput" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "projectPostingMatching" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "projectPostingMatchingInput" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: { kind: "Variable", name: { kind: "Name", value: "skip" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "softBoost" },
                value: { kind: "Variable", name: { kind: "Name", value: "softBoost" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "techBoost" },
                value: { kind: "Variable", name: { kind: "Name", value: "techBoost" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "keywords" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "avatar" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "score" } },
                { kind: "Field", name: { kind: "Name", value: "rawScore" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "matchStatus" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "confirmed" } },
                      { kind: "Field", name: { kind: "Name", value: "initiator" } },
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
} as unknown as DocumentNode<MatchingQuery, MatchingQueryVariables>;
