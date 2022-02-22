import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ZipCityJobsQueryVariables = Types.Exact<{
  branchId?: Types.InputMaybe<Types.Scalars["ID"]>;
  jobTypeId?: Types.InputMaybe<Types.Scalars["ID"]>;
}>;

export type ZipCityJobsQuery = {
  __typename?: "Query";
  zipCityJobs: Array<{ __typename?: "ZipCity"; zip: string; city: string; canton: string }>;
};

export const ZipCityJobsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "zipCityJobs" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "branchId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "jobTypeId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "zipCityJobs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "branchId" },
                value: { kind: "Variable", name: { kind: "Name", value: "branchId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "jobTypeId" },
                value: { kind: "Variable", name: { kind: "Name", value: "jobTypeId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "zip" } },
                { kind: "Field", name: { kind: "Name", value: "city" } },
                { kind: "Field", name: { kind: "Name", value: "canton" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ZipCityJobsQuery, ZipCityJobsQueryVariables>;
