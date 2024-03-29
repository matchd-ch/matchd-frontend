import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type MatchChallengeMutationVariables = Types.Exact<{
  challenge: Types.ChallengeInput;
}>;

export type MatchChallengeMutation = {
  __typename?: "Mutation";
  matchChallenge?: {
    __typename?: "MatchChallengePayload";
    success?: boolean | null;
    errors?: unknown | null;
    confirmed: boolean;
  } | null;
};

export const MatchChallengeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "matchChallenge" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "challenge" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ChallengeInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "matchChallenge" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "challenge" },
                      value: { kind: "Variable", name: { kind: "Name", value: "challenge" } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "errors" } },
                { kind: "Field", name: { kind: "Name", value: "confirmed" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MatchChallengeMutation, MatchChallengeMutationVariables>;
