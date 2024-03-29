import gql from "graphql-tag";
type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: string; output: string };
  DateTime: { input: unknown; output: unknown };
  ExpectedErrorType: { input: unknown; output: unknown };
  GenericScalar: { input: unknown; output: unknown };
  Upload: { input: unknown; output: unknown };
};

type AddEmployeeInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  role: Scalars["String"]["input"];
};

/** Adds a new emplyoee to a company */
type AddEmployeePayload = {
  __typename?: "AddEmployeePayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  employee?: Maybe<Employee>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type Attachment = Node & {
  __typename?: "Attachment";
  fileName: Scalars["String"]["output"];
  fileSize: Scalars["Int"]["output"];
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  mimeType: Scalars["String"]["output"];
  url: Scalars["String"]["output"];
};

type AttachmentConnection = {
  __typename?: "AttachmentConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AttachmentEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Attachment` and its cursor. */
type AttachmentEdge = {
  __typename?: "AttachmentEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<Attachment>;
};

/** An enumeration. */
enum AttachmentKey {
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

type Benefit = Node & {
  __typename?: "Benefit";
  icon: Scalars["String"]["output"];
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

type BenefitConnection = {
  __typename?: "BenefitConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BenefitEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

type BenefitConnectionsConnection = {
  __typename?: "BenefitConnectionsConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BenefitConnectionsEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `BenefitConnections` and its cursor. */
type BenefitConnectionsEdge = {
  __typename?: "BenefitConnectionsEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<Benefit>;
};

/** A Relay edge containing a `Benefit` and its cursor. */
type BenefitEdge = {
  __typename?: "BenefitEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<Benefit>;
};

type BenefitInput = {
  icon?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
};

type Branch = Node & {
  __typename?: "Branch";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

type BranchConnection = {
  __typename?: "BranchConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BranchEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

type BranchConnectionsConnection = {
  __typename?: "BranchConnectionsConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BranchConnectionsEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `BranchConnections` and its cursor. */
type BranchConnectionsEdge = {
  __typename?: "BranchConnectionsEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<Branch>;
};

/** A Relay edge containing a `Branch` and its cursor. */
type BranchEdge = {
  __typename?: "BranchEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<Branch>;
};

type BranchInput = {
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

type Challenge = Node & {
  __typename?: "Challenge";
  avatarUrl?: Maybe<Scalars["String"]["output"]>;
  challengeFromDate?: Maybe<Scalars["Date"]["output"]>;
  challengeType: ChallengeType;
  company?: Maybe<Company>;
  compensation?: Maybe<Scalars["String"]["output"]>;
  dateCreated?: Maybe<Scalars["Date"]["output"]>;
  datePublished?: Maybe<Scalars["Date"]["output"]>;
  description: Scalars["String"]["output"];
  displayTitle: Scalars["String"]["output"];
  employee?: Maybe<Employee>;
  formStep: Scalars["Int"]["output"];
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  keywords?: Maybe<Array<Keyword>>;
  matchHints?: Maybe<MatchHints>;
  matchStatus?: Maybe<MatchStatus>;
  slug: Scalars["String"]["output"];
  state: ChallengeState;
  student?: Maybe<Student>;
  teamSize?: Maybe<Scalars["Int"]["output"]>;
  title: Scalars["String"]["output"];
  website: Scalars["String"]["output"];
};

type ChallengeAllocationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  employee?: InputMaybe<EmployeeInput>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  /** State */
  state: Scalars["String"]["input"];
};

/** Updates a challenge */
type ChallengeAllocationPayload = {
  __typename?: "ChallengeAllocationPayload";
  challengeId?: Maybe<Scalars["String"]["output"]>;
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type ChallengeBaseDataInput = {
  challengeType: ChallengeTypeInput;
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** Compensation */
  compensation: Scalars["String"]["input"];
  /** Description */
  description: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  keywords: Array<InputMaybe<KeywordInput>>;
  /** Team size */
  teamSize: Scalars["Int"]["input"];
  /** Title */
  title: Scalars["String"]["input"];
};

/** Creates a challenge */
type ChallengeBaseDataPayload = {
  __typename?: "ChallengeBaseDataPayload";
  challengeId?: Maybe<Scalars["String"]["output"]>;
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type ChallengeConnection = {
  __typename?: "ChallengeConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ChallengeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Challenge` and its cursor. */
type ChallengeEdge = {
  __typename?: "ChallengeEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<Challenge>;
};

type ChallengeInput = {
  id: Scalars["String"]["input"];
};

type ChallengeMatchInfo = Node & {
  __typename?: "ChallengeMatchInfo";
  challenge: Challenge;
  company?: Maybe<Company>;
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  student?: Maybe<Student>;
};

type ChallengeMatchingInput = {
  challenge: ChallengeInput;
};

type ChallengeSpecificDataInput = {
  challengeFromDate?: InputMaybe<Scalars["String"]["input"]>;
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  website?: InputMaybe<Scalars["String"]["input"]>;
};

/** Creates a challenge */
type ChallengeSpecificDataPayload = {
  __typename?: "ChallengeSpecificDataPayload";
  challengeId?: Maybe<Scalars["String"]["output"]>;
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

/** An enumeration. */
enum ChallengeState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

type ChallengeType = Node & {
  __typename?: "ChallengeType";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

type ChallengeTypeConnection = {
  __typename?: "ChallengeTypeConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ChallengeTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ChallengeType` and its cursor. */
type ChallengeTypeEdge = {
  __typename?: "ChallengeTypeEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<ChallengeType>;
};

type ChallengeTypeInput = {
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

type Company = Node & {
  __typename?: "Company";
  benefits: BenefitConnection;
  branches: BranchConnection;
  challenges: Array<Challenge>;
  city: Scalars["String"]["output"];
  culturalFits?: Maybe<Array<CulturalFit>>;
  description: Scalars["String"]["output"];
  displayName: Scalars["String"]["output"];
  employees: Array<Employee>;
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  jobPostings: Array<JobPosting>;
  linkChallenges?: Maybe<Scalars["String"]["output"]>;
  linkEducation?: Maybe<Scalars["String"]["output"]>;
  linkThesis?: Maybe<Scalars["String"]["output"]>;
  memberItStGallen: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  phone: Scalars["String"]["output"];
  services: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
  softSkills?: Maybe<Array<SoftSkill>>;
  state: ProfileState;
  street: Scalars["String"]["output"];
  topLevelOrganisationDescription: Scalars["String"]["output"];
  topLevelOrganisationWebsite: Scalars["String"]["output"];
  type: ProfileType;
  uid: Scalars["String"]["output"];
  website: Scalars["String"]["output"];
  zip: Scalars["String"]["output"];
};

type CompanyBenefitsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

type CompanyBranchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

type CompanyProfileAdvantagesInput = {
  /** Benefits */
  benefits?: InputMaybe<Array<InputMaybe<BenefitInput>>>;
  /** Branches */
  branches?: InputMaybe<Array<InputMaybe<BranchInput>>>;
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
};

/** Updates the Company Profile with benefits and branches */
type CompanyProfileAdvantagesPayload = {
  __typename?: "CompanyProfileAdvantagesPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type CompanyProfileBaseDataInput = {
  /** City */
  city?: InputMaybe<Scalars["String"]["input"]>;
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** First name */
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  /** Last name */
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  /** Name */
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** Phone Number */
  phone?: InputMaybe<Scalars["String"]["input"]>;
  /** role */
  role?: InputMaybe<Scalars["String"]["input"]>;
  /** Street */
  street?: InputMaybe<Scalars["String"]["input"]>;
  /** Zip */
  zip?: InputMaybe<Scalars["String"]["input"]>;
};

/** Updates the profile of a Company */
type CompanyProfileBaseDataPayload = {
  __typename?: "CompanyProfileBaseDataPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type CompanyProfileRelationsInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** description */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** memeber IT St. Gallen */
  memberItStGallen?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** services */
  services?: InputMaybe<Scalars["String"]["input"]>;
  /** website */
  website?: InputMaybe<Scalars["String"]["input"]>;
};

/** Updates website url, description, services, member IT St.Gallen */
type CompanyProfileRelationsPayload = {
  __typename?: "CompanyProfileRelationsPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type CompanyProfileValuesInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** Cultural Fit */
  culturalFits?: InputMaybe<Array<InputMaybe<CulturalFitInput>>>;
  /** Soft Skills */
  softSkills?: InputMaybe<Array<InputMaybe<SoftSkillInput>>>;
};

/** Updates a company profile with soft skills and cultural fit */
type CompanyProfileValuesPayload = {
  __typename?: "CompanyProfileValuesPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type CulturalFit = Node & {
  __typename?: "CulturalFit";
  company: Scalars["String"]["output"];
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  student: Scalars["String"]["output"];
};

type CulturalFitConnection = {
  __typename?: "CulturalFitConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<CulturalFitEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

type CulturalFitConnectionsConnection = {
  __typename?: "CulturalFitConnectionsConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<CulturalFitConnectionsEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `CulturalFitConnections` and its cursor. */
type CulturalFitConnectionsEdge = {
  __typename?: "CulturalFitConnectionsEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<CulturalFit>;
};

/** A Relay edge containing a `CulturalFit` and its cursor. */
type CulturalFitEdge = {
  __typename?: "CulturalFitEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<CulturalFit>;
};

type CulturalFitInput = {
  id: Scalars["String"]["input"];
};

type Dashboard = {
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

/** An enumeration. */
enum DateMode {
  DateFrom = "DATE_FROM",
  DateRange = "DATE_RANGE",
}

/** An enumeration. */
enum DbUserTypeChoices {
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

type DeleteAttachmentInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
};

type DeleteAttachmentPayload = {
  __typename?: "DeleteAttachmentPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type DeleteChallengeInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
};

/** Deletes a challenge */
type DeleteChallengePayload = {
  __typename?: "DeleteChallengePayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type DeleteEmployeeInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
};

/** Deletes an employee within the same company */
type DeleteEmployeePayload = {
  __typename?: "DeleteEmployeePayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type DeleteJobPostingInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
};

/** Deletes a job posting */
type DeleteJobPostingPayload = {
  __typename?: "DeleteJobPostingPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type DeleteUserMutationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
};

/** Deletes the user */
type DeleteUserMutationPayload = {
  __typename?: "DeleteUserMutationPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type Employee = Node & {
  __typename?: "Employee";
  email?: Maybe<Scalars["String"]["output"]>;
  firstName?: Maybe<Scalars["String"]["output"]>;
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  role: Scalars["String"]["output"];
};

type EmployeeInput = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  /** Role */
  role?: InputMaybe<Scalars["String"]["input"]>;
};

type FaqCategory = Node & {
  __typename?: "FAQCategory";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

type FaqCategoryConnection = {
  __typename?: "FAQCategoryConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<FaqCategoryEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `FAQCategory` and its cursor. */
type FaqCategoryEdge = {
  __typename?: "FAQCategoryEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<FaqCategory>;
};

type Hobby = Node & {
  __typename?: "Hobby";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

type HobbyInput = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

type JobPosting = Node & {
  __typename?: "JobPosting";
  branches: Array<Branch>;
  company: Company;
  dateCreated?: Maybe<Scalars["Date"]["output"]>;
  datePublished?: Maybe<Scalars["Date"]["output"]>;
  description: Scalars["String"]["output"];
  displayTitle: Scalars["String"]["output"];
  employee?: Maybe<Employee>;
  formStep: Scalars["Int"]["output"];
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  jobFromDate?: Maybe<Scalars["Date"]["output"]>;
  jobRequirements: JobRequirementConnection;
  jobToDate?: Maybe<Scalars["Date"]["output"]>;
  jobType: JobType;
  languages?: Maybe<Array<JobPostingLanguageRelation>>;
  matchHints?: Maybe<MatchHints>;
  matchStatus?: Maybe<MatchStatus>;
  skills?: Maybe<Array<Skill>>;
  slug: Scalars["String"]["output"];
  state: JobPostingState;
  title: Scalars["String"]["output"];
  url?: Maybe<Scalars["String"]["output"]>;
  workloadFrom: Scalars["Int"]["output"];
  workloadTo: Scalars["Int"]["output"];
};

type JobPostingJobRequirementsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

type JobPostingAllocationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  employee: EmployeeInput;
  id?: InputMaybe<Scalars["String"]["input"]>;
  /** State */
  state: Scalars["String"]["input"];
};

/** Updates a job posting */
type JobPostingAllocationPayload = {
  __typename?: "JobPostingAllocationPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  jobPostingId?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type JobPostingBaseDataInput = {
  branches: Array<InputMaybe<BranchInput>>;
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** Description */
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  jobFromDate?: InputMaybe<Scalars["String"]["input"]>;
  jobToDate?: InputMaybe<Scalars["String"]["input"]>;
  jobType: JobTypeInput;
  /** Title */
  title: Scalars["String"]["input"];
  url?: InputMaybe<Scalars["String"]["input"]>;
  /** Workload from */
  workloadFrom: Scalars["Int"]["input"];
  /** Workload to */
  workloadTo: Scalars["Int"]["input"];
};

/** Creates a job posting */
type JobPostingBaseDataPayload = {
  __typename?: "JobPostingBaseDataPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  jobPostingId?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type JobPostingConnection = {
  __typename?: "JobPostingConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<JobPostingEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `JobPosting` and its cursor. */
type JobPostingEdge = {
  __typename?: "JobPostingEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<JobPosting>;
};

type JobPostingInput = {
  id: Scalars["String"]["input"];
};

type JobPostingLanguageRelation = Node & {
  __typename?: "JobPostingLanguageRelation";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  language: Language;
  languageLevel: LanguageLevel;
};

type JobPostingLanguageRelationInput = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  language?: InputMaybe<Scalars["String"]["input"]>;
  languageLevel?: InputMaybe<Scalars["String"]["input"]>;
};

type JobPostingMatchInfo = Node & {
  __typename?: "JobPostingMatchInfo";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  jobPosting: JobPosting;
  student: Student;
};

type JobPostingMatchingInput = {
  branch?: InputMaybe<BranchInput>;
  jobType?: InputMaybe<JobTypeInput>;
  workload?: InputMaybe<Scalars["Int"]["input"]>;
  zip?: InputMaybe<Scalars["String"]["input"]>;
};

type JobPostingRequirementsInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  jobRequirements?: InputMaybe<Array<InputMaybe<JobRequirementInput>>>;
  languages?: InputMaybe<Array<InputMaybe<JobPostingLanguageRelationInput>>>;
  skills?: InputMaybe<Array<InputMaybe<SkillInput>>>;
};

/** Updates a job posting */
type JobPostingRequirementsPayload = {
  __typename?: "JobPostingRequirementsPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  jobPostingId?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

/** An enumeration. */
enum JobPostingState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

type JobRequirement = Node & {
  __typename?: "JobRequirement";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

type JobRequirementConnection = {
  __typename?: "JobRequirementConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<JobRequirementEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

type JobRequirementConnectionsConnection = {
  __typename?: "JobRequirementConnectionsConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<JobRequirementConnectionsEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `JobRequirementConnections` and its cursor. */
type JobRequirementConnectionsEdge = {
  __typename?: "JobRequirementConnectionsEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<JobRequirement>;
};

/** A Relay edge containing a `JobRequirement` and its cursor. */
type JobRequirementEdge = {
  __typename?: "JobRequirementEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<JobRequirement>;
};

type JobRequirementInput = {
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

type JobType = Node & {
  __typename?: "JobType";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  mode: DateMode;
  name: Scalars["String"]["output"];
};

type JobTypeConnection = {
  __typename?: "JobTypeConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<JobTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `JobType` and its cursor. */
type JobTypeEdge = {
  __typename?: "JobTypeEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<JobType>;
};

type JobTypeInput = {
  id: Scalars["String"]["input"];
  mode?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

type Keyword = Node & {
  __typename?: "Keyword";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

type KeywordConnection = {
  __typename?: "KeywordConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<KeywordEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Keyword` and its cursor. */
type KeywordEdge = {
  __typename?: "KeywordEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<Keyword>;
};

type KeywordInput = {
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

type Language = Node & {
  __typename?: "Language";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

type LanguageConnection = {
  __typename?: "LanguageConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LanguageEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Language` and its cursor. */
type LanguageEdge = {
  __typename?: "LanguageEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<Language>;
};

type LanguageLevel = Node & {
  __typename?: "LanguageLevel";
  description?: Maybe<Scalars["String"]["output"]>;
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  level: Scalars["String"]["output"];
};

type LanguageLevelConnection = {
  __typename?: "LanguageLevelConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LanguageLevelEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `LanguageLevel` and its cursor. */
type LanguageLevelEdge = {
  __typename?: "LanguageLevelEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<LanguageLevel>;
};

type Match = {
  __typename?: "Match";
  avatar?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  keywords?: Maybe<Array<Keyword>>;
  matchStatus?: Maybe<MatchStatus>;
  name: Scalars["String"]["output"];
  rawScore: Scalars["Float"]["output"];
  score: Scalars["Float"]["output"];
  slug: Scalars["String"]["output"];
  title?: Maybe<Scalars["String"]["output"]>;
  type: MatchType;
};

type MatchChallengeInput = {
  challenge: ChallengeInput;
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
};

/** Initiate or confirm Matching */
type MatchChallengePayload = {
  __typename?: "MatchChallengePayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  confirmed: Scalars["Boolean"]["output"];
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type MatchHints = {
  __typename?: "MatchHints";
  hasConfirmedMatch: Scalars["Boolean"]["output"];
  hasRequestedMatch: Scalars["Boolean"]["output"];
};

type MatchJobPostingInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  jobPosting: JobPostingInput;
};

/** Initiate or confirm Matching */
type MatchJobPostingPayload = {
  __typename?: "MatchJobPostingPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  confirmed: Scalars["Boolean"]["output"];
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type MatchStatus = {
  __typename?: "MatchStatus";
  confirmed: Scalars["Boolean"]["output"];
  initiator: ProfileType;
};

type MatchStudentInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  jobPosting: JobPostingInput;
  student: StudentInput;
};

/** Initiate or confirm Matching */
type MatchStudentPayload = {
  __typename?: "MatchStudentPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  confirmed: Scalars["Boolean"]["output"];
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

/** An enumeration. */
enum MatchType {
  Challenge = "CHALLENGE",
  Company = "COMPANY",
  JobPosting = "JOB_POSTING",
  Student = "STUDENT",
  University = "UNIVERSITY",
}

type Mutation = {
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
  logout?: Maybe<Scalars["Boolean"]["output"]>;
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

type MutationAddEmployeeArgs = {
  input: AddEmployeeInput;
};

type MutationChallengeAllocationArgs = {
  input: ChallengeAllocationInput;
};

type MutationChallengeBaseDataArgs = {
  input: ChallengeBaseDataInput;
};

type MutationChallengeSpecificDataArgs = {
  input: ChallengeSpecificDataInput;
};

type MutationCompanyProfileAdvantagesArgs = {
  input: CompanyProfileAdvantagesInput;
};

type MutationCompanyProfileBaseDataArgs = {
  input: CompanyProfileBaseDataInput;
};

type MutationCompanyProfileRelationsArgs = {
  input: CompanyProfileRelationsInput;
};

type MutationCompanyProfileValuesArgs = {
  input: CompanyProfileValuesInput;
};

type MutationDeleteAttachmentArgs = {
  input: DeleteAttachmentInput;
};

type MutationDeleteChallengeArgs = {
  input: DeleteChallengeInput;
};

type MutationDeleteEmployeeArgs = {
  input: DeleteEmployeeInput;
};

type MutationDeleteJobPostingArgs = {
  input: DeleteJobPostingInput;
};

type MutationDeleteUserArgs = {
  input: DeleteUserMutationInput;
};

type MutationJobPostingAllocationArgs = {
  input: JobPostingAllocationInput;
};

type MutationJobPostingBaseDataArgs = {
  input: JobPostingBaseDataInput;
};

type MutationJobPostingRequirementsArgs = {
  input: JobPostingRequirementsInput;
};

type MutationMatchChallengeArgs = {
  input: MatchChallengeInput;
};

type MutationMatchJobPostingArgs = {
  input: MatchJobPostingInput;
};

type MutationMatchStudentArgs = {
  input: MatchStudentInput;
};

type MutationPasswordChangeArgs = {
  newPassword1: Scalars["String"]["input"];
  newPassword2: Scalars["String"]["input"];
  oldPassword: Scalars["String"]["input"];
};

type MutationPasswordResetArgs = {
  newPassword1: Scalars["String"]["input"];
  newPassword2: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

type MutationRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars["String"]["input"]>;
};

type MutationRegisterCompanyArgs = {
  company: RegisterCompanyInput;
  email: Scalars["String"]["input"];
  employee: EmployeeInput;
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password1: Scalars["String"]["input"];
  password2: Scalars["String"]["input"];
  type: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

type MutationRegisterStudentArgs = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password1: Scalars["String"]["input"];
  password2: Scalars["String"]["input"];
  student?: InputMaybe<RegisterStudentInput>;
  type: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

type MutationResendActivationEmailArgs = {
  email: Scalars["String"]["input"];
};

type MutationRevokeTokenArgs = {
  refreshToken?: InputMaybe<Scalars["String"]["input"]>;
};

type MutationSendPasswordResetEmailArgs = {
  email: Scalars["String"]["input"];
};

type MutationStudentProfileAbilitiesArgs = {
  input: StudentProfileAbilitiesInput;
};

type MutationStudentProfileBaseDataArgs = {
  input: StudentProfileBaseDataInput;
};

type MutationStudentProfileCharacterArgs = {
  input: StudentProfileCharacterInput;
};

type MutationStudentProfileConditionArgs = {
  input: StudentProfileConditionInput;
};

type MutationStudentProfileEmploymentArgs = {
  input: StudentProfileEmploymentInput;
};

type MutationStudentProfileSpecificDataArgs = {
  input: StudentProfileSpecificDataInput;
};

type MutationTokenAuthArgs = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

type MutationUniversityProfileBaseDataArgs = {
  input: UniversityProfileBaseDataInput;
};

type MutationUniversityProfileRelationsArgs = {
  input: UniversityProfileRelationsInput;
};

type MutationUniversityProfileSpecificDataArgs = {
  input: UniversityProfileSpecificDataInput;
};

type MutationUniversityProfileValuesArgs = {
  input: UniversityProfileValuesInput;
};

type MutationUpdateCompanyArgs = {
  input: UpdateCompanyMutationInput;
};

type MutationUpdateStudentArgs = {
  input: UpdateStudentMutationInput;
};

type MutationUpdateUserArgs = {
  input: UpdateUserMutationInput;
};

type MutationUploadArgs = {
  input: UserUploadInput;
};

type MutationUserRequestArgs = {
  input: UserRequestInput;
};

type MutationVerifyAccountArgs = {
  token: Scalars["String"]["input"];
};

/** An object with an ID */
type Node = {
  /** The ID of the object */
  id: Scalars["ID"]["output"];
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
type ObtainJsonWebToken = {
  __typename?: "ObtainJSONWebToken";
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  refreshToken?: Maybe<Scalars["String"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
  token?: Maybe<Scalars["String"]["output"]>;
  unarchiving?: Maybe<Scalars["Boolean"]["output"]>;
  user?: Maybe<UserNode>;
};

type OnlineChallenge = Node & {
  __typename?: "OnlineChallenge";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  url: Scalars["String"]["output"];
};

type OnlineChallengeInput = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]["output"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

/**
 * Change account password when user knows the old password.
 *
 * A new token and refresh token are sent. User must be verified.
 */
type PasswordChange = {
  __typename?: "PasswordChange";
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  refreshToken?: Maybe<Scalars["String"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
  token?: Maybe<Scalars["String"]["output"]>;
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
type PasswordReset = {
  __typename?: "PasswordReset";
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

/** An enumeration. */
enum ProfileState {
  Anonymous = "ANONYMOUS",
  Public = "PUBLIC",
}

/** An enumeration. */
enum ProfileType {
  CollegeStudent = "COLLEGE_STUDENT",
  Company = "COMPANY",
  Internal = "INTERNAL",
  Junior = "JUNIOR",
  Other = "OTHER",
  Student = "STUDENT",
  University = "UNIVERSITY",
}

type Query = {
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
  verifyPasswordResetToken?: Maybe<Scalars["Boolean"]["output"]>;
  zipCity: Array<ZipCity>;
  zipCityJobs: Array<ZipCity>;
};

type QueryAttachmentsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  key: AttachmentKey;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

type QueryBenefitsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

type QueryBranchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

type QueryChallengeArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

type QueryChallengeTypesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

type QueryChallengesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  challengeFromDate?: InputMaybe<Scalars["Date"]["input"]>;
  challengeTypeIds?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  datePublished?: InputMaybe<Scalars["Date"]["input"]>;
  filterCompanyChallenges?: InputMaybe<Scalars["Boolean"]["input"]>;
  filterTalentChallenges?: InputMaybe<Scalars["Boolean"]["input"]>;
  filterUniversityChallenges?: InputMaybe<Scalars["Boolean"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  keywordIds?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  teamSize?: InputMaybe<Scalars["Int"]["input"]>;
  textSearch?: InputMaybe<Scalars["String"]["input"]>;
};

type QueryCompanyArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

type QueryCulturalFitsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

type QueryFaqCategoriesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

type QueryJobPostingArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

type QueryJobPostingsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

type QueryJobRequirementsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

type QueryJobTypesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

type QueryKeywordsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

type QueryLanguageLevelsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

type QueryLanguagesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  shortList?: InputMaybe<Scalars["Boolean"]["input"]>;
};

type QueryMatchesArgs = {
  challengeMatching?: InputMaybe<ChallengeMatchingInput>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  jobPostingMatching?: InputMaybe<JobPostingMatchingInput>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  softBoost?: InputMaybe<Scalars["Int"]["input"]>;
  studentMatching?: InputMaybe<StudentMatchingInput>;
  techBoost?: InputMaybe<Scalars["Int"]["input"]>;
};

type QueryNodeArgs = {
  id: Scalars["ID"]["input"];
};

type QuerySkillsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

type QuerySoftSkillsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

type QueryStudentArgs = {
  jobPostingId?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

type QueryVerifyPasswordResetTokenArgs = {
  token: Scalars["String"]["input"];
};

type QueryZipCityJobsArgs = {
  branchId?: InputMaybe<Scalars["String"]["input"]>;
  jobTypeId?: InputMaybe<Scalars["String"]["input"]>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
type RefreshToken = {
  __typename?: "RefreshToken";
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  payload: Scalars["GenericScalar"]["output"];
  refreshExpiresIn: Scalars["Int"]["output"];
  refreshToken: Scalars["String"]["output"];
  success?: Maybe<Scalars["Boolean"]["output"]>;
  token: Scalars["String"]["output"];
};

/** Creates a new user with company */
type RegisterCompany = {
  __typename?: "RegisterCompany";
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type RegisterCompanyInput = {
  /** City */
  city?: InputMaybe<Scalars["String"]["input"]>;
  /** Name */
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** UID */
  uid?: InputMaybe<Scalars["String"]["input"]>;
  /** ZIP */
  zip?: InputMaybe<Scalars["String"]["input"]>;
};

/** Creates a new user as student */
type RegisterStudent = {
  __typename?: "RegisterStudent";
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type RegisterStudentInput = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  /** Mobile */
  mobile: Scalars["String"]["input"];
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
type ResendActivationEmail = {
  __typename?: "ResendActivationEmail";
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type Revoke = {
  __typename?: "Revoke";
  revoked: Scalars["Int"]["output"];
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
type SendPasswordResetEmail = {
  __typename?: "SendPasswordResetEmail";
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type Skill = Node & {
  __typename?: "Skill";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

type SkillConnection = {
  __typename?: "SkillConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<SkillEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

type SkillConnectionsConnection = {
  __typename?: "SkillConnectionsConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<SkillConnectionsEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `SkillConnections` and its cursor. */
type SkillConnectionsEdge = {
  __typename?: "SkillConnectionsEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<Skill>;
};

/** A Relay edge containing a `Skill` and its cursor. */
type SkillEdge = {
  __typename?: "SkillEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<Skill>;
};

type SkillInput = {
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

type SoftSkill = Node & {
  __typename?: "SoftSkill";
  company: Scalars["String"]["output"];
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  student: Scalars["String"]["output"];
};

type SoftSkillConnection = {
  __typename?: "SoftSkillConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<SoftSkillEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

type SoftSkillConnectionsConnection = {
  __typename?: "SoftSkillConnectionsConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<SoftSkillConnectionsEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `SoftSkillConnections` and its cursor. */
type SoftSkillConnectionsEdge = {
  __typename?: "SoftSkillConnectionsEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<SoftSkill>;
};

/** A Relay edge containing a `SoftSkill` and its cursor. */
type SoftSkillEdge = {
  __typename?: "SoftSkillEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<SoftSkill>;
};

type SoftSkillInput = {
  id: Scalars["String"]["input"];
};

type Student = Node & {
  __typename?: "Student";
  branch?: Maybe<Branch>;
  challenges: Array<Challenge>;
  city?: Maybe<Scalars["String"]["output"]>;
  culturalFits: CulturalFitConnection;
  dateOfBirth?: Maybe<Scalars["String"]["output"]>;
  distinction?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  fieldOfStudy?: Maybe<Scalars["String"]["output"]>;
  firstName?: Maybe<Scalars["String"]["output"]>;
  graduation?: Maybe<Scalars["String"]["output"]>;
  hobbies?: Maybe<Array<Hobby>>;
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  isMatchable: Scalars["Boolean"]["output"];
  jobFromDate?: Maybe<Scalars["Date"]["output"]>;
  jobToDate?: Maybe<Scalars["Date"]["output"]>;
  jobType?: Maybe<JobType>;
  languages: UserLanguageRelationConnection;
  lastName?: Maybe<Scalars["String"]["output"]>;
  matchStatus?: Maybe<MatchStatus>;
  mobile?: Maybe<Scalars["String"]["output"]>;
  nickname?: Maybe<Scalars["String"]["output"]>;
  onlineChallenges?: Maybe<Array<OnlineChallenge>>;
  schoolName?: Maybe<Scalars["String"]["output"]>;
  skills: SkillConnection;
  slug: Scalars["String"]["output"];
  softSkills: SoftSkillConnection;
  state: ProfileState;
  street?: Maybe<Scalars["String"]["output"]>;
  zip?: Maybe<Scalars["String"]["output"]>;
};

type StudentCulturalFitsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

type StudentLanguagesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

type StudentSkillsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

type StudentSoftSkillsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

type StudentInput = {
  id: Scalars["String"]["input"];
};

type StudentMatchingInput = {
  jobPosting: JobPostingInput;
};

type StudentProfileAbilitiesInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** Distinction */
  distinction?: InputMaybe<Scalars["String"]["input"]>;
  /** Hobbies */
  hobbies?: InputMaybe<Array<InputMaybe<HobbyInput>>>;
  /** Languages */
  languages?: InputMaybe<Array<InputMaybe<UserLanguageRelationInput>>>;
  /** Online_Challenges */
  onlineChallenges?: InputMaybe<Array<InputMaybe<OnlineChallengeInput>>>;
  /** Skills */
  skills?: InputMaybe<Array<InputMaybe<SkillInput>>>;
};

/** Updates the profile of a student */
type StudentProfileAbilitiesPayload = {
  __typename?: "StudentProfileAbilitiesPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type StudentProfileBaseDataInput = {
  /** City */
  city?: InputMaybe<Scalars["String"]["input"]>;
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** Date of birth */
  dateOfBirth?: InputMaybe<Scalars["String"]["input"]>;
  /** First name */
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  /** Last name */
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  /** Date of birth */
  mobile?: InputMaybe<Scalars["String"]["input"]>;
  /** street */
  street?: InputMaybe<Scalars["String"]["input"]>;
  /** Zip */
  zip?: InputMaybe<Scalars["String"]["input"]>;
};

/** Updates the profile of a student */
type StudentProfileBaseDataPayload = {
  __typename?: "StudentProfileBaseDataPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type StudentProfileCharacterInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  culturalFits?: InputMaybe<Array<InputMaybe<CulturalFitInput>>>;
  softSkills?: InputMaybe<Array<InputMaybe<SoftSkillInput>>>;
};

/** Updates soft skills and cultural fits of a student */
type StudentProfileCharacterPayload = {
  __typename?: "StudentProfileCharacterPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type StudentProfileConditionInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** State */
  state: Scalars["String"]["input"];
};

/** Updates the state of a student */
type StudentProfileConditionPayload = {
  __typename?: "StudentProfileConditionPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type StudentProfileEmploymentInput = {
  branch?: InputMaybe<BranchInput>;
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  jobFromDate?: InputMaybe<Scalars["String"]["input"]>;
  jobToDate?: InputMaybe<Scalars["String"]["input"]>;
  jobType?: InputMaybe<JobTypeInput>;
};

/** Updates job option, date (start or range) and branch of a student */
type StudentProfileEmploymentPayload = {
  __typename?: "StudentProfileEmploymentPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type StudentProfileSpecificDataInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** Nickname */
  nickname?: InputMaybe<Scalars["String"]["input"]>;
};

/** Updates the nickname of a student */
type StudentProfileSpecificDataPayload = {
  __typename?: "StudentProfileSpecificDataPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  nicknameSuggestions?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type UniversityProfileBaseDataInput = {
  /** City */
  city?: InputMaybe<Scalars["String"]["input"]>;
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** First name */
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  /** Last name */
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  /** Name */
  name: Scalars["String"]["input"];
  /** Phone Number */
  phone?: InputMaybe<Scalars["String"]["input"]>;
  /** role */
  role?: InputMaybe<Scalars["String"]["input"]>;
  /** Street */
  street?: InputMaybe<Scalars["String"]["input"]>;
  /** description */
  topLevelOrganisationDescription?: InputMaybe<Scalars["String"]["input"]>;
  /** website dachorganisation */
  topLevelOrganisationWebsite?: InputMaybe<Scalars["String"]["input"]>;
  /** website */
  website?: InputMaybe<Scalars["String"]["input"]>;
  /** Zip */
  zip?: InputMaybe<Scalars["String"]["input"]>;
};

/** Updates the profile of a university */
type UniversityProfileBaseDataPayload = {
  __typename?: "UniversityProfileBaseDataPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type UniversityProfileRelationsInput = {
  /** Benefits */
  benefits?: InputMaybe<Array<InputMaybe<BenefitInput>>>;
  /** Branches */
  branches?: InputMaybe<Array<InputMaybe<BranchInput>>>;
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** website challenges */
  linkChallenges?: InputMaybe<Scalars["String"]["input"]>;
  /** website education */
  linkEducation?: InputMaybe<Scalars["String"]["input"]>;
  /** website thesis */
  linkThesis?: InputMaybe<Scalars["String"]["input"]>;
  /** services */
  services?: InputMaybe<Scalars["String"]["input"]>;
};

/** Updates website services */
type UniversityProfileRelationsPayload = {
  __typename?: "UniversityProfileRelationsPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type UniversityProfileSpecificDataInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** description */
  description?: InputMaybe<Scalars["String"]["input"]>;
};

/** Updates branches and description */
type UniversityProfileSpecificDataPayload = {
  __typename?: "UniversityProfileSpecificDataPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type UniversityProfileValuesInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** Cultural Fit */
  culturalFits?: InputMaybe<Array<InputMaybe<CulturalFitInput>>>;
  /** Soft Skills */
  softSkills?: InputMaybe<Array<InputMaybe<SoftSkillInput>>>;
};

/** Updates a company profile with soft skills and cultural fit */
type UniversityProfileValuesPayload = {
  __typename?: "UniversityProfileValuesPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type UpdateCompanyMutationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  state?: InputMaybe<ProfileState>;
};

/** Updates company information */
type UpdateCompanyMutationPayload = {
  __typename?: "UpdateCompanyMutationPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  company?: Maybe<Company>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type UpdateStudentMutationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  isMatchable?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** Updates student information */
type UpdateStudentMutationPayload = {
  __typename?: "UpdateStudentMutationPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  student?: Maybe<Student>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type UpdateUserMutationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
};

/** Updates user information */
type UpdateUserMutationPayload = {
  __typename?: "UpdateUserMutationPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
  user?: Maybe<User>;
};

type UploadConfiguration = {
  __typename?: "UploadConfiguration";
  contentTypesConfiguration: Array<UploadTypeConfiguration>;
  key: AttachmentKey;
  maxFiles: Scalars["Int"]["output"];
};

type UploadTypeConfiguration = {
  __typename?: "UploadTypeConfiguration";
  contentTypes: Array<Scalars["String"]["output"]>;
  maxSize: Scalars["Int"]["output"];
};

type User = Node & {
  __typename?: "User";
  company?: Maybe<Company>;
  dateJoined: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  employee?: Maybe<Employee>;
  firstName: Scalars["String"]["output"];
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars["Boolean"]["output"];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars["Boolean"]["output"];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars["Boolean"]["output"];
  lastLogin?: Maybe<Scalars["DateTime"]["output"]>;
  lastName: Scalars["String"]["output"];
  password: Scalars["String"]["output"];
  student?: Maybe<Student>;
  type: ProfileType;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"]["output"];
};

type UserLanguageRelation = Node & {
  __typename?: "UserLanguageRelation";
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  language: Language;
  languageLevel: LanguageLevel;
};

type UserLanguageRelationConnection = {
  __typename?: "UserLanguageRelationConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserLanguageRelationEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `UserLanguageRelation` and its cursor. */
type UserLanguageRelationEdge = {
  __typename?: "UserLanguageRelationEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<UserLanguageRelation>;
};

type UserLanguageRelationInput = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  language?: InputMaybe<Scalars["String"]["input"]>;
  languageLevel?: InputMaybe<Scalars["String"]["input"]>;
};

type UserNode = Node & {
  __typename?: "UserNode";
  archived?: Maybe<Scalars["Boolean"]["output"]>;
  company?: Maybe<Company>;
  email: Scalars["String"]["output"];
  employee?: Maybe<Employee>;
  firstName: Scalars["String"]["output"];
  /** The ID of the object */
  id: Scalars["ID"]["output"];
  lastName: Scalars["String"]["output"];
  pk?: Maybe<Scalars["Int"]["output"]>;
  secondaryEmail?: Maybe<Scalars["String"]["output"]>;
  student?: Maybe<Student>;
  type: DbUserTypeChoices;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"]["output"];
  verified?: Maybe<Scalars["Boolean"]["output"]>;
};

type UserRequestInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  /** E-Mail */
  email: Scalars["String"]["input"];
  /** Message */
  message: Scalars["String"]["input"];
  /** Name */
  name: Scalars["String"]["input"];
};

/** Creates a new user user request */
type UserRequestPayload = {
  __typename?: "UserRequestPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type UserUploadInput = {
  challenge?: InputMaybe<ChallengeInput>;
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  file: Scalars["Upload"]["input"];
  key: AttachmentKey;
};

type UserUploadPayload = {
  __typename?: "UserUploadPayload";
  attachment?: Maybe<Attachment>;
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

/**
 * Verify user account.
 *
 * Receive the token that was sent by email.
 * If the token is valid, make the user verified
 * by making the `user.status.verified` field true.
 */
type VerifyAccount = {
  __typename?: "VerifyAccount";
  errors?: Maybe<Scalars["ExpectedErrorType"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

type ZipCity = {
  __typename?: "ZipCity";
  canton: Scalars["String"]["output"];
  city: Scalars["String"]["output"];
  zip: Scalars["String"]["output"];
};

declare module "*/addEmployee.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const addEmployee: DocumentNode;

  export default defaultDocument;
}

declare module "*/challengeAllocation.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const challengeAllocation: DocumentNode;

  export default defaultDocument;
}

declare module "*/challengeBaseData.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const challengeBaseData: DocumentNode;

  export default defaultDocument;
}

declare module "*/challengeSpecificData.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const challengeSpecificData: DocumentNode;

  export default defaultDocument;
}

declare module "*/companyProfileAdvantages.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const companyProfileAdvantages: DocumentNode;

  export default defaultDocument;
}

declare module "*/companyProfileBaseData.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const companyProfileBaseData: DocumentNode;

  export default defaultDocument;
}

declare module "*/companyProfileRelations.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const companyProfileRelations: DocumentNode;

  export default defaultDocument;
}

declare module "*/companyProfileValues.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const companyProfileValues: DocumentNode;

  export default defaultDocument;
}

declare module "*/deleteAttachment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const deleteAttachment: DocumentNode;

  export default defaultDocument;
}

declare module "*/deleteChallenge.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const deleteChallenge: DocumentNode;

  export default defaultDocument;
}

declare module "*/deleteEmployee.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const deleteEmployee: DocumentNode;

  export default defaultDocument;
}

declare module "*/deleteJobPosting.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const deleteJobPosting: DocumentNode;

  export default defaultDocument;
}

declare module "*/deleteUser.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const deleteUser: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobPostingAllocation.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const jobPostingAllocation: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobPostingBaseData.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const jobPostingBaseData: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobPostingRequirements.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const jobPostingRequirements: DocumentNode;

  export default defaultDocument;
}

declare module "*/logout.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const logout: DocumentNode;

  export default defaultDocument;
}

declare module "*/matchChallenge.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const matchChallenge: DocumentNode;

  export default defaultDocument;
}

declare module "*/matchJobPosting.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const matchJobPosting: DocumentNode;

  export default defaultDocument;
}

declare module "*/matchStudent.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const matchStudent: DocumentNode;

  export default defaultDocument;
}

declare module "*/passwordChange.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const PasswordChange: DocumentNode;

  export default defaultDocument;
}

declare module "*/passwordReset.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const passwordReset: DocumentNode;

  export default defaultDocument;
}

declare module "*/refreshToken.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const refreshToken: DocumentNode;

  export default defaultDocument;
}

declare module "*/registerCompany.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const registerCompany: DocumentNode;

  export default defaultDocument;
}

declare module "*/registerStudent.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const registerStudent: DocumentNode;

  export default defaultDocument;
}

declare module "*/revokeToken.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const revokeToken: DocumentNode;

  export default defaultDocument;
}

declare module "*/sendPasswordResetEmail.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const sendPasswordResetEmail: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentProfileAbilities.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const studentProfileAbilities: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentProfileBaseData.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const studentProfileBaseData: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentProfileCharacter.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const studentProfileCharacter: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentProfileCondition.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const studentProfileCondition: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentProfileEmployment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const studentProfileEmployment: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentProfileSpecificData.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const studentProfileSpecificData: DocumentNode;

  export default defaultDocument;
}

declare module "*/tokenAuth.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const tokenAuth: DocumentNode;

  export default defaultDocument;
}

declare module "*/universityProfileBaseData.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const universityProfileBaseData: DocumentNode;

  export default defaultDocument;
}

declare module "*/universityProfileRelations.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const universityProfileRelations: DocumentNode;

  export default defaultDocument;
}

declare module "*/universityProfileSpecificData.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const universityProfileSpecificData: DocumentNode;

  export default defaultDocument;
}

declare module "*/universityProfileValues.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const universityProfileValues: DocumentNode;

  export default defaultDocument;
}

declare module "*/updateStudent.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const UpdateStudent: DocumentNode;

  export default defaultDocument;
}

declare module "*/updateUser.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const UpdateUser: DocumentNode;

  export default defaultDocument;
}

declare module "*/upload.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const upload: DocumentNode;

  export default defaultDocument;
}

declare module "*/uploadChallenge.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const uploadChallenge: DocumentNode;

  export default defaultDocument;
}

declare module "*/userRequest.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const userRequest: DocumentNode;

  export default defaultDocument;
}

declare module "*/verifyAccount.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const verifyAccount: DocumentNode;

  export default defaultDocument;
}

declare module "*/attachments.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const attachments: DocumentNode;

  export default defaultDocument;
}

declare module "*/attachmentsChallenge.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const attachmentsChallenge: DocumentNode;

  export default defaultDocument;
}

declare module "*/benefits.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const benefits: DocumentNode;

  export default defaultDocument;
}

declare module "*/branches.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const branches: DocumentNode;

  export default defaultDocument;
}

declare module "*/challenge.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const challenge: DocumentNode;

  export default defaultDocument;
}

declare module "*/challengeFragment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const challengeChallenge: DocumentNode;
  export const challengeImage: DocumentNode;
  export const challengeImageFallback: DocumentNode;
  export const challengeDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/challengePublic.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const challengePublic: DocumentNode;

  export default defaultDocument;
}

declare module "*/challengeTypes.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const challengeTypes: DocumentNode;

  export default defaultDocument;
}

declare module "*/challengeTypesFragment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const challengeTypesChallengeType: DocumentNode;

  export default defaultDocument;
}

declare module "*/challenges.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const challenges: DocumentNode;

  export default defaultDocument;
}

declare module "*/challengesFragment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const challengesChallenge: DocumentNode;

  export default defaultDocument;
}

declare module "*/company.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const company: DocumentNode;

  export default defaultDocument;
}

declare module "*/companyMatching.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const companyMatching: DocumentNode;

  export default defaultDocument;
}

declare module "*/culturalFits.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const culturalFits: DocumentNode;

  export default defaultDocument;
}

declare module "*/dashboard.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const dashboardStudent: DocumentNode;
  export const dashboardCompany: DocumentNode;
  export const dashboardChallenge: DocumentNode;
  export const dashboardJobPosting: DocumentNode;
  export const dashboard: DocumentNode;

  export default defaultDocument;
}

declare module "*/employees.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const employees: DocumentNode;

  export default defaultDocument;
}

declare module "*/employeesFragment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const employeesEmployee: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobPosting.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const jobPosting: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobPostingFragment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const jobPostingJobPosting: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobPostings.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const jobPostings: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobPostingsFragment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const jobPostingsJobPosting: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobRequirements.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const jobRequirements: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobTypes.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const jobTypes: DocumentNode;

  export default defaultDocument;
}

declare module "*/keywords.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const keywords: DocumentNode;

  export default defaultDocument;
}

declare module "*/keywordsFragment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const keywordsKeyword: DocumentNode;

  export default defaultDocument;
}

