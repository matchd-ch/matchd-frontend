import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ChallengeSpecificDataMutationVariables = Types.Exact<{
  input: Types.ChallengeSpecificDataInput;
}>;

export type ChallengeSpecificDataMutation = {
  __typename?: "Mutation";
  challengeSpecificData?: {
    __typename?: "ChallengeSpecificDataPayload";
    success?: boolean | null;
    errors?: unknown | null;
    challengeId?: string | null;
    slug?: string | null;
  } | null;
};

export const ChallengeSpecificDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "challengeSpecificData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ChallengeSpecificDataInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "challengeSpecificData" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "errors" } },
                { kind: "Field", name: { kind: "Name", value: "challengeId" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChallengeSpecificDataMutation, ChallengeSpecificDataMutationVariables>;
