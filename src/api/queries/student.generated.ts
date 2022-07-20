import * as Types from "../models/types";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import {
  StudentStudentFragmentDoc,
  StudentAvatarFragmentDoc,
  StudentAvatarFallbackFragmentDoc,
  StudentCertificatesFragmentDoc,
} from "./studentFragment.generated";
export type StudentQueryVariables = Types.Exact<{
  slug: Types.Scalars["String"];
  jobPostingId?: Types.InputMaybe<Types.Scalars["String"]>;
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
    jobFromDate?: string | null;
    jobToDate?: string | null;
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
          id: string;
          language: { __typename?: "Language"; name: string; id: string };
          languageLevel: { __typename?: "LanguageLevel"; level: string; id: string };
        } | null;
      } | null>;
    };
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
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
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
                { kind: "FragmentSpread", name: { kind: "Name", value: "studentStudent" } },
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
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "studentAvatar" },
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
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "studentAvatarFallback" },
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
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "studentCertificates" },
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
    ...StudentStudentFragmentDoc.definitions,
    ...StudentAvatarFragmentDoc.definitions,
    ...StudentAvatarFallbackFragmentDoc.definitions,
    ...StudentCertificatesFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<StudentQuery, StudentQueryVariables>;