declare module "*/languageLevels.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const languageLevels: DocumentNode;

  export default defaultDocument;
}

declare module "*/languages.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const languages: DocumentNode;

  export default defaultDocument;
}

declare module "*/matching.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const matching: DocumentNode;

  export default defaultDocument;
}

declare module "*/me.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const me: DocumentNode;

  export default defaultDocument;
}

declare module "*/skills.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const skills: DocumentNode;

  export default defaultDocument;
}

declare module "*/softSkills.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const softSkills: DocumentNode;

  export default defaultDocument;
}

declare module "*/student.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const student: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentFragment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const studentStudent: DocumentNode;
  export const studentAvatar: DocumentNode;
  export const studentAvatarFallback: DocumentNode;
  export const studentCertificates: DocumentNode;

  export default defaultDocument;
}

declare module "*/uploadConfigurations.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const uploadConfigurations: DocumentNode;

  export default defaultDocument;
}

declare module "*/userFragment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const MeUser: DocumentNode;

  export default defaultDocument;
}

declare module "*/verifyPasswordResetToken.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const verifyPasswordResetToken: DocumentNode;

  export default defaultDocument;
}

declare module "*/zipCity.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const zipCity: DocumentNode;

  export default defaultDocument;
}

declare module "*/zipCityFragment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const zipCityZipCity: DocumentNode;

  export default defaultDocument;
}

