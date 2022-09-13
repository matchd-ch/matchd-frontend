import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type DashboardStudentFragment = {
  __typename?: "Student";
  id: string;
  nickname?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  slug: string;
  zip?: string | null;
};

export type DashboardCompanyFragment = {
  __typename?: "Company";
  id: string;
  name: string;
  city: string;
  zip: string;
  slug: string;
};

export type DashboardChallengeFragment = {
  __typename?: "Challenge";
  id: string;
  title: string;
  displayTitle: string;
  datePublished?: string | null;
  dateCreated?: string | null;
  slug: string;
  state: Types.ChallengeState;
  keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
  challengeType: { __typename?: "ChallengeType"; id: string; name: string };
  company?: {
    __typename?: "Company";
    id: string;
    name: string;
    city: string;
    zip: string;
    slug: string;
  } | null;
  student?: {
    __typename?: "Student";
    id: string;
    nickname?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    slug: string;
    zip?: string | null;
  } | null;
};

export type DashboardJobPostingFragment = {
  __typename?: "JobPosting";
  id: string;
  title: string;
  displayTitle: string;
  datePublished?: string | null;
  dateCreated?: string | null;
  slug: string;
  state: Types.JobPostingState;
  company: {
    __typename?: "Company";
    id: string;
    name: string;
    city: string;
    zip: string;
    slug: string;
  };
};

export type DashboardQueryVariables = Types.Exact<{ [key: string]: never }>;

