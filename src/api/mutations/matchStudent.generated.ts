import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type MatchStudentMutationVariables = Types.Exact<{
  jobPosting: Types.JobPostingInput;
  student: Types.StudentInput;
}>;

export type MatchStudentMutation = {
  __typename?: "Mutation";
  matchStudent?: {
    __typename?: "MatchStudentPayload";
    success?: boolean | null;
    errors?: any | null;
    confirmed: boolean;
  } | null;
};

export const MatchStudentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "matchStudent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "jobPosting" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "JobPostingInput" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "student" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "StudentInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "matchStudent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "jobPosting" },
                      value: { kind: "Variable", name: { kind: "Name", value: "jobPosting" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "student" },
                      value: { kind: "Variable", name: { kind: "Name", value: "student" } },
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
} as unknown as DocumentNode<MatchStudentMutation, MatchStudentMutationVariables>;