declare module "*/zipCityJobs.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const zipCityJobs: DocumentNode;

  export default defaultDocument;
}

export const ChallengeChallenge = gql`
  fragment challengeChallenge on Challenge {
    id
    slug
    title
    displayTitle
    description
    teamSize
    compensation
    formStep
    state
    challengeFromDate
    datePublished
    website
    matchStatus {
      initiator
      confirmed
    }
    keywords {
      id
      name
    }
    challengeType {
      id
      name
    }
    keywords {
      id
      name
    }
    company {
      id
      slug
      name
      street
      zip
      city
    }
    student {
      id
      slug
      firstName
      lastName
      nickname
      city
    }
    employee {
      id
      firstName
      lastName
      email
      phone
      role
    }
  }
`;
export const ChallengeImage = gql`
  fragment challengeImage on Attachment {
    id
    fileName
    url
    mimeType
  }
`;
export const ChallengeImageFallback = gql`
  fragment challengeImageFallback on Attachment {
    id
    fileName
    url
    mimeType
  }
`;
export const ChallengeDocument = gql`
  fragment challengeDocument on Attachment {
    id
    fileName
    url
    mimeType
  }
`;
export const ChallengeTypesChallengeType = gql`
  fragment challengeTypesChallengeType on ChallengeType {
    id
    name
  }
`;
export const ChallengesChallenge = gql`
  fragment challengesChallenge on Challenge {
    id
    title
    slug
    challengeType {
      id
      name
    }
    keywords {
      id
      name
    }
    description
    teamSize
    compensation
    website
    challengeFromDate
    employee {
      id
      firstName
      lastName
      role
      email
      phone
    }
    student {
      id
    }
    company {
      id
    }
    formStep
    state
    dateCreated
    datePublished
    avatarUrl
  }
`;
export const DashboardCompany = gql`
  fragment dashboardCompany on Company {
    id
    name
    city
    zip
    slug
  }
`;
export const DashboardStudent = gql`
  fragment dashboardStudent on Student {
    id
    nickname
    firstName
    lastName
    slug
    zip
  }
`;
export const DashboardChallenge = gql`
  fragment dashboardChallenge on Challenge {
    id
    title
    displayTitle
    datePublished
    dateCreated
    slug
    state
    keywords {
      id
      name
    }
    challengeType {
      id
      name
    }
    company {
      ...dashboardCompany
    }
    student {
      ...dashboardStudent
    }
  }
  ${DashboardCompany}
  ${DashboardStudent}
`;
export const DashboardJobPosting = gql`
  fragment dashboardJobPosting on JobPosting {
    id
    title
    displayTitle
    datePublished
    dateCreated
    slug
    state
    company {
      ...dashboardCompany
    }
  }
  ${DashboardCompany}
`;
export const EmployeesEmployee = gql`
  fragment employeesEmployee on Employee {
    id
    role
    firstName
    lastName
    phone
    email
  }
`;
export const JobPostingJobPosting = gql`
  fragment jobPostingJobPosting on JobPosting {
    id
    title
    displayTitle
    description
    jobFromDate
    jobToDate
    datePublished
    url
    workloadFrom
    workloadTo
    formStep
    state
    matchStatus {
      initiator
      confirmed
    }
    company {
      id
      slug
      name
      street
      zip
      city
      type
    }
    jobType {
      id
      name
    }
    branches {
      id
      name
    }
    skills {
      id
      name
    }
    jobRequirements(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
    languages {
      id
      language {
        id
        name
      }
      languageLevel {
        id
        level
        description
      }
    }
    employee {
      id
      firstName
      lastName
      email
      phone
    }
  }
`;
export const JobPostingsJobPosting = gql`
  fragment jobPostingsJobPosting on JobPosting {
    id
    slug
    title
    displayTitle
  }
`;
export const KeywordsKeyword = gql`
  fragment keywordsKeyword on Keyword {
    id
    name
  }
`;
export const StudentAvatar = gql`
  fragment studentAvatar on Attachment {
    id
    url
    mimeType
  }
`;
export const StudentAvatarFallback = gql`
  fragment studentAvatarFallback on Attachment {
    id
    url
    mimeType
  }
`;
export const StudentCertificates = gql`
  fragment studentCertificates on Attachment {
    id
    url
    mimeType
    fileName
  }
`;
export const StudentStudent = gql`
  fragment studentStudent on Student {
    id
    email
    mobile
    slug
    state
    firstName
    lastName
    street
    zip
    city
    dateOfBirth
    nickname
    schoolName
    fieldOfStudy
    graduation
    distinction
    jobFromDate
    jobToDate
    isMatchable
    matchStatus {
      initiator
      confirmed
    }
    branch {
      name
      id
    }
    jobType {
      name
      id
      mode
    }
    skills(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
    softSkills(first: 100) {
      edges {
        node {
          id
          student
          company
        }
      }
    }
    culturalFits(first: 100) {
      edges {
        node {
          id
          company
          student
        }
      }
    }
    hobbies {
      id
      name
    }
    onlineChallenges {
      id
      url
    }
    languages(first: 100) {
      edges {
        node {
          id
          language {
            name
            id
          }
          languageLevel {
            level
            id
          }
        }
      }
    }
    challenges {
      id
      title
      displayTitle
      slug
      keywords {
        id
        name
      }
      challengeType {
        id
        name
      }
    }
  }
`;
export const MeUser = gql`
  fragment MeUser on User {
    id
    firstName
    lastName
    username
    email
    type
    student {
      ...studentStudent
    }
    employee {
      id
      role
      firstName
      lastName
      phone
      email
    }
    company {
      id
      name
      displayName
      city
      zip
      street
      state
      description
      website
      memberItStGallen
      topLevelOrganisationWebsite
      topLevelOrganisationDescription
      services
      phone
      employees {
        firstName
        lastName
        email
        role
      }
      jobPostings {
        id
        slug
        title
        state
        jobType {
          id
          name
        }
      }
      challenges {
        id
        slug
        title
        state
        challengeType {
          id
          name
        }
        keywords {
          id
          name
        }
      }
      branches(first: 100) {
        edges {
          node {
            id
            name
          }
        }
      }
      benefits(first: 100) {
        edges {
          node {
            id
            icon
            name
          }
        }
      }
      culturalFits {
        id
      }
      softSkills {
        id
      }
      linkEducation
      linkChallenges
      linkThesis
    }
  }
  ${StudentStudent}
`;
export const ZipCityZipCity = gql`
  fragment zipCityZipCity on ZipCity {
    zip
    city
    canton
  }
`;
const AddEmployee = gql`
  mutation addEmployee($firstName: String!, $lastName: String!, $email: String!, $role: String!) {
    addEmployee(input: { firstName: $firstName, lastName: $lastName, email: $email, role: $role }) {
      success
      errors
      employee {
        id
        role
        firstName
        lastName
        email
      }
    }
  }
`;
const ChallengeAllocation = gql`
  mutation challengeAllocation($input: ChallengeAllocationInput!) {
    challengeAllocation(input: $input) {
      success
      errors
      challengeId
      slug
    }
  }
`;
const ChallengeBaseData = gql`
  mutation challengeBaseData($input: ChallengeBaseDataInput!) {
    challengeBaseData(input: $input) {
      success
      errors
      challengeId
      slug
    }
  }
`;
const ChallengeSpecificData = gql`
  mutation challengeSpecificData($input: ChallengeSpecificDataInput!) {
    challengeSpecificData(input: $input) {
      success
      errors
      challengeId
      slug
    }
  }
`;
const CompanyProfileAdvantages = gql`
  mutation companyProfileAdvantages($input: CompanyProfileAdvantagesInput!) {
    companyProfileAdvantages(input: $input) {
      success
      errors
    }
  }
`;
const CompanyProfileBaseData = gql`
  mutation companyProfileBaseData($input: CompanyProfileBaseDataInput!) {
    companyProfileBaseData(input: $input) {
      success
      errors
    }
  }
`;
const CompanyProfileRelations = gql`
  mutation companyProfileRelations($input: CompanyProfileRelationsInput!) {
    companyProfileRelations(input: $input) {
      success
      errors
    }
  }
`;
const CompanyProfileValues = gql`
  mutation companyProfileValues($input: CompanyProfileValuesInput!) {
    companyProfileValues(input: $input) {
      success
      errors
    }
  }
`;
const DeleteAttachment = gql`
  mutation deleteAttachment($id: String) {
    deleteAttachment(input: { id: $id }) {
      success
      errors
    }
  }
`;
const DeleteChallenge = gql`
  mutation deleteChallenge($id: String!) {
    deleteChallenge(input: { id: $id }) {
      success
      errors
    }
  }
`;
const DeleteEmployee = gql`
  mutation deleteEmployee($id: String!) {
    deleteEmployee(input: { id: $id }) {
      success
      errors
    }
  }
`;
const DeleteJobPosting = gql`
  mutation deleteJobPosting($id: String!) {
    deleteJobPosting(input: { id: $id }) {
      success
      errors
    }
  }
`;
const DeleteUser = gql`
  mutation deleteUser {
    deleteUser(input: {}) {
      clientMutationId
      success
      errors
    }
  }
`;
const JobPostingAllocation = gql`
  mutation jobPostingAllocation($input: JobPostingAllocationInput!) {
    jobPostingAllocation(input: $input) {
      success
      errors
      jobPostingId
      slug
    }
  }
`;
const JobPostingBaseData = gql`
  mutation jobPostingBaseData($input: JobPostingBaseDataInput!) {
    jobPostingBaseData(input: $input) {
      success
      errors
      jobPostingId
      slug
    }
  }
`;
const JobPostingRequirements = gql`
  mutation jobPostingRequirements($input: JobPostingRequirementsInput!) {
    jobPostingRequirements(input: $input) {
      success
      errors
      jobPostingId
      slug
    }
  }
`;
const Logout = gql`
  mutation logout {
    logout
  }
`;
const MatchChallenge = gql`
  mutation matchChallenge($challenge: ChallengeInput!) {
    matchChallenge(input: { challenge: $challenge }) {
      success
      errors
      confirmed
    }
  }
`;
const MatchJobPosting = gql`
  mutation matchJobPosting($jobPosting: JobPostingInput!) {
    matchJobPosting(input: { jobPosting: $jobPosting }) {
      success
      errors
      confirmed
    }
  }
`;
const MatchStudent = gql`
  mutation matchStudent($jobPosting: JobPostingInput!, $student: StudentInput!) {
    matchStudent(input: { jobPosting: $jobPosting, student: $student }) {
      success
      errors
      confirmed
    }
  }
`;
const PasswordChange = gql`
  mutation PasswordChange($oldPassword: String!, $newPassword1: String!, $newPassword2: String!) {
    passwordChange(
      oldPassword: $oldPassword
      newPassword1: $newPassword1
      newPassword2: $newPassword2
    ) {
      success
      errors
    }
  }
`;
const PasswordReset = gql`
  mutation passwordReset($token: String!, $password: String!) {
    passwordReset(token: $token, newPassword1: $password, newPassword2: $password) {
      success
      errors
    }
  }
`;
const RefreshToken = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      success
      errors
      token
      refreshToken
    }
  }
