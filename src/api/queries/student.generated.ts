import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type StudentQueryVariables = Types.Exact<{
  slug: Types.Scalars["String"];
  jobPostingId?: Types.InputMaybe<Types.Scalars["ID"]>;
}>;

export type StudentQuery = {
  __typename?: "Query";
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
    profileStep: number;
    jobFromDate?: any | null;
    jobToDate?: any | null;
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
    onlineProjects?: Array<{ __typename?: "OnlineProject"; id: string; url: string }> | null;
    languages: {
      __typename?: "UserLanguageRelationConnection";
      edges: Array<{
        __typename?: "UserLanguageRelationEdge";
        node?: {
          __typename?: "UserLanguageRelation";
          language: { __typename?: "Language"; name: string; id: string };
          languageLevel: { __typename?: "LanguageLevel"; level: string; id: string };
        } | null;
      } | null>;
    };
    projectPostings: Array<{
      __typename?: "ProjectPosting";
      title: string;
      displayTitle: string;
      slug: string;
      topic: { __typename?: "Topic"; id: string; name: string };
      projectType: { __typename?: "ProjectType"; id: string; name: string };
    }>;
  } | null;
  avatar?: {
    __typename?: "AttachmentConnection";
    edges: Array<{
      __typename?: "AttachmentEdge";
      node?: { __typename?: "Attachment"; id: string; url: string; mimeType: string } | null;
    } | null>;
  } | null;
  avatarFallback?: {
    __typename?: "AttachmentConnection";
    edges: Array<{
      __typename?: "AttachmentEdge";
      node?: { __typename?: "Attachment"; id: string; url: string; mimeType: string } | null;
    } | null>;
  } | null;
  certificates?: {
    __typename?: "AttachmentConnection";
    edges: Array<{
      __typename?: "AttachmentEdge";
      node?: {
        __typename?: "Attachment";
        id: string;
        url: string;
        mimeType: string;
        fileName: string;
      } | null;
    } | null>;
  } | null;
};

export const StudentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "student" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "slug" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "jobPostingId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "student" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "jobPostingId" },
                value: { kind: "Variable", name: { kind: "Name", value: "jobPostingId" } },
              },
            ],
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
                { kind: "Field", name: { kind: "Name", value: "profileStep" } },
                { kind: "Field", name: { kind: "Name", value: "jobFromDate" } },
                { kind: "Field", name: { kind: "Name", value: "jobToDate" } },
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
                  name: { kind: "Name", value: "onlineProjects" },
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
                  name: { kind: "Name", value: "projectPostings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "displayTitle" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
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
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "avatar" },
            name: { kind: "Name", value: "attachments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "key" },
                value: { kind: "EnumValue", value: "STUDENT_AVATAR" },
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
            alias: { kind: "Name", value: "avatarFallback" },
            name: { kind: "Name", value: "attachments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "key" },
                value: { kind: "EnumValue", value: "STUDENT_AVATAR_FALLBACK" },
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
            alias: { kind: "Name", value: "certificates" },
            name: { kind: "Name", value: "attachments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "key" },
                value: { kind: "EnumValue", value: "STUDENT_DOCUMENTS" },
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
                            { kind: "Field", name: { kind: "Name", value: "fileName" } },
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
} as unknown as DocumentNode<StudentQuery, StudentQueryVariables>;
