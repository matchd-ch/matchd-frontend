import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type DashboardQueryVariables = Types.Exact<{ [key: string]: never }>;

export type DashboardQuery = {
  __typename?: "Query";
  dashboard?: {
    __typename?: "Dashboard";
    projectPostings?: Array<{
      __typename?: "ProjectPosting";
      id: string;
      title: string;
      displayTitle: string;
      datePublished?: string | null;
      dateCreated?: string | null;
      slug: string;
      state: Types.ProjectPostingState;
      keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
      projectType: { __typename?: "ProjectType"; id: string; name: string };
      company?: { __typename?: "Company"; name: string; city: string; zip: string } | null;
      student?: {
        __typename?: "Student";
        firstName?: string | null;
        lastName?: string | null;
        nickname?: string | null;
        zip?: string | null;
      } | null;
    }> | null;
    latestJobPostings?: Array<{
      __typename?: "JobPosting";
      id: string;
      title: string;
      displayTitle: string;
      datePublished?: string | null;
      dateCreated?: string | null;
      slug: string;
      state: Types.JobPostingState;
      company: { __typename?: "Company"; name: string; city: string; zip: string };
    }> | null;
    latestProjectPostings?: Array<{
      __typename?: "ProjectPosting";
      id: string;
      title: string;
      displayTitle: string;
      datePublished?: string | null;
      dateCreated?: string | null;
      slug: string;
      state: Types.ProjectPostingState;
      projectType: { __typename?: "ProjectType"; id: string; name: string };
      keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
      company?: { __typename?: "Company"; name: string; city: string; zip: string } | null;
      student?: {
        __typename?: "Student";
        firstName?: string | null;
        lastName?: string | null;
        nickname?: string | null;
        zip?: string | null;
      } | null;
    }> | null;
    jobPostings?: Array<{
      __typename?: "JobPosting";
      id: string;
      title: string;
      displayTitle: string;
      datePublished?: string | null;
      dateCreated?: string | null;
      slug: string;
      state: Types.JobPostingState;
      company: { __typename?: "Company"; name: string; city: string; zip: string };
    }> | null;
    requestedMatches?: Array<{
      __typename?: "JobPostingMatchInfo";
      jobPosting: {
        __typename?: "JobPosting";
        id: string;
        title: string;
        displayTitle: string;
        slug: string;
        state: Types.JobPostingState;
        company: { __typename?: "Company"; name: string; city: string; zip: string };
      };
      student: {
        __typename?: "Student";
        nickname?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        slug: string;
      };
    }> | null;
    unconfirmedMatches?: Array<{
      __typename?: "JobPostingMatchInfo";
      jobPosting: {
        __typename?: "JobPosting";
        id: string;
        title: string;
        displayTitle: string;
        slug: string;
        state: Types.JobPostingState;
        company: { __typename?: "Company"; name: string; city: string; zip: string };
      };
      student: {
        __typename?: "Student";
        nickname?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        slug: string;
      };
    }> | null;
    confirmedMatches?: Array<{
      __typename?: "JobPostingMatchInfo";
      jobPosting: {
        __typename?: "JobPosting";
        id: string;
        title: string;
        displayTitle: string;
        slug: string;
        state: Types.JobPostingState;
        company: { __typename?: "Company"; name: string; city: string; zip: string };
      };
      student: {
        __typename?: "Student";
        nickname?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        slug: string;
      };
    }> | null;
    projectMatches?: Array<{
      __typename?: "ProjectPostingMatchInfo";
      projectPosting: {
        __typename?: "ProjectPosting";
        id: string;
        title: string;
        displayTitle: string;
        slug: string;
        state: Types.ProjectPostingState;
        keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
        projectType: { __typename?: "ProjectType"; id: string; name: string };
        company?: {
          __typename?: "Company";
          name: string;
          city: string;
          zip: string;
          slug: string;
        } | null;
        student?: {
          __typename?: "Student";
          id: string;
          slug: string;
          firstName?: string | null;
          lastName?: string | null;
          nickname?: string | null;
        } | null;
      };
      student?: {
        __typename?: "Student";
        nickname?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        slug: string;
      } | null;
      company?: { __typename?: "Company"; id: string; name: string; slug: string } | null;
    }> | null;
  } | null;
};

