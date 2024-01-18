import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type MeUserFragment = {
  __typename?: "User";
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  type: Types.ProfileType;
  student?: {
    __typename?: "Student";
    id: string;
    email?: string | null;
    mobile?: string | null;
    slug: string;
    state: Types.ProfileState;
    firstName?: string | null;
    lastName?: string | null;
    street?: string | null;
    zip?: string | null;
    city?: string | null;
    dateOfBirth?: string | null;
    nickname?: string | null;
    schoolName?: string | null;
    fieldOfStudy?: string | null;
    graduation?: string | null;
    distinction?: string | null;
    jobFromDate?: string | null;
    jobToDate?: string | null;
    isMatchable: boolean;
    matchStatus?: {
      __typename?: "MatchStatus";
      initiator: Types.ProfileType;
      confirmed: boolean;
    } | null;
    branch?: { __typename?: "Branch"; name: string; id: string } | null;
    jobType?: { __typename?: "JobType"; name: string; id: string; mode: Types.DateMode } | null;
    skills: {
      __typename?: "SkillConnection";
      edges: Array<{
        __typename?: "SkillEdge";
        node?: { __typename?: "Skill"; id: string; name: string } | null;
      } | null>;
    };
    softSkills: {
      __typename?: "SoftSkillConnection";
      edges: Array<{
        __typename?: "SoftSkillEdge";
        node?: { __typename?: "SoftSkill"; id: string; student: string; company: string } | null;
      } | null>;
    };
    culturalFits: {
      __typename?: "CulturalFitConnection";
      edges: Array<{
        __typename?: "CulturalFitEdge";
        node?: { __typename?: "CulturalFit"; id: string; company: string; student: string } | null;
      } | null>;
    };
    hobbies?: Array<{ __typename?: "Hobby"; id: string; name: string }> | null;
    onlineChallenges?: Array<{ __typename?: "OnlineChallenge"; id: string; url: string }> | null;
    languages: {
      __typename?: "UserLanguageRelationConnection";
      edges: Array<{
        __typename?: "UserLanguageRelationEdge";
        node?: {
          __typename?: "UserLanguageRelation";
          id: string;
          language: { __typename?: "Language"; name: string; id: string };
          languageLevel: { __typename?: "LanguageLevel"; level: string; id: string };
        } | null;
      } | null>;
    };
    challenges: Array<{
      __typename?: "Challenge";
      id: string;
      title: string;
      displayTitle: string;
      slug: string;
      keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
      challengeType: { __typename?: "ChallengeType"; id: string; name: string };
    }>;
  } | null;
  employee?: {
    __typename?: "Employee";
    id: string;
    role: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    email?: string | null;
  } | null;
  company?: {
    __typename?: "Company";
    id: string;
    name: string;
    displayName: string;
    city: string;
    zip: string;
    street: string;
    state: Types.ProfileState;
    description: string;
    website: string;
    memberItStGallen: boolean;
    topLevelOrganisationWebsite: string;
    topLevelOrganisationDescription: string;
    services: string;
    phone: string;
    linkEducation?: string | null;
    linkChallenges?: string | null;
    linkThesis?: string | null;
    employees: Array<{
      __typename?: "Employee";
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      role: string;
    }>;
    jobPostings: Array<{
      __typename?: "JobPosting";
      id: string;
      slug: string;
      title: string;
      state: Types.JobPostingState;
      jobType: { __typename?: "JobType"; id: string; name: string };
    }>;
    challenges: Array<{
      __typename?: "Challenge";
      id: string;
      slug: string;
      title: string;
      state: Types.ChallengeState;
      challengeType: { __typename?: "ChallengeType"; id: string; name: string };
      keywords?: Array<{ __typename?: "Keyword"; id: string; name: string }> | null;
    }>;
    branches: {
      __typename?: "BranchConnection";
      edges: Array<{
        __typename?: "BranchEdge";
        node?: { __typename?: "Branch"; id: string; name: string } | null;
      } | null>;
    };
    benefits: {
      __typename?: "BenefitConnection";
      edges: Array<{
        __typename?: "BenefitEdge";
        node?: { __typename?: "Benefit"; id: string; icon: string; name: string } | null;
      } | null>;
    };
    culturalFits?: Array<{ __typename?: "CulturalFit"; id: string }> | null;
    softSkills?: Array<{ __typename?: "SoftSkill"; id: string }> | null;
  } | null;
};

export const MeUserFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "MeUser" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "firstName" } },
          { kind: "Field", name: { kind: "Name", value: "lastName" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "student" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "studentStudent" } },
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
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
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
                { kind: "Field", name: { kind: "Name", value: "displayName" } },
                { kind: "Field", name: { kind: "Name", value: "city" } },
                { kind: "Field", name: { kind: "Name", value: "zip" } },
                { kind: "Field", name: { kind: "Name", value: "street" } },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "website" } },
                { kind: "Field", name: { kind: "Name", value: "memberItStGallen" } },
                { kind: "Field", name: { kind: "Name", value: "topLevelOrganisationWebsite" } },
                { kind: "Field", name: { kind: "Name", value: "topLevelOrganisationDescription" } },
                { kind: "Field", name: { kind: "Name", value: "services" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "employees" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "firstName" } },
                      { kind: "Field", name: { kind: "Name", value: "lastName" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
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
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "state" } },
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
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "challenges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "state" } },
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
                        name: { kind: "Name", value: "keywords" },
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
                  name: { kind: "Name", value: "culturalFits" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "softSkills" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "linkEducation" } },
                { kind: "Field", name: { kind: "Name", value: "linkChallenges" } },
                { kind: "Field", name: { kind: "Name", value: "linkThesis" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "studentStudent" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Student" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "mobile" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          { kind: "Field", name: { kind: "Name", value: "firstName" } },
          { kind: "Field", name: { kind: "Name", value: "lastName" } },
          { kind: "Field", name: { kind: "Name", value: "street" } },
          { kind: "Field", name: { kind: "Name", value: "zip" } },
          { kind: "Field", name: { kind: "Name", value: "city" } },
          { kind: "Field", name: { kind: "Name", value: "dateOfBirth" } },
          { kind: "Field", name: { kind: "Name", value: "nickname" } },
          { kind: "Field", name: { kind: "Name", value: "schoolName" } },
          { kind: "Field", name: { kind: "Name", value: "fieldOfStudy" } },
          { kind: "Field", name: { kind: "Name", value: "graduation" } },
          { kind: "Field", name: { kind: "Name", value: "distinction" } },
          { kind: "Field", name: { kind: "Name", value: "jobFromDate" } },
          { kind: "Field", name: { kind: "Name", value: "jobToDate" } },
          { kind: "Field", name: { kind: "Name", value: "isMatchable" } },
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
            name: { kind: "Name", value: "branch" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "jobType" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "mode" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "skills" },
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
            name: { kind: "Name", value: "softSkills" },
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
                            { kind: "Field", name: { kind: "Name", value: "student" } },
                            { kind: "Field", name: { kind: "Name", value: "company" } },
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
            name: { kind: "Name", value: "culturalFits" },
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
                            { kind: "Field", name: { kind: "Name", value: "company" } },
                            { kind: "Field", name: { kind: "Name", value: "student" } },
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
            name: { kind: "Name", value: "hobbies" },
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
            name: { kind: "Name", value: "onlineChallenges" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "languages" },
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
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "language" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "languageLevel" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "level" } },
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
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
          {
            kind: "Field",
            name: { kind: "Name", value: "challenges" },
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
                  name: { kind: "Name", value: "challengeType" },
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
  ],
} as unknown as DocumentNode<MeUserFragment, unknown>;
