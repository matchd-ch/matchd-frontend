import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type RefreshTokenMutationVariables = Types.Exact<{
  refreshToken: Types.Scalars["String"]["input"];
}>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refreshToken?: {
    __typename?: "RefreshToken";
    success?: boolean | null;
    errors?: unknown | null;
    token: string;
    refreshToken: string;
  } | null;
};

export const RefreshTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "refreshToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "refreshToken" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "refreshToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "refreshToken" },
                value: { kind: "Variable", name: { kind: "Name", value: "refreshToken" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "errors" } },
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "refreshToken" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