`;
const RegisterCompany = gql`
  mutation registerCompany(
    $name: String!
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $zip: String!
    $city: String!
    $uid: String
    $role: String!
    $type: String!
  ) {
    registerCompany(
      username: $email
      email: $email
      password1: $password
      password2: $password
      firstName: $firstName
      lastName: $lastName
      type: $type
      company: { name: $name, zip: $zip, city: $city, uid: $uid }
      employee: { role: $role }
    ) {
      success
      errors
    }
  }
`;
const RegisterStudent = gql`
  mutation registerStudent(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $type: String!
  ) {
    registerStudent(
      username: $email
      email: $email
      password1: $password
      password2: $password
      firstName: $firstName
      lastName: $lastName
      type: $type
    ) {
      success
      errors
    }
  }
`;
const RevokeToken = gql`
  mutation revokeToken {
    revokeToken(refreshToken: "refresh token") {
      revoked
    }
  }
`;
const SendPasswordResetEmail = gql`
  mutation sendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
      errors
    }
  }
`;
const StudentProfileAbilities = gql`
  mutation studentProfileAbilities($input: StudentProfileAbilitiesInput!) {
    studentProfileAbilities(input: $input) {
      success
      errors
    }
  }
`;
const StudentProfileBaseData = gql`
  mutation studentProfileBaseData($input: StudentProfileBaseDataInput!) {
    studentProfileBaseData(input: $input) {
      success
      errors
    }
  }
