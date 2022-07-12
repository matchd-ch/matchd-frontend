import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type CompanyQueryVariables = Types.Exact<{
  slug?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export type CompanyQuery = {
  __typename?: "Query";
  company?: {
    __typename?: "Company";
    id: string;
    uid: string;
    name: string;
    description: string;
    services: string;
    street: string;
    zip: string;
    city: string;
    phone: string;
    website: string;
    linkEducation?: string | null;
    linkProjects?: string | null;
    linkThesis?: string | null;
    topLevelOrganisationDescription: string;
    topLevelOrganisationWebsite: string;
    employees: Array<{
      __typename?: "Employee";
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      role: string;
    }>;
    benefits: {
      __typename?: "BenefitConnection";
      edges: Array<{
        __typename?: "BenefitEdge";
        node?: { __typename?: "Benefit"; id: string; icon: string; name: string } | null;
      } | null>;
    };
    branches: {
      __typename?: "BranchConnection";
      edges: Array<{
        __typename?: "BranchEdge";
        node?: { __typename?: "Branch"; id: string; name: string } | null;
      } | null>;
    };
    jobPostings: Array<{
      __typename?: "JobPosting";
      id: string;
      title: string;
      displayTitle: string;
      slug: string;
      jobType: { __typename?: "JobType"; id: string; name: string };
    }>;
    projectPostings: Array<{
      __typename?: "ProjectPosting";
      id: string;
      title: string;
      displayTitle: string;
      slug: string;
      keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
      projectType: { __typename?: "ProjectType"; id: string; name: string };
    }>;
  } | null;
  logo?: {
    __typename?: "AttachmentConnection";
    edges: Array<{
      __typename?: "AttachmentEdge";
      node?: { __typename?: "Attachment"; id: string; url: string; mimeType: string } | null;
    } | null>;
  } | null;
  logoFallback?: {
    __typename?: "AttachmentConnection";
    edges: Array<{
      __typename?: "AttachmentEdge";
      node?: { __typename?: "Attachment"; id: string; url: string; mimeType: string } | null;
    } | null>;
  } | null;
  media?: {
    __typename?: "AttachmentConnection";
    edges: Array<{
      __typename?: "AttachmentEdge";
      node?: { __typename?: "Attachment"; id: string; url: string; mimeType: string } | null;
    } | null>;
  } | null;
};

export const CompanyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "company" },
      variableDefinitions: [
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
            name: { kind: "Name", value: "company" },
            arguments: [
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
                { kind: "Field", name: { kind: "Name", value: "uid" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "services" } },
                { kind: "Field", name: { kind: "Name", value: "street" } },
                { kind: "Field", name: { kind: "Name", value: "zip" } },
                { kind: "Field", name: { kind: "Name", value: "city" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                { kind: "Field", name: { kind: "Name", value: "website" } },
                { kind: "Field", name: { kind: "Name", value: "linkEducation" } },
                { kind: "Field", name: { kind: "Name", value: "linkProjects" } },
                { kind: "Field", name: { kind: "Name", value: "linkThesis" } },
                { kind: "Field", name: { kind: "Name", value: "topLevelOrganisationDescription" } },
                { kind: "Field", name: { kind: "Name", value: "topLevelOrganisationWebsite" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "employees" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "firstName" } },
                      { kind: "Field", name: { kind: "Name", value: "lastName" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "benefits" },
                  arguments: [
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
                                  { kind: "Field", name: { kind: "Name", value: "icon" } },
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
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
                  name: { kind: "Name", value: "branches" },
                  arguments: [
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
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
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
                  name: { kind: "Name", value: "jobPostings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "jobType" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "projectPostings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
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
                        name: { kind: "Name", value: "projectType" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
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
            alias: { kind: "Name", value: "logo" },
            name: { kind: "Name", value: "attachments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "key" },
                value: { kind: "EnumValue", value: "COMPANY_AVATAR" },
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
            alias: { kind: "Name", value: "logoFallback" },
            name: { kind: "Name", value: "attachments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "key" },
                value: { kind: "EnumValue", value: "COMPANY_AVATAR_FALLBACK" },
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
            alias: { kind: "Name", value: "media" },
            name: { kind: "Name", value: "attachments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "key" },
                value: { kind: "EnumValue", value: "COMPANY_DOCUMENTS" },
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
} as unknown as DocumentNode<CompanyQuery, CompanyQueryVariables>;
