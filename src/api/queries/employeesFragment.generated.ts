import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type EmployeesEmployeeFragment = {
  __typename?: "Employee";
  id: string;
  role: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
};

export const EmployeesEmployeeFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "employeesEmployee" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Employee" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "role" } },
          { kind: "Field", name: { kind: "Name", value: "firstName" } },
          { kind: "Field", name: { kind: "Name", value: "lastName" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EmployeesEmployeeFragment, unknown>;