`;
const StudentProfileCharacter = gql`
  mutation studentProfileCharacter($input: StudentProfileCharacterInput!) {
    studentProfileCharacter(input: $input) {
      success
      errors
    }
  }
`;
const StudentProfileCondition = gql`
  mutation studentProfileCondition($input: StudentProfileConditionInput!) {
    studentProfileCondition(input: $input) {
      success
      errors
    }
  }
`;
const StudentProfileEmployment = gql`
  mutation studentProfileEmployment($input: StudentProfileEmploymentInput!) {
    studentProfileEmployment(input: $input) {
      success
      errors
    }
  }
`;
const StudentProfileSpecificData = gql`
  mutation studentProfileSpecificData($input: StudentProfileSpecificDataInput!) {
    studentProfileSpecificData(input: $input) {
      success
      errors
      nicknameSuggestions
    }
  }
`;
const TokenAuth = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      errors
      token
      refreshToken
      user {
        firstName
        lastName
        type
        email
      }
    }
  }
`;
const UniversityProfileBaseData = gql`
  mutation universityProfileBaseData($input: UniversityProfileBaseDataInput!) {
    universityProfileBaseData(input: $input) {
      success
      errors
    }
  }
`;
const UniversityProfileRelations = gql`
  mutation universityProfileRelations($input: UniversityProfileRelationsInput!) {
    universityProfileRelations(input: $input) {
      success
      errors
    }
  }
`;
const UniversityProfileSpecificData = gql`
  mutation universityProfileSpecificData($input: UniversityProfileSpecificDataInput!) {
    universityProfileSpecificData(input: $input) {
      success
      errors
    }
  }
`;
const UniversityProfileValues = gql`
  mutation universityProfileValues($input: UniversityProfileValuesInput!) {
    universityProfileValues(input: $input) {
      success
      errors
    }
  }
`;
const UpdateStudent = gql`
  mutation UpdateStudent($input: UpdateStudentMutationInput!) {
    updateStudent(input: $input) {
      success
      errors
    }
  }
`;
const UpdateUser = gql`
  mutation UpdateUser($input: UpdateUserMutationInput!) {
    updateUser(input: $input) {
      success
      errors
    }
  }
`;
const Upload = gql`
  mutation upload($file: Upload!, $key: AttachmentKey!) {
    upload(input: { file: $file, key: $key }) {
      success
      errors
    }
  }
`;
const UploadChallenge = gql`
  mutation uploadChallenge($file: Upload!, $key: AttachmentKey!, $challengeId: String!) {
    upload(input: { file: $file, key: $key, challenge: { id: $challengeId } }) {
      success
      errors
    }
  }
`;
const UserRequest = gql`
  mutation userRequest($name: String!, $email: String!, $message: String!) {
    userRequest(input: { name: $name, email: $email, message: $message }) {
      success
      errors
    }
  }
`;
const VerifyAccount = gql`
  mutation verifyAccount($token: String!) {
    verifyAccount(token: $token) {
      success
      errors
    }
  }
`;
const Attachments = gql`
  query attachments($key: AttachmentKey!) {
    attachments(key: $key, first: 100) {
      edges {
        node {
          id
          fileSize
          fileName
          mimeType
          url
        }
      }
    }
  }
`;
const AttachmentsChallenge = gql`
  query attachmentsChallenge($key: AttachmentKey!, $id: String!) {
    attachments(key: $key, id: $id, first: 100) {
      edges {
        node {
          id
          fileSize
          fileName
          mimeType
          url
        }
      }
    }
  }
`;
const Benefits = gql`
  query benefits {
    benefits(first: 100) {
      edges {
        node {
          id
          icon
          name
        }
      }
    }
  }
`;
const Branches = gql`
  query branches {
    branches(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const Challenge = gql`
  query challenge($id: String, $slug: String) {
    challenge(id: $id, slug: $slug) {
      ...challengeChallenge
    }
    images: attachments(key: CHALLENGE_IMAGES, slug: $slug, first: 100) {
      edges {
        node {
          ...challengeImage
        }
      }
    }
    imageFallback: attachments(key: CHALLENGE_FALLBACK, slug: $slug, first: 100) {
      edges {
        node {
          ...challengeImageFallback
        }
      }
    }
    documents: attachments(key: CHALLENGE_DOCUMENTS, slug: $slug, first: 100) {
      edges {
        node {
          ...challengeDocument
        }
      }
    }
  }
  ${ChallengeChallenge}
  ${ChallengeImage}
  ${ChallengeImageFallback}
  ${ChallengeDocument}
