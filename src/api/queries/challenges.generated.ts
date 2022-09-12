import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { ChallengesChallengeFragmentDoc } from "./challengesFragment.generated";
export type ChallengesQueryVariables = Types.Exact<{
  textSearch?: Types.InputMaybe<Types.Scalars["String"]>;
  challengeTypeIds?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars["String"]>> | Types.InputMaybe<Types.Scalars["String"]>
  >;
  keywordIds?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars["String"]>> | Types.InputMaybe<Types.Scalars["String"]>
  >;
  filterTalentChallenges?: Types.InputMaybe<Types.Scalars["Boolean"]>;
  filterCompanyChallenges?: Types.InputMaybe<Types.Scalars["Boolean"]>;
  filterUniversityChallenges?: Types.InputMaybe<Types.Scalars["Boolean"]>;
}>;

export type ChallengesQuery = {
  __typename?: "Query";
  challenges?: {
    __typename?: "ChallengeConnection";
    edges: Array<{
      __typename?: "ChallengeEdge";
      node?: {
        __typename?: "Challenge";
        id: string;
        title: string;
        slug: string;
        description: string;
        teamSize?: number | null;
        compensation?: string | null;
        website: string;
        challengeFromDate?: string | null;
        formStep: number;
        state: Types.ChallengeState;
        dateCreated?: string | null;
        datePublished?: string | null;
        avatarUrl?: string | null;
        challengeType: { __typename?: "ChallengeType"; id: string; name: string };
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

export const ChallengesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "challenges" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "textSearch" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "challengeTypeIds" } },
          type: {
            kind: "ListType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
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
          variable: { kind: "Variable", name: { kind: "Name", value: "filterTalentChallenges" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "filterCompanyChallenges" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filterUniversityChallenges" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "challenges" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "1000" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "textSearch" },
                value: { kind: "Variable", name: { kind: "Name", value: "textSearch" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "challengeTypeIds" },
                value: { kind: "Variable", name: { kind: "Name", value: "challengeTypeIds" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "keywordIds" },
                value: { kind: "Variable", name: { kind: "Name", value: "keywordIds" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filterTalentChallenges" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filterTalentChallenges" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filterCompanyChallenges" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filterCompanyChallenges" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filterUniversityChallenges" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filterUniversityChallenges" },
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
                              name: { kind: "Name", value: "challengesChallenge" },
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
    ...ChallengesChallengeFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ChallengesQuery, ChallengesQueryVariables>;
