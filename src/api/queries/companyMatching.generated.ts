import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type CompanyMatchingQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CompanyMatchingQuery = {
  __typename?: "Query";
  matches?: Array<{
    __typename?: "Match";
    id?: string | null;
    name: string;
    avatar?: string | null;
    type: Types.MatchType;
    slug: string;
    score: number;
    rawScore: number;
    title?: string | null;
    matchStatus?: {
      __typename?: "MatchStatus";
      confirmed: boolean;
      initiator: Types.ProfileType;
    } | null;
  } | null> | null;
};

export const CompanyMatchingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "companyMatching" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "matches" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "techBoost" },
                value: { kind: "IntValue", value: "3" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "softBoost" },
                value: { kind: "IntValue", value: "3" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "avatar" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "score" } },
                { kind: "Field", name: { kind: "Name", value: "rawScore" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
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
} as unknown as DocumentNode<CompanyMatchingQuery, CompanyMatchingQueryVariables>;