`;
const ChallengePublic = gql`
  query challengePublic($id: String, $slug: String) {
    challenge(id: $id, slug: $slug) {
      ...challengeChallenge
    }
  }
  ${ChallengeChallenge}
`;
const ChallengeTypes = gql`
  query challengeTypes {
    challengeTypes(first: 100) {
      edges {
        node {
          ...challengeTypesChallengeType
        }
      }
    }
  }
  ${ChallengeTypesChallengeType}
`;
const Challenges = gql`
  query challenges(
    $textSearch: String
    $challengeTypeIds: [String]
    $keywordIds: [String]
    $filterTalentChallenges: Boolean
    $filterCompanyChallenges: Boolean
    $filterUniversityChallenges: Boolean
  ) {
    challenges(
      first: 1000
      textSearch: $textSearch
      challengeTypeIds: $challengeTypeIds
      keywordIds: $keywordIds
      filterTalentChallenges: $filterTalentChallenges
      filterCompanyChallenges: $filterCompanyChallenges
      filterUniversityChallenges: $filterUniversityChallenges
    ) {
      edges {
        node {
          ...challengesChallenge
        }
      }
    }
  }
  ${ChallengesChallenge}
`;
const Company = gql`
  query company($slug: String) {
    company(slug: $slug) {
      id
      uid
      name
      description
      services
      street
      zip
      city
      phone
      website
      linkEducation
      linkChallenges
      linkThesis
      topLevelOrganisationDescription
      topLevelOrganisationWebsite
      employees {
        id
        firstName
        lastName
        email
        role
      }
      benefits(first: 100) {
        edges {
          node {
            id
            icon
            name
          }
        }
      }
      branches(first: 100) {
        edges {
          node {
            id
            name
          }
        }
      }
      jobPostings {
        id
        title
        displayTitle
        jobType {
          id
          name
        }
        slug
      }
      challenges {
        id
        title
        displayTitle
        slug
        keywords {
          id
          name
        }
        challengeType {
          id
          name
        }
      }
    }
    logo: attachments(key: COMPANY_AVATAR, slug: $slug, first: 100) {
      edges {
        node {
          id
          url
          mimeType
        }
      }
    }
    logoFallback: attachments(key: COMPANY_AVATAR_FALLBACK, slug: $slug, first: 100) {
      edges {
        node {
          id
          url
          mimeType
        }
      }
    }
    media: attachments(key: COMPANY_DOCUMENTS, slug: $slug, first: 100) {
      edges {
        node {
          id
          url
          mimeType
        }
      }
    }
  }
