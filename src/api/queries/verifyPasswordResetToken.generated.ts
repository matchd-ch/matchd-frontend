import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type VerifyPasswordResetTokenQueryVariables = Types.Exact<{
  token: Types.Scalars["String"]["input"];
}>;

export type VerifyPasswordResetTokenQuery = {
  __typename?: "Query";
  verifyPasswordResetToken?: boolean | null;
};

export const VerifyPasswordResetTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "verifyPasswordResetToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "token" } },
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
            name: { kind: "Name", value: "verifyPasswordResetToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: { kind: "Variable", name: { kind: "Name", value: "token" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VerifyPasswordResetTokenQuery, VerifyPasswordResetTokenQueryVariables>;
