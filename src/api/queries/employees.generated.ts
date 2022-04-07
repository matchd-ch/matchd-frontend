import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { EmployeesEmployeeFragmentDoc } from "./employeesFragment.generated";
export type EmployeesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type EmployeesQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    company?: {
      __typename?: "Company";
      employees: Array<{
        __typename?: "Employee";
        id: string;
        role: string;
        firstName?: string | null;
        lastName?: string | null;
        email?: string | null;
      }>;
    } | null;
  } | null;
};

export const EmployeesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "employees" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "company" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "employees" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "employeesEmployee" },
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
    ...EmployeesEmployeeFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<EmployeesQuery, EmployeesQueryVariables>;