`;
const CompanyMatching = gql`
  query companyMatching {
    matches(techBoost: 3, softBoost: 3) {
      id
      name
      avatar
      type
      slug
      score
      rawScore
      title
      type
      matchStatus {
        confirmed
        initiator
      }
    }
  }
`;
const CulturalFits = gql`
  query culturalFits {
    culturalFits(first: 100) {
      edges {
        node {
          id
          company
          student
        }
      }
    }
  }
`;
const Dashboard = gql`
  query dashboard {
    dashboard {
      challenges {
        ...dashboardChallenge
      }
      challengeMatches {
        challenge {
          ...dashboardChallenge
        }
        student {
          ...dashboardStudent
        }
        company {
          ...dashboardCompany
        }
      }
      latestChallenges {
        ...dashboardChallenge
      }
      latestJobPostings {
        ...dashboardJobPosting
      }
      jobPostings {
        ...dashboardJobPosting
      }
      requestedMatches {
        jobPosting {
          ...dashboardJobPosting
        }
        student {
          ...dashboardStudent
        }
      }
      unconfirmedMatches {
        jobPosting {
          ...dashboardJobPosting
        }
        student {
          ...dashboardStudent
        }
      }
      confirmedMatches {
        jobPosting {
          ...dashboardJobPosting
        }
        student {
          ...dashboardStudent
        }
      }
    }
  }
  ${DashboardChallenge}
  ${DashboardStudent}
  ${DashboardCompany}
  ${DashboardJobPosting}
