import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ProjectPostingProjectPostingFragment = {
  __typename?: "ProjectPosting";
  id: string;
  slug: string;
  title: string;
  displayTitle: string;
  description: string;
  additionalInformation: string;
  formStep: number;
  state: Types.ProjectPostingState;
  projectFromDate?: any | null;
  datePublished?: any | null;
  website: string;
  matchStatus?: {
    __typename?: "MatchStatus";
    initiator: Types.ProfileType;
    confirmed: boolean;
  } | null;
  topic: { __typename?: "Topic"; id: string; name: string };
  projectType: { __typename?: "ProjectType"; id: string; name: string };
  keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
  company?: {
    __typename?: "Company";
    id: string;
    slug: string;
    name: string;
    street: string;
    zip: string;
    city: string;
  } | null;
  student?: {
    __typename?: "Student";
    id: string;
    slug: string;
    firstName?: string | null;
    lastName?: string | null;
    nickname?: string | null;
    city?: string | null;
  } | null;
  employee?: {
    __typename?: "Employee";
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
    role: string;
  } | null;
};

export type ProjectPostingImageFragment = {
  __typename?: "Attachment";
  id: string;
  fileName: string;
  url: string;
  mimeType: string;
};

export type ProjectPostingImageFallbackFragment = {
  __typename?: "Attachment";
  id: string;
  fileName: string;
  url: string;
  mimeType: string;
};

export type ProjectPostingDocumentFragment = {
  __typename?: "Attachment";
  id: string;
  fileName: string;
  url: string;
  mimeType: string;
};

export const ProjectPostingProjectPostingFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "projectPostingProjectPosting" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ProjectPosting" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "additionalInformation" } },
          { kind: "Field", name: { kind: "Name", value: "formStep" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          { kind: "Field", name: { kind: "Name", value: "projectFromDate" } },
          { kind: "Field", name: { kind: "Name", value: "datePublished" } },
          { kind: "Field", name: { kind: "Name", value: "website" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "matchStatus" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "initiator" } },
                { kind: "Field", name: { kind: "Name", value: "confirmed" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "topic" },
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
          {
            kind: "Field",
            name: { kind: "Name", value: "company" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "street" } },
                { kind: "Field", name: { kind: "Name", value: "zip" } },
                { kind: "Field", name: { kind: "Name", value: "city" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "student" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "nickname" } },
                { kind: "Field", name: { kind: "Name", value: "city" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "employee" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectPostingProjectPostingFragment, unknown>;
export const ProjectPostingImageFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "projectPostingImage" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Attachment" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "fileName" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectPostingImageFragment, unknown>;
export const ProjectPostingImageFallbackFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "projectPostingImageFallback" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Attachment" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "fileName" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectPostingImageFallbackFragment, unknown>;
export const ProjectPostingDocumentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "projectPostingDocument" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Attachment" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "fileName" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectPostingDocumentFragment, unknown>;