export const DashboardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "dashboard" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "dashboard" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "projectPostings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
                      { kind: "Field", name: { kind: "Name", value: "datePublished" } },
                      { kind: "Field", name: { kind: "Name", value: "dateCreated" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                      { kind: "Field", name: { kind: "Name", value: "state" } },
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
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "city" } },
                            { kind: "Field", name: { kind: "Name", value: "zip" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "student" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "firstName" } },
                            { kind: "Field", name: { kind: "Name", value: "lastName" } },
                            { kind: "Field", name: { kind: "Name", value: "nickname" } },
                            { kind: "Field", name: { kind: "Name", value: "zip" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "latestJobPostings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
                      { kind: "Field", name: { kind: "Name", value: "datePublished" } },
                      { kind: "Field", name: { kind: "Name", value: "dateCreated" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                      { kind: "Field", name: { kind: "Name", value: "state" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "company" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "city" } },
                            { kind: "Field", name: { kind: "Name", value: "zip" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "latestProjectPostings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
                      { kind: "Field", name: { kind: "Name", value: "datePublished" } },
                      { kind: "Field", name: { kind: "Name", value: "dateCreated" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                      { kind: "Field", name: { kind: "Name", value: "state" } },
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
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "city" } },
                            { kind: "Field", name: { kind: "Name", value: "zip" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "student" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "firstName" } },
                            { kind: "Field", name: { kind: "Name", value: "lastName" } },
                            { kind: "Field", name: { kind: "Name", value: "nickname" } },
                            { kind: "Field", name: { kind: "Name", value: "zip" } },
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
                      { kind: "Field", name: { kind: "Name", value: "datePublished" } },
                      { kind: "Field", name: { kind: "Name", value: "dateCreated" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                      { kind: "Field", name: { kind: "Name", value: "state" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "company" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "city" } },
                            { kind: "Field", name: { kind: "Name", value: "zip" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "requestedMatches" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "jobPosting" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                            { kind: "Field", name: { kind: "Name", value: "state" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "company" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
                                  { kind: "Field", name: { kind: "Name", value: "city" } },
                                  { kind: "Field", name: { kind: "Name", value: "zip" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "student" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "nickname" } },
                            { kind: "Field", name: { kind: "Name", value: "firstName" } },
                            { kind: "Field", name: { kind: "Name", value: "lastName" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "unconfirmedMatches" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "jobPosting" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                            { kind: "Field", name: { kind: "Name", value: "state" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "company" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
                                  { kind: "Field", name: { kind: "Name", value: "city" } },
                                  { kind: "Field", name: { kind: "Name", value: "zip" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "student" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "nickname" } },
                            { kind: "Field", name: { kind: "Name", value: "firstName" } },
                            { kind: "Field", name: { kind: "Name", value: "lastName" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "confirmedMatches" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "jobPosting" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                            { kind: "Field", name: { kind: "Name", value: "state" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "company" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
                                  { kind: "Field", name: { kind: "Name", value: "city" } },
                                  { kind: "Field", name: { kind: "Name", value: "zip" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "student" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "nickname" } },
                            { kind: "Field", name: { kind: "Name", value: "firstName" } },
                            { kind: "Field", name: { kind: "Name", value: "lastName" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "projectMatches" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "projectPosting" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                            { kind: "Field", name: { kind: "Name", value: "state" } },
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
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "company" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
                                  { kind: "Field", name: { kind: "Name", value: "city" } },
                                  { kind: "Field", name: { kind: "Name", value: "zip" } },
                                  { kind: "Field", name: { kind: "Name", value: "slug" } },
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
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "student" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "nickname" } },
                            { kind: "Field", name: { kind: "Name", value: "firstName" } },
                            { kind: "Field", name: { kind: "Name", value: "lastName" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
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
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
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
} as unknown as DocumentNode<DashboardQuery, DashboardQueryVariables>;