export type DashboardQuery = {
  __typename?: "Query";
  dashboard?: {
    __typename?: "Dashboard";
    challenges?: Array<{
      __typename?: "Challenge";
      id: string;
      title: string;
      displayTitle: string;
      datePublished?: string | null;
      dateCreated?: string | null;
      slug: string;
      state: Types.ChallengeState;
      keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
      challengeType: { __typename?: "ChallengeType"; id: string; name: string };
      company?: {
        __typename?: "Company";
        id: string;
        name: string;
        city: string;
        zip: string;
        slug: string;
      } | null;
      student?: {
        __typename?: "Student";
        id: string;
        nickname?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        slug: string;
        zip?: string | null;
      } | null;
    }> | null;
    challengeMatches?: Array<{
      __typename?: "ChallengeMatchInfo";
      challenge: {
        __typename?: "Challenge";
        id: string;
        title: string;
        displayTitle: string;
        datePublished?: string | null;
        dateCreated?: string | null;
        slug: string;
        state: Types.ChallengeState;
        keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
        challengeType: { __typename?: "ChallengeType"; id: string; name: string };
        company?: {
          __typename?: "Company";
          id: string;
          name: string;
          city: string;
          zip: string;
          slug: string;
        } | null;
        student?: {
          __typename?: "Student";
          id: string;
          nickname?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          slug: string;
          zip?: string | null;
        } | null;
      };
      student?: {
        __typename?: "Student";
        id: string;
        nickname?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        slug: string;
        zip?: string | null;
      } | null;
      company?: {
        __typename?: "Company";
        id: string;
        name: string;
        city: string;
        zip: string;
        slug: string;
      } | null;
    }> | null;
    latestChallenges?: Array<{
      __typename?: "Challenge";
      id: string;
      title: string;
      displayTitle: string;
      datePublished?: string | null;
      dateCreated?: string | null;
      slug: string;
      state: Types.ChallengeState;
      keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
      challengeType: { __typename?: "ChallengeType"; id: string; name: string };
      company?: {
        __typename?: "Company";
        id: string;
        name: string;
        city: string;
        zip: string;
        slug: string;
      } | null;
      student?: {
        __typename?: "Student";
        id: string;
        nickname?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        slug: string;
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
      company: {
        __typename?: "Company";
        id: string;
        name: string;
        city: string;
        zip: string;
        slug: string;
      };
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
      company: {
        __typename?: "Company";
        id: string;
        name: string;
        city: string;
        zip: string;
        slug: string;
      };
    }> | null;
    requestedMatches?: Array<{
      __typename?: "JobPostingMatchInfo";
      jobPosting: {
        __typename?: "JobPosting";
        id: string;
        title: string;
        displayTitle: string;
        datePublished?: string | null;
        dateCreated?: string | null;
        slug: string;
        state: Types.JobPostingState;
        company: {
          __typename?: "Company";
          id: string;
          name: string;
          city: string;
          zip: string;
          slug: string;
        };
      };
      student: {
        __typename?: "Student";
        id: string;
        nickname?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        slug: string;
        zip?: string | null;
      };
    }> | null;
    unconfirmedMatches?: Array<{
      __typename?: "JobPostingMatchInfo";
      jobPosting: {
        __typename?: "JobPosting";
        id: string;
        title: string;
        displayTitle: string;
        datePublished?: string | null;
        dateCreated?: string | null;
        slug: string;
        state: Types.JobPostingState;
        company: {
          __typename?: "Company";
          id: string;
          name: string;
          city: string;
          zip: string;
          slug: string;
        };
      };
      student: {
        __typename?: "Student";
        id: string;
        nickname?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        slug: string;
        zip?: string | null;
      };
    }> | null;
    confirmedMatches?: Array<{
      __typename?: "JobPostingMatchInfo";
      jobPosting: {
        __typename?: "JobPosting";
        id: string;
        title: string;
        displayTitle: string;
        datePublished?: string | null;
        dateCreated?: string | null;
        slug: string;
        state: Types.JobPostingState;
        company: {
          __typename?: "Company";
          id: string;
          name: string;
          city: string;
          zip: string;
          slug: string;
        };
      };
      student: {
        __typename?: "Student";
        id: string;
        nickname?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        slug: string;
        zip?: string | null;
      };
    }> | null;
  } | null;
};

export const DashboardCompanyFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "dashboardCompany" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Company" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "city" } },
          { kind: "Field", name: { kind: "Name", value: "zip" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DashboardCompanyFragment, unknown>;
export const DashboardStudentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "dashboardStudent" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Student" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "nickname" } },
          { kind: "Field", name: { kind: "Name", value: "firstName" } },
          { kind: "Field", name: { kind: "Name", value: "lastName" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "zip" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DashboardStudentFragment, unknown>;
export const DashboardChallengeFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "dashboardChallenge" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Challenge" } },
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
            name: { kind: "Name", value: "challengeType" },
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
                { kind: "FragmentSpread", name: { kind: "Name", value: "dashboardCompany" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "student" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "dashboardStudent" } },
              ],
            },
          },
        ],
      },
    },
    ...DashboardCompanyFragmentDoc.definitions,
    ...DashboardStudentFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<DashboardChallengeFragment, unknown>;
export const DashboardJobPostingFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "dashboardJobPosting" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "JobPosting" } },
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
                { kind: "FragmentSpread", name: { kind: "Name", value: "dashboardCompany" } },
              ],
            },
          },
        ],
      },
    },
    ...DashboardCompanyFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<DashboardJobPostingFragment, unknown>;
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
                  name: { kind: "Name", value: "challenges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "dashboardChallenge" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "challengeMatches" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "challenge" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "dashboardChallenge" },
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
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "dashboardStudent" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "company" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "dashboardCompany" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "latestChallenges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "dashboardChallenge" },
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
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "dashboardJobPosting" },
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
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "dashboardJobPosting" },
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
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "dashboardJobPosting" },
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
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "dashboardStudent" },
                            },
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
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "dashboardJobPosting" },
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
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "dashboardStudent" },
                            },
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
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "dashboardJobPosting" },
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
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "dashboardStudent" },
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
    ...DashboardChallengeFragmentDoc.definitions,
    ...DashboardStudentFragmentDoc.definitions,
    ...DashboardCompanyFragmentDoc.definitions,
    ...DashboardJobPostingFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<DashboardQuery, DashboardQueryVariables>;
