import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ProjectPostingsProjectPostingFragment = {
  __typename?: "ProjectPosting";
  id: string;
  title: string;
  slug: string;
  description: string;
  teamSize?: number | null;
  compensation?: string | null;
  website: string;
  projectFromDate?: string | null;
  formStep: number;
  state: Types.ProjectPostingState;
  dateCreated?: string | null;
  datePublished?: string | null;
  avatarUrl?: string | null;
  projectType: { __typename?: "ProjectType"; id: string; name: string };
  keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
  employee?: {
    __typename?: "Employee";
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    role: string;
    email?: string | null;
    phone?: string | null;
  } | null;
  student?: { __typename?: "Student"; id: string } | null;
  company?: { __typename?: "Company"; id: string } | null;
};

export const ProjectPostingsProjectPostingFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "projectPostingsProjectPosting" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ProjectPosting" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "projectType" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "keywords" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "teamSize" } },
          { kind: "Field", name: { kind: "Name", value: "compensation" } },
          { kind: "Field", name: { kind: "Name", value: "website" } },
          { kind: "Field", name: { kind: "Name", value: "projectFromDate" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "employee" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "student" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "company" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "formStep" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          { kind: "Field", name: { kind: "Name", value: "dateCreated" } },
          { kind: "Field", name: { kind: "Name", value: "datePublished" } },
          { kind: "Field", name: { kind: "Name", value: "avatarUrl" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectPostingsProjectPostingFragment, unknown>;
