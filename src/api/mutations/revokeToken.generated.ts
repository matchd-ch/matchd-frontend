import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type RevokeTokenMutationVariables = Types.Exact<{ [key: string]: never }>;

export type RevokeTokenMutation = {
  __typename?: "Mutation";
  revokeToken?: { __typename?: "Revoke"; revoked: number } | null;
};

export const RevokeTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "revokeToken" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "revokeToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "refreshToken" },
                value: { kind: "StringValue", value: "refresh token", block: false },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "revoked" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RevokeTokenMutation, RevokeTokenMutationVariables>;