`;
const Employees = gql`
  query employees {
    me {
      company {
        employees {
          ...employeesEmployee
        }
      }
    }
  }
  ${EmployeesEmployee}
`;
const JobPosting = gql`
  query jobPosting($id: String, $slug: String) {
    jobPosting(id: $id, slug: $slug) {
      ...jobPostingJobPosting
    }
  }
  ${JobPostingJobPosting}
`;
const JobPostings = gql`
  query jobPostings {
    jobPostings(first: 100) {
      edges {
        node {
          ...jobPostingsJobPosting
        }
      }
    }
  }
  ${JobPostingsJobPosting}
`;
const JobRequirements = gql`
  query jobRequirements {
    jobRequirements(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const JobTypes = gql`
  query jobTypes {
    jobTypes(first: 100) {
      edges {
        node {
          id
          name
          mode
        }
      }
    }
  }
`;
const Keywords = gql`
  query keywords {
    keywords(first: 2000) {
      edges {
        node {
          ...keywordsKeyword
        }
      }
    }
  }
  ${KeywordsKeyword}
`;
const LanguageLevels = gql`
  query languageLevels {
    languageLevels(first: 100) {
      edges {
        node {
          id
          level
          description
        }
      }
    }
  }
`;
const Languages = gql`
  query languages($shortList: Boolean) {
    languages(shortList: $shortList, first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const Matching = gql`
  query matching(
    $studentMatchingInput: StudentMatchingInput
    $jobPostingMatchingInput: JobPostingMatchingInput
    $challengeMatchingInput: ChallengeMatchingInput
    $softBoost: Int!
    $techBoost: Int!
    $first: Int
    $skip: Int
  ) {
    matches(
      studentMatching: $studentMatchingInput
      jobPostingMatching: $jobPostingMatchingInput
      challengeMatching: $challengeMatchingInput
      first: $first
      skip: $skip
      softBoost: $softBoost
      techBoost: $techBoost
    ) {
      name
      title
      description
      keywords {
        id
        name
      }
      avatar
      type
      slug
      score
      rawScore
      matchStatus {
        confirmed
        initiator
      }
    }
  }
`;
const Me = gql`
  query me {
    me {
      id
      firstName
      lastName
      username
      email
      type
      student {
        ...studentStudent
      }
      employee {
        id
        role
        firstName
        lastName
        phone
        email
      }
      company {
        id
        name
        displayName
        city
        zip
        street
        state
        description
        website
        memberItStGallen
        topLevelOrganisationWebsite
        topLevelOrganisationDescription
        services
        phone
        employees {
          firstName
          lastName
          email
          role
        }
        jobPostings {
          id
          slug
          title
          state
          jobType {
            id
            name
          }
        }
        challenges {
          id
          slug
          title
          state
          challengeType {
            id
            name
          }
          keywords {
            id
            name
          }
        }
        branches(first: 100) {
          edges {
            node {
              id
              name
            }
          }
        }
        benefits(first: 100) {
          edges {
            node {
              id
              icon
              name
            }
          }
        }
        culturalFits {
          id
        }
        softSkills {
          id
        }
        linkEducation
        linkChallenges
        linkThesis
      }
    }
  }
  ${StudentStudent}
`;
const Skills = gql`
  query skills {
    skills(first: 2000) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const SoftSkills = gql`
  query softSkills {
    softSkills(first: 100) {
      edges {
        node {
          id
          company
          student
        }
      }
    }
  }
`;
const Student = gql`
  query student($slug: String!, $jobPostingId: String) {
    student(slug: $slug, jobPostingId: $jobPostingId) {
      ...studentStudent
    }
    avatar: attachments(key: STUDENT_AVATAR, slug: $slug, first: 100) {
      edges {
        node {
          ...studentAvatar
        }
      }
    }
    avatarFallback: attachments(key: STUDENT_AVATAR_FALLBACK, slug: $slug, first: 100) {
      edges {
        node {
          ...studentAvatarFallback
        }
      }
    }
    certificates: attachments(key: STUDENT_DOCUMENTS, slug: $slug, first: 100) {
      edges {
        node {
          ...studentCertificates
        }
      }
    }
  }
  ${StudentStudent}
  ${StudentAvatar}
  ${StudentAvatarFallback}
  ${StudentCertificates}
`;
const UploadConfigurations = gql`
  query uploadConfigurations {
    uploadConfigurations {
      key
      contentTypesConfiguration {
        contentTypes
        maxSize
      }
      maxFiles
    }
  }
`;
const VerifyPasswordResetToken = gql`
  query verifyPasswordResetToken($token: String!) {
    verifyPasswordResetToken(token: $token)
  }
`;
const ZipCity = gql`
  query zipCity {
    zipCity {
      ...zipCityZipCity
    }
  }
  ${ZipCityZipCity}
`;
const ZipCityJobs = gql`
  query zipCityJobs($branchId: String, $jobTypeId: String) {
    zipCityJobs(branchId: $branchId, jobTypeId: $jobTypeId) {
      zip
      city
      canton
    }
  }
`;
