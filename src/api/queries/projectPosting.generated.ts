import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ProjectPostingQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars["String"]>;
  slug?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export type ProjectPostingQuery = {
  __typename?: "Query";
  projectPosting?: {
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
    } | null;
  } | null;
  images?: {
    __typename?: "AttachmentConnection";
    edges: Array<{
      __typename?: "AttachmentEdge";
      node?: {
        __typename?: "Attachment";
        id: string;
        fileName: string;
        url: string;
        mimeType: string;
      } | null;
    } | null>;
  } | null;
  imageFallback?: {
    __typename?: "AttachmentConnection";
    edges: Array<{
      __typename?: "AttachmentEdge";
      node?: {
        __typename?: "Attachment";
        id: string;
        fileName: string;
        url: string;
        mimeType: string;
      } | null;
    } | null>;
  } | null;
  documents?: {
    __typename?: "AttachmentConnection";
    edges: Array<{
      __typename?: "AttachmentEdge";
      node?: {
        __typename?: "Attachment";
        id: string;
        fileName: string;
        url: string;
        mimeType: string;
      } | null;
    } | null>;
  } | null;
};

export const ProjectPostingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "projectPosting" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "slug" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projectPosting" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
            ],
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
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "images" },
            name: { kind: "Name", value: "attachments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "key" },
                value: { kind: "EnumValue", value: "PROJECT_POSTING_IMAGES" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "100" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
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
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "imageFallback" },
            name: { kind: "Name", value: "attachments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "key" },
                value: { kind: "EnumValue", value: "PROJECT_POSTING_FALLBACK" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "100" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
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
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "documents" },
            name: { kind: "Name", value: "attachments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "key" },
                value: { kind: "EnumValue", value: "PROJECT_POSTING_DOCUMENTS" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "100" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
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
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectPostingQuery, ProjectPostingQueryVariables>;
