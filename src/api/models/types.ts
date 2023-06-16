/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: unknown;
  ExpectedErrorType: unknown;
  GenericScalar: unknown;
  Upload: unknown;
};

export type AddEmployeeInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  role: Scalars["String"];
};

/** Adds a new emplyoee to a company */
export type AddEmployeePayload = {
  __typename?: "AddEmployeePayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  employee?: Maybe<Employee>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type Attachment = Node & {
  __typename?: "Attachment";
  fileName: Scalars["String"];
  fileSize: Scalars["Int"];
  /** The ID of the object */
  id: Scalars["ID"];
  mimeType: Scalars["String"];
  url: Scalars["String"];
};

export type AttachmentConnection = {
  __typename?: "AttachmentConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AttachmentEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Attachment` and its cursor. */
export type AttachmentEdge = {
  __typename?: "AttachmentEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Attachment>;
};

export enum AttachmentKey {
  ChallengeDocuments = "CHALLENGE_DOCUMENTS",
  ChallengeFallback = "CHALLENGE_FALLBACK",
  ChallengeImages = "CHALLENGE_IMAGES",
  CompanyAvatar = "COMPANY_AVATAR",
  CompanyAvatarFallback = "COMPANY_AVATAR_FALLBACK",
  CompanyDocuments = "COMPANY_DOCUMENTS",
  StudentAvatar = "STUDENT_AVATAR",
  StudentAvatarFallback = "STUDENT_AVATAR_FALLBACK",
  StudentDocuments = "STUDENT_DOCUMENTS",
}

export type Benefit = Node & {
  __typename?: "Benefit";
  icon: Scalars["String"];
  /** The ID of the object */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type BenefitConnection = {
  __typename?: "BenefitConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BenefitEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

export type BenefitConnectionsConnection = {
  __typename?: "BenefitConnectionsConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BenefitConnectionsEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `BenefitConnections` and its cursor. */
export type BenefitConnectionsEdge = {
  __typename?: "BenefitConnectionsEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Benefit>;
};

/** A Relay edge containing a `Benefit` and its cursor. */
export type BenefitEdge = {
  __typename?: "BenefitEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Benefit>;
};

export type BenefitInput = {
  icon?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type Branch = Node & {
  __typename?: "Branch";
  /** The ID of the object */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type BranchConnection = {
  __typename?: "BranchConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BranchEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

export type BranchConnectionsConnection = {
  __typename?: "BranchConnectionsConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BranchConnectionsEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `BranchConnections` and its cursor. */
export type BranchConnectionsEdge = {
  __typename?: "BranchConnectionsEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Branch>;
};

/** A Relay edge containing a `Branch` and its cursor. */
export type BranchEdge = {
  __typename?: "BranchEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Branch>;
};

export type BranchInput = {
  id: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
};

export type Challenge = Node & {
  __typename?: "Challenge";
  avatarUrl?: Maybe<Scalars["String"]>;
  challengeFromDate?: Maybe<Scalars["Date"]>;
  challengeType: ChallengeType;
  company?: Maybe<Company>;
  compensation?: Maybe<Scalars["String"]>;
  dateCreated?: Maybe<Scalars["Date"]>;
  datePublished?: Maybe<Scalars["Date"]>;
  description: Scalars["String"];
  displayTitle: Scalars["String"];
  employee?: Maybe<Employee>;
  formStep: Scalars["Int"];
  /** The ID of the object */
  id: Scalars["ID"];
  keywords?: Maybe<Array<Keyword>>;
  matchHints?: Maybe<MatchHints>;
  matchStatus?: Maybe<MatchStatus>;
  slug: Scalars["String"];
  state: ChallengeState;
  student?: Maybe<Student>;
  teamSize?: Maybe<Scalars["Int"]>;
  title: Scalars["String"];
  website: Scalars["String"];
};

export type ChallengeAllocationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  employee?: InputMaybe<EmployeeInput>;
  id?: InputMaybe<Scalars["String"]>;
  /** State */
  state: Scalars["String"];
};

/** Updates a challenge */
export type ChallengeAllocationPayload = {
  __typename?: "ChallengeAllocationPayload";
  challengeId?: Maybe<Scalars["String"]>;
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type ChallengeBaseDataInput = {
  challengeType: ChallengeTypeInput;
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Compensation */
  compensation: Scalars["String"];
  /** Description */
  description: Scalars["String"];
  id?: InputMaybe<Scalars["String"]>;
  keywords: Array<InputMaybe<KeywordInput>>;
  /** Team size */
  teamSize: Scalars["Int"];
  /** Title */
  title: Scalars["String"];
};

/** Creates a challenge */
export type ChallengeBaseDataPayload = {
  __typename?: "ChallengeBaseDataPayload";
  challengeId?: Maybe<Scalars["String"]>;
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type ChallengeConnection = {
  __typename?: "ChallengeConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ChallengeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Challenge` and its cursor. */
export type ChallengeEdge = {
  __typename?: "ChallengeEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Challenge>;
};

export type ChallengeInput = {
  id: Scalars["String"];
};

export type ChallengeMatchInfo = Node & {
  __typename?: "ChallengeMatchInfo";
  challenge: Challenge;
  company?: Maybe<Company>;
  /** The ID of the object */
  id: Scalars["ID"];
  student?: Maybe<Student>;
};

export type ChallengeMatchingInput = {
  challenge: ChallengeInput;
};

export type ChallengeSpecificDataInput = {
  challengeFromDate?: InputMaybe<Scalars["String"]>;
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  website?: InputMaybe<Scalars["String"]>;
};

/** Creates a challenge */
export type ChallengeSpecificDataPayload = {
  __typename?: "ChallengeSpecificDataPayload";
  challengeId?: Maybe<Scalars["String"]>;
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export enum ChallengeState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

export type ChallengeType = Node & {
  __typename?: "ChallengeType";
  /** The ID of the object */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type ChallengeTypeConnection = {
  __typename?: "ChallengeTypeConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ChallengeTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ChallengeType` and its cursor. */
export type ChallengeTypeEdge = {
  __typename?: "ChallengeTypeEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<ChallengeType>;
};

export type ChallengeTypeInput = {
  id: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
};

export type Company = Node & {
  __typename?: "Company";
  benefits: BenefitConnection;
  branches: BranchConnection;
  challenges: Array<Challenge>;
  city: Scalars["String"];
  culturalFits?: Maybe<Array<CulturalFit>>;
  description: Scalars["String"];
  displayName: Scalars["String"];
  employees: Array<Employee>;
  /** The ID of the object */
  id: Scalars["ID"];
  jobPostings: Array<JobPosting>;
  linkChallenges?: Maybe<Scalars["String"]>;
  linkEducation?: Maybe<Scalars["String"]>;
  linkThesis?: Maybe<Scalars["String"]>;
  memberItStGallen: Scalars["Boolean"];
  name: Scalars["String"];
  phone: Scalars["String"];
  profileStep: Scalars["Int"];
  services: Scalars["String"];
  slug: Scalars["String"];
  softSkills?: Maybe<Array<SoftSkill>>;
  state: ProfileState;
  street: Scalars["String"];
  topLevelOrganisationDescription: Scalars["String"];
  topLevelOrganisationWebsite: Scalars["String"];
  type: ProfileType;
  uid: Scalars["String"];
  website: Scalars["String"];
  zip: Scalars["String"];
};

export type CompanyBenefitsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type CompanyBranchesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type CompanyProfileAdvantagesInput = {
  /** Benefits */
  benefits?: InputMaybe<Array<InputMaybe<BenefitInput>>>;
  /** Branches */
  branches?: InputMaybe<Array<InputMaybe<BranchInput>>>;
  clientMutationId?: InputMaybe<Scalars["String"]>;
};

/** Updates the Company Profile with benefits and branches */
export type CompanyProfileAdvantagesPayload = {
  __typename?: "CompanyProfileAdvantagesPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type CompanyProfileBaseDataInput = {
  /** City */
  city: Scalars["String"];
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** First name */
  firstName: Scalars["String"];
  /** Last name */
  lastName: Scalars["String"];
  /** Name */
  name?: InputMaybe<Scalars["String"]>;
  /** Phone Number */
  phone?: InputMaybe<Scalars["String"]>;
  /** role */
  role: Scalars["String"];
  /** Street */
  street: Scalars["String"];
  /** Zip */
  zip: Scalars["String"];
};

/** Updates the profile of a Company */
export type CompanyProfileBaseDataPayload = {
  __typename?: "CompanyProfileBaseDataPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type CompanyProfileRelationsInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** description */
  description?: InputMaybe<Scalars["String"]>;
  /** memeber IT St. Gallen */
  memberItStGallen: Scalars["Boolean"];
  /** services */
  services?: InputMaybe<Scalars["String"]>;
  /** website */
  website: Scalars["String"];
};

/** Updates website url, description, services, member IT St.Gallen */
export type CompanyProfileRelationsPayload = {
  __typename?: "CompanyProfileRelationsPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type CompanyProfileValuesInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Cultural Fit */
  culturalFits?: InputMaybe<Array<InputMaybe<CulturalFitInput>>>;
  /** Soft Skills */
  softSkills?: InputMaybe<Array<InputMaybe<SoftSkillInput>>>;
};

/** Updates a company profile with soft skills and cultural fit */
export type CompanyProfileValuesPayload = {
  __typename?: "CompanyProfileValuesPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type CulturalFit = Node & {
  __typename?: "CulturalFit";
  company: Scalars["String"];
  /** The ID of the object */
  id: Scalars["ID"];
  student: Scalars["String"];
};

export type CulturalFitConnection = {
  __typename?: "CulturalFitConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<CulturalFitEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

export type CulturalFitConnectionsConnection = {
  __typename?: "CulturalFitConnectionsConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<CulturalFitConnectionsEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `CulturalFitConnections` and its cursor. */
export type CulturalFitConnectionsEdge = {
  __typename?: "CulturalFitConnectionsEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<CulturalFit>;
};

/** A Relay edge containing a `CulturalFit` and its cursor. */
export type CulturalFitEdge = {
  __typename?: "CulturalFitEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<CulturalFit>;
};

export type CulturalFitInput = {
  id: Scalars["String"];
};

export type Dashboard = {
  __typename?: "Dashboard";
  challengeMatches?: Maybe<Array<ChallengeMatchInfo>>;
  challenges?: Maybe<Array<Challenge>>;
  confirmedMatches?: Maybe<Array<JobPostingMatchInfo>>;
  jobPostings?: Maybe<Array<JobPosting>>;
  latestChallenges?: Maybe<Array<Challenge>>;
  latestJobPostings?: Maybe<Array<JobPosting>>;
  requestedMatches?: Maybe<Array<JobPostingMatchInfo>>;
  unconfirmedMatches?: Maybe<Array<JobPostingMatchInfo>>;
};

export enum DateMode {
  DateFrom = "DATE_FROM",
  DateRange = "DATE_RANGE",
}

/** An enumeration. */
export enum DbUserTypeChoices {
  /** College Student */
  CollegeStudent = "COLLEGE_STUDENT",
  /** Company */
  Company = "COMPANY",
  /** Internal */
  Internal = "INTERNAL",
  /** Junior */
  Junior = "JUNIOR",
  /** Other */
  Other = "OTHER",
  /** Student */
  Student = "STUDENT",
  /** University */
  University = "UNIVERSITY",
}

export type DeleteAttachmentInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
};

export type DeleteAttachmentPayload = {
  __typename?: "DeleteAttachmentPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type DeleteChallengeInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
};

/** Deletes a challenge */
export type DeleteChallengePayload = {
  __typename?: "DeleteChallengePayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type DeleteEmployeeInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
};

/** Deletes an employee within the same company */
export type DeleteEmployeePayload = {
  __typename?: "DeleteEmployeePayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type DeleteJobPostingInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
};

/** Deletes a job posting */
export type DeleteJobPostingPayload = {
  __typename?: "DeleteJobPostingPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type DeleteUserMutationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
};

/** Deletes the user */
export type DeleteUserMutationPayload = {
  __typename?: "DeleteUserMutationPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type Employee = Node & {
  __typename?: "Employee";
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  /** The ID of the object */
  id: Scalars["ID"];
  lastName?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  role: Scalars["String"];
};

export type EmployeeInput = {
  id?: InputMaybe<Scalars["String"]>;
  /** Role */
  role?: InputMaybe<Scalars["String"]>;
};

export type FaqCategory = Node & {
  __typename?: "FAQCategory";
  /** The ID of the object */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type FaqCategoryConnection = {
  __typename?: "FAQCategoryConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<FaqCategoryEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `FAQCategory` and its cursor. */
export type FaqCategoryEdge = {
  __typename?: "FAQCategoryEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<FaqCategory>;
};

export type Hobby = Node & {
  __typename?: "Hobby";
  /** The ID of the object */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type HobbyInput = {
  id?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type JobPosting = Node & {
  __typename?: "JobPosting";
  branches: Array<Branch>;
  company: Company;
  dateCreated?: Maybe<Scalars["Date"]>;
  datePublished?: Maybe<Scalars["Date"]>;
  description: Scalars["String"];
  displayTitle: Scalars["String"];
  employee?: Maybe<Employee>;
  formStep: Scalars["Int"];
  /** The ID of the object */
  id: Scalars["ID"];
  jobFromDate?: Maybe<Scalars["Date"]>;
  jobRequirements: JobRequirementConnection;
  jobToDate?: Maybe<Scalars["Date"]>;
  jobType: JobType;
  languages?: Maybe<Array<JobPostingLanguageRelation>>;
  matchHints?: Maybe<MatchHints>;
  matchStatus?: Maybe<MatchStatus>;
  skills?: Maybe<Array<Skill>>;
  slug: Scalars["String"];
  state: JobPostingState;
  title: Scalars["String"];
  url?: Maybe<Scalars["String"]>;
  workloadFrom: Scalars["Int"];
  workloadTo: Scalars["Int"];
};

export type JobPostingJobRequirementsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type JobPostingAllocationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  employee: EmployeeInput;
  id?: InputMaybe<Scalars["String"]>;
  /** State */
  state: Scalars["String"];
};

/** Updates a job posting */
export type JobPostingAllocationPayload = {
  __typename?: "JobPostingAllocationPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type JobPostingBaseDataInput = {
  branches: Array<InputMaybe<BranchInput>>;
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Description */
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  jobFromDate?: InputMaybe<Scalars["String"]>;
  jobToDate?: InputMaybe<Scalars["String"]>;
  jobType: JobTypeInput;
  /** Title */
  title: Scalars["String"];
  url?: InputMaybe<Scalars["String"]>;
  /** Workload from */
  workloadFrom: Scalars["Int"];
  /** Workload to */
  workloadTo: Scalars["Int"];
};

/** Creates a job posting */
export type JobPostingBaseDataPayload = {
  __typename?: "JobPostingBaseDataPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type JobPostingConnection = {
  __typename?: "JobPostingConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<JobPostingEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `JobPosting` and its cursor. */
export type JobPostingEdge = {
  __typename?: "JobPostingEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<JobPosting>;
};

export type JobPostingInput = {
  id: Scalars["String"];
};

export type JobPostingLanguageRelation = Node & {
  __typename?: "JobPostingLanguageRelation";
  /** The ID of the object */
  id: Scalars["ID"];
  language: Language;
  languageLevel: LanguageLevel;
};

export type JobPostingLanguageRelationInput = {
  id?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["String"]>;
  languageLevel?: InputMaybe<Scalars["String"]>;
};

export type JobPostingMatchInfo = Node & {
  __typename?: "JobPostingMatchInfo";
  /** The ID of the object */
  id: Scalars["ID"];
  jobPosting: JobPosting;
  student: Student;
};

export type JobPostingMatchingInput = {
  branch?: InputMaybe<BranchInput>;
  jobType?: InputMaybe<JobTypeInput>;
  workload?: InputMaybe<Scalars["Int"]>;
  zip?: InputMaybe<ZipCityInput>;
};

export type JobPostingRequirementsInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  jobRequirements?: InputMaybe<Array<InputMaybe<JobRequirementInput>>>;
  languages?: InputMaybe<Array<InputMaybe<JobPostingLanguageRelationInput>>>;
  skills?: InputMaybe<Array<InputMaybe<SkillInput>>>;
};

/** Updates a job posting */
export type JobPostingRequirementsPayload = {
  __typename?: "JobPostingRequirementsPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export enum JobPostingState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

export type JobRequirement = Node & {
  __typename?: "JobRequirement";
  /** The ID of the object */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type JobRequirementConnection = {
  __typename?: "JobRequirementConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<JobRequirementEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

export type JobRequirementConnectionsConnection = {
  __typename?: "JobRequirementConnectionsConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<JobRequirementConnectionsEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `JobRequirementConnections` and its cursor. */
export type JobRequirementConnectionsEdge = {
  __typename?: "JobRequirementConnectionsEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<JobRequirement>;
};

/** A Relay edge containing a `JobRequirement` and its cursor. */
export type JobRequirementEdge = {
  __typename?: "JobRequirementEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<JobRequirement>;
};

export type JobRequirementInput = {
  id: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
};

export type JobType = Node & {
  __typename?: "JobType";
  /** The ID of the object */
  id: Scalars["ID"];
  mode: DateMode;
  name: Scalars["String"];
};

export type JobTypeConnection = {
  __typename?: "JobTypeConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<JobTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `JobType` and its cursor. */
export type JobTypeEdge = {
  __typename?: "JobTypeEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<JobType>;
};

export type JobTypeInput = {
  id: Scalars["String"];
  mode?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Keyword = Node & {
  __typename?: "Keyword";
  /** The ID of the object */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type KeywordConnection = {
  __typename?: "KeywordConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<KeywordEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Keyword` and its cursor. */
export type KeywordEdge = {
  __typename?: "KeywordEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Keyword>;
};

export type KeywordInput = {
  id: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
};

export type Language = Node & {
  __typename?: "Language";
  /** The ID of the object */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type LanguageConnection = {
  __typename?: "LanguageConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LanguageEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Language` and its cursor. */
export type LanguageEdge = {
  __typename?: "LanguageEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Language>;
};

export type LanguageLevel = Node & {
  __typename?: "LanguageLevel";
  description?: Maybe<Scalars["String"]>;
  /** The ID of the object */
  id: Scalars["ID"];
  level: Scalars["String"];
};

export type LanguageLevelConnection = {
  __typename?: "LanguageLevelConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LanguageLevelEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `LanguageLevel` and its cursor. */
export type LanguageLevelEdge = {
  __typename?: "LanguageLevelEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<LanguageLevel>;
};

export type Match = {
  __typename?: "Match";
  avatar?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  keywords?: Maybe<Array<Keyword>>;
  matchStatus?: Maybe<MatchStatus>;
  name: Scalars["String"];
  rawScore: Scalars["Float"];
  score: Scalars["Float"];
  slug: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  type: MatchType;
};

export type MatchChallengeInput = {
  challenge: ChallengeInput;
  clientMutationId?: InputMaybe<Scalars["String"]>;
};

/** Initiate or confirm Matching */
export type MatchChallengePayload = {
  __typename?: "MatchChallengePayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  confirmed: Scalars["Boolean"];
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type MatchHints = {
  __typename?: "MatchHints";
  hasConfirmedMatch: Scalars["Boolean"];
  hasRequestedMatch: Scalars["Boolean"];
};

export type MatchJobPostingInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  jobPosting: JobPostingInput;
};

/** Initiate or confirm Matching */
export type MatchJobPostingPayload = {
  __typename?: "MatchJobPostingPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  confirmed: Scalars["Boolean"];
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type MatchStatus = {
  __typename?: "MatchStatus";
  confirmed: Scalars["Boolean"];
  initiator: ProfileType;
};

export type MatchStudentInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  jobPosting: JobPostingInput;
  student: StudentInput;
};

/** Initiate or confirm Matching */
export type MatchStudentPayload = {
  __typename?: "MatchStudentPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  confirmed: Scalars["Boolean"];
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export enum MatchType {
  Challenge = "CHALLENGE",
  Company = "COMPANY",
  JobPosting = "JOB_POSTING",
  Student = "STUDENT",
  University = "UNIVERSITY",
}

export type Mutation = {
  __typename?: "Mutation";
  /** Adds a new emplyoee to a company */
  addEmployee?: Maybe<AddEmployeePayload>;
  /** Updates a challenge */
  challengeAllocation?: Maybe<ChallengeAllocationPayload>;
  /** Creates a challenge */
  challengeBaseData?: Maybe<ChallengeBaseDataPayload>;
  /** Creates a challenge */
  challengeSpecificData?: Maybe<ChallengeSpecificDataPayload>;
  /** Updates the Company Profile with benefits and branches */
  companyProfileAdvantages?: Maybe<CompanyProfileAdvantagesPayload>;
  /** Updates the profile of a Company */
  companyProfileBaseData?: Maybe<CompanyProfileBaseDataPayload>;
  /** Updates website url, description, services, member IT St.Gallen */
  companyProfileRelations?: Maybe<CompanyProfileRelationsPayload>;
  /** Updates a company profile with soft skills and cultural fit */
  companyProfileValues?: Maybe<CompanyProfileValuesPayload>;
  deleteAttachment?: Maybe<DeleteAttachmentPayload>;
  /** Deletes a challenge */
  deleteChallenge?: Maybe<DeleteChallengePayload>;
  /** Deletes an employee within the same company */
  deleteEmployee?: Maybe<DeleteEmployeePayload>;
  /** Deletes a job posting */
  deleteJobPosting?: Maybe<DeleteJobPostingPayload>;
  /** Deletes the user */
  deleteUser?: Maybe<DeleteUserMutationPayload>;
  /** Updates a job posting */
  jobPostingAllocation?: Maybe<JobPostingAllocationPayload>;
  /** Creates a job posting */
  jobPostingBaseData?: Maybe<JobPostingBaseDataPayload>;
  /** Updates a job posting */
  jobPostingRequirements?: Maybe<JobPostingRequirementsPayload>;
  logout?: Maybe<Scalars["Boolean"]>;
  /** Initiate or confirm Matching */
  matchChallenge?: Maybe<MatchChallengePayload>;
  /** Initiate or confirm Matching */
  matchJobPosting?: Maybe<MatchJobPostingPayload>;
  /** Initiate or confirm Matching */
  matchStudent?: Maybe<MatchStudentPayload>;
  /**
   * Change account password when user knows the old password.
   *
   * A new token and refresh token are sent. User must be verified.
   */
  passwordChange?: Maybe<PasswordChange>;
  /**
   * Change user password without old password.
   *
   * Receive the token that was sent by email.
   *
   * If token and new passwords are valid, update
   * user password and in case of using refresh
   * tokens, revoke all of them.
   *
   * Also, if user has not been verified yet, verify it.
   */
  passwordReset?: Maybe<PasswordReset>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  refreshToken?: Maybe<RefreshToken>;
  /** Creates a new user with company */
  registerCompany?: Maybe<RegisterCompany>;
  /** Creates a new user as student */
  registerStudent?: Maybe<RegisterStudent>;
  /**
   * Sends activation email.
   *
   * It is called resend because theoretically
   * the first activation email was sent when
   * the user registered.
   *
   * If there is no user with the requested email,
   * a successful response is returned.
   */
  resendActivationEmail?: Maybe<ResendActivationEmail>;
  revokeToken?: Maybe<Revoke>;
  /**
   * Send password reset email.
   *
   * For non verified users, send an activation
   * email instead.
   *
   * Accepts both primary and secondary email.
   *
   * If there is no user with the requested email,
   * a successful response is returned.
   */
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmail>;
  /** Updates the profile of a student */
  studentProfileAbilities?: Maybe<StudentProfileAbilitiesPayload>;
  /** Updates the profile of a student */
  studentProfileBaseData?: Maybe<StudentProfileBaseDataPayload>;
  /** Updates soft skills and cultural fits of a student */
  studentProfileCharacter?: Maybe<StudentProfileCharacterPayload>;
  /** Updates the state of a student */
  studentProfileCondition?: Maybe<StudentProfileConditionPayload>;
  /** Updates job option, date (start or range) and branch of a student */
  studentProfileEmployment?: Maybe<StudentProfileEmploymentPayload>;
  /** Updates the nickname of a student */
  studentProfileSpecificData?: Maybe<StudentProfileSpecificDataPayload>;
  /**
   * Obtain JSON web token for given user.
   *
   * Allow to perform login with different fields,
   * and secondary email if set. The fields are
   * defined on settings.
   *
   * Not verified users can login by default. This
   * can be changes on settings.
   *
   * If user is archived, make it unarchive and
   * return `unarchiving=True` on output.
   */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  /** Updates the profile of a university */
  universityProfileBaseData?: Maybe<UniversityProfileBaseDataPayload>;
  /** Updates website services */
  universityProfileRelations?: Maybe<UniversityProfileRelationsPayload>;
  /** Updates branches and description */
  universityProfileSpecificData?: Maybe<UniversityProfileSpecificDataPayload>;
  /** Updates a company profile with soft skills and cultural fit */
  universityProfileValues?: Maybe<UniversityProfileValuesPayload>;
  /** Updates company information */
  updateCompany?: Maybe<UpdateCompanyMutationPayload>;
  /** Updates student information */
  updateStudent?: Maybe<UpdateStudentMutationPayload>;
  /** Updates user information */
  updateUser?: Maybe<UpdateUserMutationPayload>;
  upload?: Maybe<UserUploadPayload>;
  /** Creates a new user user request */
  userRequest?: Maybe<UserRequestPayload>;
  /**
   * Verify user account.
   *
   * Receive the token that was sent by email.
   * If the token is valid, make the user verified
   * by making the `user.status.verified` field true.
   */
  verifyAccount?: Maybe<VerifyAccount>;
};

export type MutationAddEmployeeArgs = {
  input: AddEmployeeInput;
};

export type MutationChallengeAllocationArgs = {
  input: ChallengeAllocationInput;
};

export type MutationChallengeBaseDataArgs = {
  input: ChallengeBaseDataInput;
};

export type MutationChallengeSpecificDataArgs = {
  input: ChallengeSpecificDataInput;
};

export type MutationCompanyProfileAdvantagesArgs = {
  input: CompanyProfileAdvantagesInput;
};

export type MutationCompanyProfileBaseDataArgs = {
  input: CompanyProfileBaseDataInput;
};

export type MutationCompanyProfileRelationsArgs = {
  input: CompanyProfileRelationsInput;
};

export type MutationCompanyProfileValuesArgs = {
  input: CompanyProfileValuesInput;
};

export type MutationDeleteAttachmentArgs = {
  input: DeleteAttachmentInput;
};

export type MutationDeleteChallengeArgs = {
  input: DeleteChallengeInput;
};

export type MutationDeleteEmployeeArgs = {
  input: DeleteEmployeeInput;
};

export type MutationDeleteJobPostingArgs = {
  input: DeleteJobPostingInput;
};

export type MutationDeleteUserArgs = {
  input: DeleteUserMutationInput;
};

export type MutationJobPostingAllocationArgs = {
  input: JobPostingAllocationInput;
};

export type MutationJobPostingBaseDataArgs = {
  input: JobPostingBaseDataInput;
};

export type MutationJobPostingRequirementsArgs = {
  input: JobPostingRequirementsInput;
};

export type MutationMatchChallengeArgs = {
  input: MatchChallengeInput;
};

export type MutationMatchJobPostingArgs = {
  input: MatchJobPostingInput;
};

export type MutationMatchStudentArgs = {
  input: MatchStudentInput;
};

export type MutationPasswordChangeArgs = {
  newPassword1: Scalars["String"];
  newPassword2: Scalars["String"];
  oldPassword: Scalars["String"];
};

export type MutationPasswordResetArgs = {
  newPassword1: Scalars["String"];
  newPassword2: Scalars["String"];
  token: Scalars["String"];
};

export type MutationRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars["String"]>;
};

export type MutationRegisterCompanyArgs = {
  company: RegisterCompanyInput;
  email: Scalars["String"];
  employee: EmployeeInput;
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password1: Scalars["String"];
  password2: Scalars["String"];
  type: Scalars["String"];
  username: Scalars["String"];
};

export type MutationRegisterStudentArgs = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password1: Scalars["String"];
  password2: Scalars["String"];
  student?: InputMaybe<RegisterStudentInput>;
  type: Scalars["String"];
  username: Scalars["String"];
};

export type MutationResendActivationEmailArgs = {
  email: Scalars["String"];
};

export type MutationRevokeTokenArgs = {
  refreshToken?: InputMaybe<Scalars["String"]>;
};

export type MutationSendPasswordResetEmailArgs = {
  email: Scalars["String"];
};

export type MutationStudentProfileAbilitiesArgs = {
  input: StudentProfileAbilitiesInput;
};

export type MutationStudentProfileBaseDataArgs = {
  input: StudentProfileBaseDataInput;
};

export type MutationStudentProfileCharacterArgs = {
  input: StudentProfileCharacterInput;
};

export type MutationStudentProfileConditionArgs = {
  input: StudentProfileConditionInput;
};

export type MutationStudentProfileEmploymentArgs = {
  input: StudentProfileEmploymentInput;
};

export type MutationStudentProfileSpecificDataArgs = {
  input: StudentProfileSpecificDataInput;
};

export type MutationTokenAuthArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationUniversityProfileBaseDataArgs = {
  input: UniversityProfileBaseDataInput;
};

export type MutationUniversityProfileRelationsArgs = {
  input: UniversityProfileRelationsInput;
};

export type MutationUniversityProfileSpecificDataArgs = {
  input: UniversityProfileSpecificDataInput;
};

export type MutationUniversityProfileValuesArgs = {
  input: UniversityProfileValuesInput;
};

export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyMutationInput;
};

export type MutationUpdateStudentArgs = {
  input: UpdateStudentMutationInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserMutationInput;
};

export type MutationUploadArgs = {
  input: UserUploadInput;
};

export type MutationUserRequestArgs = {
  input: UserRequestInput;
};

export type MutationVerifyAccountArgs = {
  token: Scalars["String"];
};

/** An object with an ID */
export type Node = {
  /** The ID of the object */
  id: Scalars["ID"];
};

/**
 * Obtain JSON web token for given user.
 *
 * Allow to perform login with different fields,
 * and secondary email if set. The fields are
 * defined on settings.
 *
 * Not verified users can login by default. This
 * can be changes on settings.
 *
 * If user is archived, make it unarchive and
 * return `unarchiving=True` on output.
 */
export type ObtainJsonWebToken = {
  __typename?: "ObtainJSONWebToken";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
  token?: Maybe<Scalars["String"]>;
  unarchiving?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<UserNode>;
};

export type OnlineChallenge = Node & {
  __typename?: "OnlineChallenge";
  /** The ID of the object */
  id: Scalars["ID"];
  url: Scalars["String"];
};

export type OnlineChallengeInput = {
  id?: InputMaybe<Scalars["String"]>;
  url?: InputMaybe<Scalars["String"]>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]>;
};

/**
 * Change account password when user knows the old password.
 *
 * A new token and refresh token are sent. User must be verified.
 */
export type PasswordChange = {
  __typename?: "PasswordChange";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
  token?: Maybe<Scalars["String"]>;
};

/**
 * Change user password without old password.
 *
 * Receive the token that was sent by email.
 *
 * If token and new passwords are valid, update
 * user password and in case of using refresh
 * tokens, revoke all of them.
 *
 * Also, if user has not been verified yet, verify it.
 */
export type PasswordReset = {
  __typename?: "PasswordReset";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export enum ProfileState {
  Anonymous = "ANONYMOUS",
  Incomplete = "INCOMPLETE",
  Public = "PUBLIC",
}

export enum ProfileType {
  CollegeStudent = "COLLEGE_STUDENT",
  Company = "COMPANY",
  Internal = "INTERNAL",
  Junior = "JUNIOR",
  Other = "OTHER",
  Student = "STUDENT",
  University = "UNIVERSITY",
}

export type Query = {
  __typename?: "Query";
  attachments?: Maybe<AttachmentConnection>;
  benefits?: Maybe<BenefitConnectionsConnection>;
  branches?: Maybe<BranchConnectionsConnection>;
  challenge?: Maybe<Challenge>;
  challengeTypes?: Maybe<ChallengeTypeConnection>;
  challenges?: Maybe<ChallengeConnection>;
  company?: Maybe<Company>;
  culturalFits?: Maybe<CulturalFitConnectionsConnection>;
  dashboard?: Maybe<Dashboard>;
  faqCategories?: Maybe<FaqCategoryConnection>;
  jobPosting?: Maybe<JobPosting>;
  jobPostings?: Maybe<JobPostingConnection>;
  jobRequirements?: Maybe<JobRequirementConnectionsConnection>;
  jobTypes?: Maybe<JobTypeConnection>;
  keywords?: Maybe<KeywordConnection>;
  languageLevels?: Maybe<LanguageLevelConnection>;
  languages?: Maybe<LanguageConnection>;
  matches?: Maybe<Array<Maybe<Match>>>;
  me?: Maybe<User>;
  node?: Maybe<Node>;
  skills?: Maybe<SkillConnectionsConnection>;
  softSkills?: Maybe<SoftSkillConnectionsConnection>;
  student?: Maybe<Student>;
  uploadConfigurations?: Maybe<Array<Maybe<UploadConfiguration>>>;
  verifyPasswordResetToken?: Maybe<Scalars["Boolean"]>;
  zipCity: Array<ZipCity>;
  zipCityJobs: Array<ZipCity>;
};

export type QueryAttachmentsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["String"]>;
  key: AttachmentKey;
  last?: InputMaybe<Scalars["Int"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type QueryBenefitsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryBranchesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryChallengeArgs = {
  id?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type QueryChallengeTypesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryChallengesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  challengeFromDate?: InputMaybe<Scalars["Date"]>;
  challengeTypeIds?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  datePublished?: InputMaybe<Scalars["Date"]>;
  filterCompanyChallenges?: InputMaybe<Scalars["Boolean"]>;
  filterTalentChallenges?: InputMaybe<Scalars["Boolean"]>;
  filterUniversityChallenges?: InputMaybe<Scalars["Boolean"]>;
  first?: InputMaybe<Scalars["Int"]>;
  keywordIds?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  last?: InputMaybe<Scalars["Int"]>;
  teamSize?: InputMaybe<Scalars["Int"]>;
  textSearch?: InputMaybe<Scalars["String"]>;
};

export type QueryCompanyArgs = {
  slug?: InputMaybe<Scalars["String"]>;
};

export type QueryCulturalFitsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryFaqCategoriesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryJobPostingArgs = {
  id?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type QueryJobPostingsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type QueryJobRequirementsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryJobTypesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryKeywordsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryLanguageLevelsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryLanguagesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  shortList?: InputMaybe<Scalars["Boolean"]>;
};

export type QueryMatchesArgs = {
  challengeMatching?: InputMaybe<ChallengeMatchingInput>;
  first?: InputMaybe<Scalars["Int"]>;
  jobPostingMatching?: InputMaybe<JobPostingMatchingInput>;
  skip?: InputMaybe<Scalars["Int"]>;
  softBoost?: InputMaybe<Scalars["Int"]>;
  studentMatching?: InputMaybe<StudentMatchingInput>;
  techBoost?: InputMaybe<Scalars["Int"]>;
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
};

export type QuerySkillsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QuerySoftSkillsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryStudentArgs = {
  jobPostingId?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type QueryVerifyPasswordResetTokenArgs = {
  token: Scalars["String"];
};

export type QueryZipCityJobsArgs = {
  branchId?: InputMaybe<Scalars["String"]>;
  jobTypeId?: InputMaybe<Scalars["String"]>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RefreshToken = {
  __typename?: "RefreshToken";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  payload: Scalars["GenericScalar"];
  refreshExpiresIn: Scalars["Int"];
  refreshToken: Scalars["String"];
  success?: Maybe<Scalars["Boolean"]>;
  token: Scalars["String"];
};

/** Creates a new user with company */
export type RegisterCompany = {
  __typename?: "RegisterCompany";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type RegisterCompanyInput = {
  /** City */
  city: Scalars["String"];
  /** Name */
  name: Scalars["String"];
  /** UID */
  uid?: InputMaybe<Scalars["String"]>;
  /** ZIP */
  zip: Scalars["String"];
};

/** Creates a new user as student */
export type RegisterStudent = {
  __typename?: "RegisterStudent";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type RegisterStudentInput = {
  id?: InputMaybe<Scalars["String"]>;
  /** Mobile */
  mobile: Scalars["String"];
};

/**
 * Sends activation email.
 *
 * It is called resend because theoretically
 * the first activation email was sent when
 * the user registered.
 *
 * If there is no user with the requested email,
 * a successful response is returned.
 */
export type ResendActivationEmail = {
  __typename?: "ResendActivationEmail";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type Revoke = {
  __typename?: "Revoke";
  revoked: Scalars["Int"];
};

/**
 * Send password reset email.
 *
 * For non verified users, send an activation
 * email instead.
 *
 * Accepts both primary and secondary email.
 *
 * If there is no user with the requested email,
 * a successful response is returned.
 */
export type SendPasswordResetEmail = {
  __typename?: "SendPasswordResetEmail";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type Skill = Node & {
  __typename?: "Skill";
  /** The ID of the object */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type SkillConnection = {
  __typename?: "SkillConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<SkillEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

export type SkillConnectionsConnection = {
  __typename?: "SkillConnectionsConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<SkillConnectionsEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `SkillConnections` and its cursor. */
export type SkillConnectionsEdge = {
  __typename?: "SkillConnectionsEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Skill>;
};

/** A Relay edge containing a `Skill` and its cursor. */
export type SkillEdge = {
  __typename?: "SkillEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Skill>;
};

export type SkillInput = {
  id: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
};

export type SoftSkill = Node & {
  __typename?: "SoftSkill";
  company: Scalars["String"];
  /** The ID of the object */
  id: Scalars["ID"];
  student: Scalars["String"];
};

export type SoftSkillConnection = {
  __typename?: "SoftSkillConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<SoftSkillEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

export type SoftSkillConnectionsConnection = {
  __typename?: "SoftSkillConnectionsConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<SoftSkillConnectionsEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `SoftSkillConnections` and its cursor. */
export type SoftSkillConnectionsEdge = {
  __typename?: "SoftSkillConnectionsEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<SoftSkill>;
};

/** A Relay edge containing a `SoftSkill` and its cursor. */
export type SoftSkillEdge = {
  __typename?: "SoftSkillEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<SoftSkill>;
};

export type SoftSkillInput = {
  id: Scalars["String"];
};

export type Student = Node & {
  __typename?: "Student";
  branch?: Maybe<Branch>;
  challenges: Array<Challenge>;
  city?: Maybe<Scalars["String"]>;
  culturalFits: CulturalFitConnection;
  dateOfBirth?: Maybe<Scalars["String"]>;
  distinction?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  fieldOfStudy?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  graduation?: Maybe<Scalars["String"]>;
  hobbies?: Maybe<Array<Hobby>>;
  /** The ID of the object */
  id: Scalars["ID"];
  isMatchable: Scalars["Boolean"];
  jobFromDate?: Maybe<Scalars["Date"]>;
  jobToDate?: Maybe<Scalars["Date"]>;
  jobType?: Maybe<JobType>;
  languages: UserLanguageRelationConnection;
  lastName?: Maybe<Scalars["String"]>;
  matchStatus?: Maybe<MatchStatus>;
  mobile?: Maybe<Scalars["String"]>;
  nickname?: Maybe<Scalars["String"]>;
  onlineChallenges?: Maybe<Array<OnlineChallenge>>;
  profileStep: Scalars["Int"];
  schoolName?: Maybe<Scalars["String"]>;
  skills: SkillConnection;
  slug: Scalars["String"];
  softSkills: SoftSkillConnection;
  state: ProfileState;
  street?: Maybe<Scalars["String"]>;
  zip?: Maybe<Scalars["String"]>;
};

export type StudentCulturalFitsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type StudentLanguagesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type StudentSkillsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type StudentSoftSkillsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type StudentInput = {
  id: Scalars["String"];
};

export type StudentMatchingInput = {
  jobPosting: JobPostingInput;
};

export type StudentProfileAbilitiesInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Distinction */
  distinction?: InputMaybe<Scalars["String"]>;
  /** Hobbies */
  hobbies?: InputMaybe<Array<InputMaybe<HobbyInput>>>;
  /** Languages */
  languages: Array<InputMaybe<UserLanguageRelationInput>>;
  /** Online_Challenges */
  onlineChallenges?: InputMaybe<Array<InputMaybe<OnlineChallengeInput>>>;
  /** Skills */
  skills?: InputMaybe<Array<InputMaybe<SkillInput>>>;
};

/** Updates the profile of a student */
export type StudentProfileAbilitiesPayload = {
  __typename?: "StudentProfileAbilitiesPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type StudentProfileBaseDataInput = {
  /** City */
  city?: InputMaybe<Scalars["String"]>;
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Date of birth */
  dateOfBirth: Scalars["String"];
  /** First name */
  firstName: Scalars["String"];
  /** Last name */
  lastName: Scalars["String"];
  /** Date of birth */
  mobile?: InputMaybe<Scalars["String"]>;
  /** street */
  street?: InputMaybe<Scalars["String"]>;
  /** Zip */
  zip?: InputMaybe<Scalars["String"]>;
};

/** Updates the profile of a student */
export type StudentProfileBaseDataPayload = {
  __typename?: "StudentProfileBaseDataPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type StudentProfileCharacterInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  culturalFits?: InputMaybe<Array<InputMaybe<CulturalFitInput>>>;
  softSkills?: InputMaybe<Array<InputMaybe<SoftSkillInput>>>;
};

/** Updates soft skills and cultural fits of a student */
export type StudentProfileCharacterPayload = {
  __typename?: "StudentProfileCharacterPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type StudentProfileConditionInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** State */
  state: Scalars["String"];
};

/** Updates the state of a student */
export type StudentProfileConditionPayload = {
  __typename?: "StudentProfileConditionPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type StudentProfileEmploymentInput = {
  branch?: InputMaybe<BranchInput>;
  clientMutationId?: InputMaybe<Scalars["String"]>;
  jobFromDate?: InputMaybe<Scalars["String"]>;
  jobToDate?: InputMaybe<Scalars["String"]>;
  jobType: JobTypeInput;
};

/** Updates job option, date (start or range) and branch of a student */
export type StudentProfileEmploymentPayload = {
  __typename?: "StudentProfileEmploymentPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type StudentProfileSpecificDataInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Nickname */
  nickname: Scalars["String"];
};

/** Updates the nickname of a student */
export type StudentProfileSpecificDataPayload = {
  __typename?: "StudentProfileSpecificDataPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  nicknameSuggestions?: Maybe<Array<Maybe<Scalars["String"]>>>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type UniversityProfileBaseDataInput = {
  /** City */
  city: Scalars["String"];
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** First name */
  firstName: Scalars["String"];
  /** Last name */
  lastName: Scalars["String"];
  /** Name */
  name?: InputMaybe<Scalars["String"]>;
  /** Phone Number */
  phone?: InputMaybe<Scalars["String"]>;
  /** role */
  role: Scalars["String"];
  /** Street */
  street: Scalars["String"];
  /** description */
  topLevelOrganisationDescription?: InputMaybe<Scalars["String"]>;
  /** website dachorganisation */
  topLevelOrganisationWebsite?: InputMaybe<Scalars["String"]>;
  /** website */
  website: Scalars["String"];
  /** Zip */
  zip: Scalars["String"];
};

/** Updates the profile of a university */
export type UniversityProfileBaseDataPayload = {
  __typename?: "UniversityProfileBaseDataPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type UniversityProfileRelationsInput = {
  /** Benefits */
  benefits?: InputMaybe<Array<InputMaybe<BenefitInput>>>;
  /** Branches */
  branches?: InputMaybe<Array<InputMaybe<BranchInput>>>;
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** website challenges */
  linkChallenges?: InputMaybe<Scalars["String"]>;
  /** website education */
  linkEducation?: InputMaybe<Scalars["String"]>;
  /** website thesis */
  linkThesis?: InputMaybe<Scalars["String"]>;
  /** services */
  services?: InputMaybe<Scalars["String"]>;
};

/** Updates website services */
export type UniversityProfileRelationsPayload = {
  __typename?: "UniversityProfileRelationsPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type UniversityProfileSpecificDataInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** description */
  description?: InputMaybe<Scalars["String"]>;
};

/** Updates branches and description */
export type UniversityProfileSpecificDataPayload = {
  __typename?: "UniversityProfileSpecificDataPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type UniversityProfileValuesInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Cultural Fit */
  culturalFits?: InputMaybe<Array<InputMaybe<CulturalFitInput>>>;
  /** Soft Skills */
  softSkills?: InputMaybe<Array<InputMaybe<SoftSkillInput>>>;
};

/** Updates a company profile with soft skills and cultural fit */
export type UniversityProfileValuesPayload = {
  __typename?: "UniversityProfileValuesPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type UpdateCompanyMutationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
  state?: InputMaybe<ProfileState>;
};

/** Updates company information */
export type UpdateCompanyMutationPayload = {
  __typename?: "UpdateCompanyMutationPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  company?: Maybe<Company>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type UpdateStudentMutationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  isMatchable?: InputMaybe<Scalars["Boolean"]>;
};

/** Updates student information */
export type UpdateStudentMutationPayload = {
  __typename?: "UpdateStudentMutationPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  student?: Maybe<Student>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type UpdateUserMutationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
};

/** Updates user information */
export type UpdateUserMutationPayload = {
  __typename?: "UpdateUserMutationPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<User>;
};

export type UploadConfiguration = {
  __typename?: "UploadConfiguration";
  contentTypesConfiguration: Array<UploadTypeConfiguration>;
  key: AttachmentKey;
  maxFiles: Scalars["Int"];
};

export type UploadTypeConfiguration = {
  __typename?: "UploadTypeConfiguration";
  contentTypes: Array<Scalars["String"]>;
  maxSize: Scalars["Int"];
};

export type User = Node & {
  __typename?: "User";
  company?: Maybe<Company>;
  dateJoined: Scalars["DateTime"];
  email: Scalars["String"];
  employee?: Maybe<Employee>;
  firstName: Scalars["String"];
  /** The ID of the object */
  id: Scalars["ID"];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars["Boolean"];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars["Boolean"];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars["Boolean"];
  lastLogin?: Maybe<Scalars["DateTime"]>;
  lastName: Scalars["String"];
  password: Scalars["String"];
  student?: Maybe<Student>;
  type: ProfileType;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
};

export type UserLanguageRelation = Node & {
  __typename?: "UserLanguageRelation";
  /** The ID of the object */
  id: Scalars["ID"];
  language: Language;
  languageLevel: LanguageLevel;
};

export type UserLanguageRelationConnection = {
  __typename?: "UserLanguageRelationConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserLanguageRelationEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `UserLanguageRelation` and its cursor. */
export type UserLanguageRelationEdge = {
  __typename?: "UserLanguageRelationEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<UserLanguageRelation>;
};

export type UserLanguageRelationInput = {
  id?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["String"]>;
  languageLevel?: InputMaybe<Scalars["String"]>;
};

export type UserNode = Node & {
  __typename?: "UserNode";
  archived?: Maybe<Scalars["Boolean"]>;
  company?: Maybe<Company>;
  email: Scalars["String"];
  employee?: Maybe<Employee>;
  firstName: Scalars["String"];
  /** The ID of the object */
  id: Scalars["ID"];
  lastName: Scalars["String"];
  pk?: Maybe<Scalars["Int"]>;
  secondaryEmail?: Maybe<Scalars["String"]>;
  student?: Maybe<Student>;
  type: DbUserTypeChoices;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
  verified?: Maybe<Scalars["Boolean"]>;
};

export type UserRequestInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** E-Mail */
  email: Scalars["String"];
  /** Message */
  message: Scalars["String"];
  /** Name */
  name: Scalars["String"];
};

/** Creates a new user user request */
export type UserRequestPayload = {
  __typename?: "UserRequestPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type UserUploadInput = {
  challenge?: InputMaybe<ChallengeInput>;
  clientMutationId?: InputMaybe<Scalars["String"]>;
  file: Scalars["Upload"];
  key: AttachmentKey;
};

export type UserUploadPayload = {
  __typename?: "UserUploadPayload";
  attachment?: Maybe<Attachment>;
  clientMutationId?: Maybe<Scalars["String"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/**
 * Verify user account.
 *
 * Receive the token that was sent by email.
 * If the token is valid, make the user verified
 * by making the `user.status.verified` field true.
 */
export type VerifyAccount = {
  __typename?: "VerifyAccount";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type ZipCity = {
  __typename?: "ZipCity";
  canton: Scalars["String"];
  city: Scalars["String"];
  zip: Scalars["String"];
};

export type ZipCityInput = {
  zip: Scalars["String"];
};
