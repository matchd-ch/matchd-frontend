import gql from "graphql-tag";
type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   *
   *     Errors messages and codes mapped to
   *     fields or non fields errors.
   *     Example:
   *     {
   *         field_name: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         other_field: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         nonFieldErrors: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ]
   *     }
   *
   */
  ExpectedErrorType: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

/** Adds a new emplyoee to a company */
type AddEmployee = {
  __typename?: "AddEmployee";
  employee?: Maybe<Employee>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type AddEmployeeInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  role: Scalars["String"];
};

type Attachment = Node & {
  __typename?: "Attachment";
  fileName: Scalars["String"];
  fileSize: Scalars["Int"];
  /** The ID of the object. */
  id: Scalars["ID"];
  mimeType: Scalars["String"];
  url: Scalars["String"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Attachment>;
};

/** An enumeration. */
enum AttachmentKey {
  CompanyAvatar = "COMPANY_AVATAR",
  CompanyAvatarFallback = "COMPANY_AVATAR_FALLBACK",
  CompanyDocuments = "COMPANY_DOCUMENTS",
  ProjectPostingDocuments = "PROJECT_POSTING_DOCUMENTS",
  ProjectPostingFallback = "PROJECT_POSTING_FALLBACK",
  ProjectPostingImages = "PROJECT_POSTING_IMAGES",
  StudentAvatar = "STUDENT_AVATAR",
  StudentAvatarFallback = "STUDENT_AVATAR_FALLBACK",
  StudentDocuments = "STUDENT_DOCUMENTS",
}

type Benefit = Node & {
  __typename?: "Benefit";
  icon: Scalars["String"];
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Benefit>;
};

/** A Relay edge containing a `Benefit` and its cursor. */
type BenefitEdge = {
  __typename?: "BenefitEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Benefit>;
};

type BenefitInput = {
  icon?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
};

type Branch = Node & {
  __typename?: "Branch";
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Branch>;
};

/** A Relay edge containing a `Branch` and its cursor. */
type BranchEdge = {
  __typename?: "BranchEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Branch>;
};

type BranchInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

type Company = Node & {
  __typename?: "Company";
  benefits: BenefitConnection;
  branches: BranchConnection;
  city: Scalars["String"];
  culturalFits?: Maybe<Array<CulturalFit>>;
  description: Scalars["String"];
  displayName: Scalars["String"];
  employees: Array<Employee>;
  /** The ID of the object. */
  id: Scalars["ID"];
  jobPostings: Array<JobPosting>;
  linkEducation?: Maybe<Scalars["String"]>;
  linkProjects?: Maybe<Scalars["String"]>;
  linkThesis?: Maybe<Scalars["String"]>;
  memberItStGallen: Scalars["Boolean"];
  name: Scalars["String"];
  phone: Scalars["String"];
  profileStep: Scalars["Int"];
  projectPostings: Array<ProjectPosting>;
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

type CompanyBenefitsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

type CompanyBranchesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

type CompanyProfileInputStep1 = {
  /** City */
  city: Scalars["String"];
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

type CompanyProfileInputStep2 = {
  /** description */
  description?: InputMaybe<Scalars["String"]>;
  /** memeber IT St. Gallen */
  memberItStGallen: Scalars["Boolean"];
  /** services */
  services?: InputMaybe<Scalars["String"]>;
  /** website */
  website: Scalars["String"];
};

type CompanyProfileInputStep3 = {
  /** Benefits */
  benefits?: InputMaybe<Array<InputMaybe<BenefitInput>>>;
  /** Branches */
  branches?: InputMaybe<Array<InputMaybe<BranchInput>>>;
};

type CompanyProfileInputStep4 = {
  /** Cultural Fit */
  culturalFits?: InputMaybe<Array<InputMaybe<CulturalFitInput>>>;
  /** Soft Skills */
  softSkills?: InputMaybe<Array<InputMaybe<SoftSkillInput>>>;
};

/** Updates the profile of a Company */
type CompanyProfileStep1 = {
  __typename?: "CompanyProfileStep1";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates website url, description, services, member IT St.Gallen */
type CompanyProfileStep2 = {
  __typename?: "CompanyProfileStep2";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates the Company Profile with benefits and branches */
type CompanyProfileStep3 = {
  __typename?: "CompanyProfileStep3";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates a company profile with soft skills and cultural fit */
type CompanyProfileStep4 = {
  __typename?: "CompanyProfileStep4";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type CulturalFit = Node & {
  __typename?: "CulturalFit";
  company: Scalars["String"];
  /** The ID of the object. */
  id: Scalars["ID"];
  student: Scalars["String"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<CulturalFit>;
};

/** A Relay edge containing a `CulturalFit` and its cursor. */
type CulturalFitEdge = {
  __typename?: "CulturalFitEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<CulturalFit>;
};

type CulturalFitInput = {
  id: Scalars["ID"];
};

type Dashboard = {
  __typename?: "Dashboard";
  confirmedMatches?: Maybe<Array<JobPostingMatchInfo>>;
  jobPostings?: Maybe<Array<JobPosting>>;
  latestJobPostings?: Maybe<Array<JobPosting>>;
  latestProjectPostings?: Maybe<Array<ProjectPosting>>;
  projectMatches?: Maybe<Array<ProjectPostingMatchInfo>>;
  projectPostings?: Maybe<Array<ProjectPosting>>;
  requestedMatches?: Maybe<Array<JobPostingMatchInfo>>;
  unconfirmedMatches?: Maybe<Array<JobPostingMatchInfo>>;
};

/** An enumeration. */
enum DateMode {
  DateFrom = "DATE_FROM",
  DateRange = "DATE_RANGE",
}

type DeleteAttachment = {
  __typename?: "DeleteAttachment";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type Employee = Node & {
  __typename?: "Employee";
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  /** The ID of the object. */
  id: Scalars["ID"];
  lastName?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  role: Scalars["String"];
};

type EmployeeInput = {
  id?: InputMaybe<Scalars["ID"]>;
  /** Role */
  role?: InputMaybe<Scalars["String"]>;
};

type FaqCategory = Node & {
  __typename?: "FAQCategory";
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<FaqCategory>;
};

type Hobby = Node & {
  __typename?: "Hobby";
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
};

type HobbyInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

type JobPosting = Node & {
  __typename?: "JobPosting";
  branches: Array<Branch>;
  company: Company;
  dateCreated?: Maybe<Scalars["Date"]>;
  datePublished?: Maybe<Scalars["Date"]>;
  description: Scalars["String"];
  displayTitle: Scalars["String"];
  employee?: Maybe<Employee>;
  formStep: Scalars["Int"];
  /** The ID of the object. */
  id: Scalars["ID"];
  jobFromDate: Scalars["Date"];
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
  workload: Scalars["Int"];
};

type JobPostingJobRequirementsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<JobPosting>;
};

type JobPostingInput = {
  id: Scalars["ID"];
};

type JobPostingInputStep1 = {
  branches: Array<InputMaybe<BranchInput>>;
  /** Description */
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  jobFromDate: Scalars["String"];
  jobToDate?: InputMaybe<Scalars["String"]>;
  jobType: JobTypeInput;
  /** Title */
  title: Scalars["String"];
  url?: InputMaybe<Scalars["String"]>;
  /** Workload */
  workload: Scalars["Int"];
};

type JobPostingInputStep2 = {
  id?: InputMaybe<Scalars["ID"]>;
  jobRequirements?: InputMaybe<Array<InputMaybe<JobRequirementInput>>>;
  languages?: InputMaybe<Array<InputMaybe<JobPostingLanguageRelationInput>>>;
  skills?: InputMaybe<Array<InputMaybe<SkillInput>>>;
};

type JobPostingInputStep3 = {
  employee: EmployeeInput;
  id?: InputMaybe<Scalars["ID"]>;
  /** State */
  state: Scalars["String"];
};

type JobPostingLanguageRelation = Node & {
  __typename?: "JobPostingLanguageRelation";
  /** The ID of the object. */
  id: Scalars["ID"];
  language: Language;
  languageLevel: LanguageLevel;
};

type JobPostingLanguageRelationInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  languageLevel?: InputMaybe<Scalars["ID"]>;
};

type JobPostingMatchInfo = Node & {
  __typename?: "JobPostingMatchInfo";
  /** The ID of the object. */
  id: Scalars["ID"];
  jobPosting: JobPosting;
  student: Student;
};

type JobPostingMatchingInput = {
  branch?: InputMaybe<BranchInput>;
  jobType?: InputMaybe<JobTypeInput>;
  workload?: InputMaybe<Scalars["Int"]>;
  zip?: InputMaybe<ZipCityInput>;
};

/** An enumeration. */
enum JobPostingState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

/** Creates a job posting */
type JobPostingStep1 = {
  __typename?: "JobPostingStep1";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates a job posting */
type JobPostingStep2 = {
  __typename?: "JobPostingStep2";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates a job posting */
type JobPostingStep3 = {
  __typename?: "JobPostingStep3";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type JobRequirement = Node & {
  __typename?: "JobRequirement";
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<JobRequirement>;
};

/** A Relay edge containing a `JobRequirement` and its cursor. */
type JobRequirementEdge = {
  __typename?: "JobRequirementEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<JobRequirement>;
};

type JobRequirementInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

type JobType = Node & {
  __typename?: "JobType";
  /** The ID of the object. */
  id: Scalars["ID"];
  mode: DateMode;
  name: Scalars["String"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<JobType>;
};

type JobTypeInput = {
  id: Scalars["ID"];
  mode?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

type Keyword = Node & {
  __typename?: "Keyword";
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Keyword>;
};

type KeywordInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

type Language = Node & {
  __typename?: "Language";
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Language>;
};

type LanguageLevel = Node & {
  __typename?: "LanguageLevel";
  description?: Maybe<Scalars["String"]>;
  /** The ID of the object. */
  id: Scalars["ID"];
  level: Scalars["String"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<LanguageLevel>;
};

type Match = {
  __typename?: "Match";
  avatar?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  keywords?: Maybe<Array<Keyword>>;
  matchStatus?: Maybe<MatchStatus>;
  name: Scalars["String"];
  rawScore: Scalars["Float"];
  score: Scalars["Float"];
  slug: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  type: MatchType;
};

type MatchHints = {
  __typename?: "MatchHints";
  hasConfirmedMatch: Scalars["Boolean"];
  hasRequestedMatch: Scalars["Boolean"];
};

/** Initiate or confirm Matching */
type MatchJobPosting = {
  __typename?: "MatchJobPosting";
  confirmed: Scalars["Boolean"];
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type MatchJobPostingInput = {
  jobPosting: JobPostingInput;
};

/** Initiate or confirm Matching */
type MatchProjectPosting = {
  __typename?: "MatchProjectPosting";
  confirmed: Scalars["Boolean"];
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type MatchProjectPostingInput = {
  projectPosting: ProjectPostingInput;
};

type MatchStatus = {
  __typename?: "MatchStatus";
  confirmed: Scalars["Boolean"];
  initiator: ProfileType;
};

/** Initiate or confirm Matching */
type MatchStudent = {
  __typename?: "MatchStudent";
  confirmed: Scalars["Boolean"];
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type MatchStudentInput = {
  jobPosting: JobPostingInput;
  student: StudentInput;
};

/** An enumeration. */
enum MatchType {
  Company = "COMPANY",
  JobPosting = "JOB_POSTING",
  ProjectPosting = "PROJECT_POSTING",
  Student = "STUDENT",
  University = "UNIVERSITY",
}

type Mutation = {
  __typename?: "Mutation";
  /** Adds a new emplyoee to a company */
  addEmployee?: Maybe<AddEmployee>;
  /** Updates the profile of a Company */
  companyProfileStep1?: Maybe<CompanyProfileStep1>;
  /** Updates website url, description, services, member IT St.Gallen */
  companyProfileStep2?: Maybe<CompanyProfileStep2>;
  /** Updates the Company Profile with benefits and branches */
  companyProfileStep3?: Maybe<CompanyProfileStep3>;
  /** Updates a company profile with soft skills and cultural fit */
  companyProfileStep4?: Maybe<CompanyProfileStep4>;
  deleteAttachment?: Maybe<DeleteAttachment>;
  /** Creates a job posting */
  jobPostingStep1?: Maybe<JobPostingStep1>;
  /** Updates a job posting */
  jobPostingStep2?: Maybe<JobPostingStep2>;
  /** Updates a job posting */
  jobPostingStep3?: Maybe<JobPostingStep3>;
  logout?: Maybe<Scalars["Boolean"]>;
  /** Initiate or confirm Matching */
  matchJobPosting?: Maybe<MatchJobPosting>;
  /** Initiate or confirm Matching */
  matchProjectPosting?: Maybe<MatchProjectPosting>;
  /** Initiate or confirm Matching */
  matchStudent?: Maybe<MatchStudent>;
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
  /** Creates a project posting */
  projectPostingStep1?: Maybe<ProjectPostingStep1>;
  /** Creates a project posting */
  projectPostingStep2?: Maybe<ProjectPostingStep2>;
  /** Updates a project posting */
  projectPostingStep3?: Maybe<ProjectPostingStep3>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  refreshToken?: Maybe<RefreshToken>;
  /** Creates a new user with company */
  registerCompany?: Maybe<RegisterCompany>;
  /** Creates a new user as student */
  registerStudent?: Maybe<RegisterStudent>;
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
  studentProfileStep1?: Maybe<StudentProfileStep1>;
  /** Updates job option, date (start or range) and branch of a student */
  studentProfileStep2?: Maybe<StudentProfileStep2>;
  /** Updates soft skills and cultural fits of a student */
  studentProfileStep3?: Maybe<StudentProfileStep3>;
  /** Updates the profile of a student */
  studentProfileStep4?: Maybe<StudentProfileStep4>;
  /** Updates the nickname of a student */
  studentProfileStep5?: Maybe<StudentProfileStep5>;
  /** Updates the state of a student */
  studentProfileStep6?: Maybe<StudentProfileStep6>;
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
  universityProfileStep1?: Maybe<UniversityProfileStep1>;
  /** Updates branches and description */
  universityProfileStep2?: Maybe<UniversityProfileStep2>;
  /** Updates website services */
  universityProfileStep3?: Maybe<UniversityProfileStep3>;
  /** Updates a company profile with soft skills and cultural fit */
  universityProfileStep4?: Maybe<UniversityProfileStep4>;
  upload?: Maybe<UserUpload>;
  /** Creates a new user user request */
  userRequest?: Maybe<UserRequest>;
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
  addEmployee: AddEmployeeInput;
};

type MutationCompanyProfileStep1Args = {
  step1: CompanyProfileInputStep1;
};

type MutationCompanyProfileStep2Args = {
  step2: CompanyProfileInputStep2;
};

type MutationCompanyProfileStep3Args = {
  step3: CompanyProfileInputStep3;
};

type MutationCompanyProfileStep4Args = {
  step4: CompanyProfileInputStep4;
};

type MutationDeleteAttachmentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

type MutationJobPostingStep1Args = {
  step1: JobPostingInputStep1;
};

type MutationJobPostingStep2Args = {
  step2: JobPostingInputStep2;
};

type MutationJobPostingStep3Args = {
  step3: JobPostingInputStep3;
};

type MutationMatchJobPostingArgs = {
  match: MatchJobPostingInput;
};

type MutationMatchProjectPostingArgs = {
  match: MatchProjectPostingInput;
};

type MutationMatchStudentArgs = {
  match: MatchStudentInput;
};

type MutationPasswordResetArgs = {
  newPassword1: Scalars["String"];
  newPassword2: Scalars["String"];
  token: Scalars["String"];
};

type MutationProjectPostingStep1Args = {
  step1: ProjectPostingInputStep1;
};

type MutationProjectPostingStep2Args = {
  step2: ProjectPostingInputStep2;
};

type MutationProjectPostingStep3Args = {
  step3: ProjectPostingInputStep3;
};

type MutationRefreshTokenArgs = {
  refreshToken: Scalars["String"];
};

type MutationRegisterCompanyArgs = {
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

type MutationRegisterStudentArgs = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password1: Scalars["String"];
  password2: Scalars["String"];
  student?: InputMaybe<RegisterStudentInput>;
  type: Scalars["String"];
  username: Scalars["String"];
};

type MutationRevokeTokenArgs = {
  refreshToken: Scalars["String"];
};

type MutationSendPasswordResetEmailArgs = {
  email: Scalars["String"];
};

type MutationStudentProfileStep1Args = {
  step1: StudentProfileInputStep1;
};

type MutationStudentProfileStep2Args = {
  step2: StudentProfileInputStep2;
};

type MutationStudentProfileStep3Args = {
  step3: StudentProfileInputStep3;
};

type MutationStudentProfileStep4Args = {
  step4?: InputMaybe<StudentProfileInputStep4>;
};

type MutationStudentProfileStep5Args = {
  step5: StudentProfileInputStep5;
};

type MutationStudentProfileStep6Args = {
  step6: StudentProfileInputStep6;
};

type MutationTokenAuthArgs = {
  email?: InputMaybe<Scalars["String"]>;
  password: Scalars["String"];
  username?: InputMaybe<Scalars["String"]>;
};

type MutationUniversityProfileStep1Args = {
  step1: UniversityProfileInputStep1;
};

type MutationUniversityProfileStep2Args = {
  step2: UniversityProfileInputStep2;
};

type MutationUniversityProfileStep3Args = {
  step3: UniversityProfileInputStep3;
};

type MutationUniversityProfileStep4Args = {
  step4: UniversityProfileInputStep4;
};

type MutationUploadArgs = {
  file: Scalars["Upload"];
  key: AttachmentKey;
  projectPosting?: InputMaybe<ProjectPostingInput>;
};

type MutationUserRequestArgs = {
  input: UserRequestInput;
};

type MutationVerifyAccountArgs = {
  token: Scalars["String"];
};

/** An object with an ID */
type Node = {
  /** The ID of the object. */
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
type ObtainJsonWebToken = {
  __typename?: "ObtainJSONWebToken";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
  token?: Maybe<Scalars["String"]>;
  unarchiving?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<UserNode>;
};

type OnlineProject = Node & {
  __typename?: "OnlineProject";
  /** The ID of the object. */
  id: Scalars["ID"];
  url: Scalars["String"];
};

type OnlineProjectInput = {
  id?: InputMaybe<Scalars["ID"]>;
  url?: InputMaybe<Scalars["String"]>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
type PageInfo = {
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
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** An enumeration. */
enum ProfileState {
  Anonymous = "ANONYMOUS",
  Incomplete = "INCOMPLETE",
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

type ProjectPosting = Node & {
  __typename?: "ProjectPosting";
  additionalInformation: Scalars["String"];
  company?: Maybe<Company>;
  dateCreated?: Maybe<Scalars["Date"]>;
  datePublished?: Maybe<Scalars["Date"]>;
  description: Scalars["String"];
  displayTitle: Scalars["String"];
  employee?: Maybe<Employee>;
  formStep: Scalars["Int"];
  /** The ID of the object. */
  id: Scalars["ID"];
  keywords?: Maybe<Array<Keyword>>;
  matchHints?: Maybe<MatchHints>;
  matchStatus?: Maybe<MatchStatus>;
  projectFromDate?: Maybe<Scalars["Date"]>;
  projectType: ProjectType;
  slug: Scalars["String"];
  state: ProjectPostingState;
  student?: Maybe<Student>;
  title: Scalars["String"];
  topic: Topic;
  website: Scalars["String"];
};

type ProjectPostingConnection = {
  __typename?: "ProjectPostingConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ProjectPostingEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ProjectPosting` and its cursor. */
type ProjectPostingEdge = {
  __typename?: "ProjectPostingEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<ProjectPosting>;
};

type ProjectPostingInput = {
  id: Scalars["ID"];
};

type ProjectPostingInputStep1 = {
  /** Additional Information */
  additionalInformation?: InputMaybe<Scalars["String"]>;
  /** Description */
  description: Scalars["String"];
  id?: InputMaybe<Scalars["ID"]>;
  keywords?: InputMaybe<Array<InputMaybe<KeywordInput>>>;
  projectType: ProjectTypeInput;
  /** Title */
  title: Scalars["String"];
  topic: TopicInput;
};

type ProjectPostingInputStep2 = {
  id?: InputMaybe<Scalars["ID"]>;
  projectFromDate?: InputMaybe<Scalars["String"]>;
  website?: InputMaybe<Scalars["String"]>;
};

type ProjectPostingInputStep3 = {
  employee?: InputMaybe<EmployeeInput>;
  id?: InputMaybe<Scalars["ID"]>;
  /** State */
  state: Scalars["String"];
};

type ProjectPostingMatchInfo = Node & {
  __typename?: "ProjectPostingMatchInfo";
  company?: Maybe<Company>;
  /** The ID of the object. */
  id: Scalars["ID"];
  projectPosting: ProjectPosting;
  student?: Maybe<Student>;
};

type ProjectPostingMatchingInput = {
  projectPosting: ProjectPostingInput;
};

/** An enumeration. */
enum ProjectPostingState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

/** Creates a project posting */
type ProjectPostingStep1 = {
  __typename?: "ProjectPostingStep1";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  projectPostingId?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Creates a project posting */
type ProjectPostingStep2 = {
  __typename?: "ProjectPostingStep2";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  projectPostingId?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates a project posting */
type ProjectPostingStep3 = {
  __typename?: "ProjectPostingStep3";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  projectPostingId?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type ProjectType = Node & {
  __typename?: "ProjectType";
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
};

type ProjectTypeConnection = {
  __typename?: "ProjectTypeConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ProjectTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ProjectType` and its cursor. */
type ProjectTypeEdge = {
  __typename?: "ProjectTypeEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<ProjectType>;
};

type ProjectTypeInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

type Query = {
  __typename?: "Query";
  attachments?: Maybe<AttachmentConnection>;
  benefits?: Maybe<BenefitConnectionsConnection>;
  branches?: Maybe<BranchConnectionsConnection>;
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
  projectPosting?: Maybe<ProjectPosting>;
  projectPostings?: Maybe<ProjectPostingConnection>;
  projectTypes?: Maybe<ProjectTypeConnection>;
  skills?: Maybe<SkillConnectionsConnection>;
  softSkills?: Maybe<SoftSkillConnectionsConnection>;
  student?: Maybe<Student>;
  topics?: Maybe<TopicConnection>;
  uploadConfigurations?: Maybe<Array<Maybe<UploadConfiguration>>>;
  verifyPasswordResetToken?: Maybe<Scalars["Boolean"]>;
  zipCity: Array<ZipCity>;
  zipCityJobs: Array<ZipCity>;
};

type QueryAttachmentsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["ID"]>;
  key: AttachmentKey;
  last?: InputMaybe<Scalars["Int"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

type QueryBenefitsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QueryBranchesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QueryCompanyArgs = {
  slug?: InputMaybe<Scalars["String"]>;
};

type QueryCulturalFitsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QueryFaqCategoriesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QueryJobPostingArgs = {
  id?: InputMaybe<Scalars["ID"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

type QueryJobPostingsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

type QueryJobRequirementsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QueryJobTypesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QueryKeywordsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QueryLanguageLevelsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QueryLanguagesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  shortList?: InputMaybe<Scalars["Boolean"]>;
};

type QueryMatchesArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  jobPostingMatching?: InputMaybe<JobPostingMatchingInput>;
  projectPostingMatching?: InputMaybe<ProjectPostingMatchingInput>;
  skip?: InputMaybe<Scalars["Int"]>;
  softBoost?: InputMaybe<Scalars["Int"]>;
  studentMatching?: InputMaybe<StudentMatchingInput>;
  techBoost?: InputMaybe<Scalars["Int"]>;
};

type QueryNodeArgs = {
  id: Scalars["ID"];
};

type QueryProjectPostingArgs = {
  id?: InputMaybe<Scalars["ID"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

type QueryProjectPostingsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QueryProjectTypesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QuerySkillsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QuerySoftSkillsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QueryStudentArgs = {
  jobPostingId?: InputMaybe<Scalars["ID"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

type QueryTopicsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

type QueryVerifyPasswordResetTokenArgs = {
  token: Scalars["String"];
};

type QueryZipCityJobsArgs = {
  branchId?: InputMaybe<Scalars["ID"]>;
  jobTypeId?: InputMaybe<Scalars["ID"]>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
type RefreshToken = {
  __typename?: "RefreshToken";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  payload?: Maybe<Scalars["GenericScalar"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
  token?: Maybe<Scalars["String"]>;
};

/** Creates a new user with company */
type RegisterCompany = {
  __typename?: "RegisterCompany";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type RegisterCompanyInput = {
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
type RegisterStudent = {
  __typename?: "RegisterStudent";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type RegisterStudentInput = {
  id?: InputMaybe<Scalars["ID"]>;
  /** Mobile */
  mobile: Scalars["String"];
};

type Revoke = {
  __typename?: "Revoke";
  revoked?: Maybe<Scalars["Int"]>;
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
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type Skill = Node & {
  __typename?: "Skill";
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Skill>;
};

/** A Relay edge containing a `Skill` and its cursor. */
type SkillEdge = {
  __typename?: "SkillEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Skill>;
};

type SkillInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

type SoftSkill = Node & {
  __typename?: "SoftSkill";
  company: Scalars["String"];
  /** The ID of the object. */
  id: Scalars["ID"];
  student: Scalars["String"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<SoftSkill>;
};

/** A Relay edge containing a `SoftSkill` and its cursor. */
type SoftSkillEdge = {
  __typename?: "SoftSkillEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<SoftSkill>;
};

type SoftSkillInput = {
  id: Scalars["ID"];
};

type Student = Node & {
  __typename?: "Student";
  branch?: Maybe<Branch>;
  city?: Maybe<Scalars["String"]>;
  culturalFits: CulturalFitConnection;
  dateOfBirth?: Maybe<Scalars["String"]>;
  distinction?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  fieldOfStudy?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  graduation?: Maybe<Scalars["String"]>;
  hobbies?: Maybe<Array<Hobby>>;
  /** The ID of the object. */
  id: Scalars["ID"];
  jobFromDate?: Maybe<Scalars["Date"]>;
  jobToDate?: Maybe<Scalars["Date"]>;
  jobType?: Maybe<JobType>;
  languages: UserLanguageRelationConnection;
  lastName?: Maybe<Scalars["String"]>;
  matchStatus?: Maybe<MatchStatus>;
  mobile?: Maybe<Scalars["String"]>;
  nickname?: Maybe<Scalars["String"]>;
  onlineProjects?: Maybe<Array<OnlineProject>>;
  profileStep: Scalars["Int"];
  projectPostings: Array<ProjectPosting>;
  schoolName?: Maybe<Scalars["String"]>;
  skills: SkillConnection;
  slug: Scalars["String"];
  softSkills: SoftSkillConnection;
  state: ProfileState;
  street?: Maybe<Scalars["String"]>;
  zip?: Maybe<Scalars["String"]>;
};

type StudentCulturalFitsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

type StudentLanguagesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

type StudentSkillsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

type StudentSoftSkillsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

type StudentInput = {
  id: Scalars["ID"];
};

type StudentMatchingInput = {
  jobPosting: JobPostingInput;
};

type StudentProfileInputStep1 = {
  /** City */
  city?: InputMaybe<Scalars["String"]>;
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

type StudentProfileInputStep2 = {
  branch?: InputMaybe<BranchInput>;
  jobFromDate?: InputMaybe<Scalars["String"]>;
  jobToDate?: InputMaybe<Scalars["String"]>;
  jobType: JobTypeInput;
};

type StudentProfileInputStep3 = {
  culturalFits?: InputMaybe<Array<InputMaybe<CulturalFitInput>>>;
  softSkills?: InputMaybe<Array<InputMaybe<SoftSkillInput>>>;
};

type StudentProfileInputStep4 = {
  /** Distinction */
  distinction?: InputMaybe<Scalars["String"]>;
  /** Hobbies */
  hobbies?: InputMaybe<Array<InputMaybe<HobbyInput>>>;
  /** Languages */
  languages: Array<InputMaybe<UserLanguageRelationInput>>;
  /** Online_Projects */
  onlineProjects?: InputMaybe<Array<InputMaybe<OnlineProjectInput>>>;
  /** Skills */
  skills?: InputMaybe<Array<InputMaybe<SkillInput>>>;
};

type StudentProfileInputStep5 = {
  /** Nickname */
  nickname: Scalars["String"];
};

type StudentProfileInputStep6 = {
  /** State */
  state: Scalars["String"];
};

/** Updates the profile of a student */
type StudentProfileStep1 = {
  __typename?: "StudentProfileStep1";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates job option, date (start or range) and branch of a student */
type StudentProfileStep2 = {
  __typename?: "StudentProfileStep2";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates soft skills and cultural fits of a student */
type StudentProfileStep3 = {
  __typename?: "StudentProfileStep3";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates the profile of a student */
type StudentProfileStep4 = {
  __typename?: "StudentProfileStep4";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates the nickname of a student */
type StudentProfileStep5 = {
  __typename?: "StudentProfileStep5";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  nicknameSuggestions?: Maybe<Array<Maybe<Scalars["String"]>>>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates the state of a student */
type StudentProfileStep6 = {
  __typename?: "StudentProfileStep6";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type Topic = Node & {
  __typename?: "Topic";
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
};

type TopicConnection = {
  __typename?: "TopicConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TopicEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Topic` and its cursor. */
type TopicEdge = {
  __typename?: "TopicEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Topic>;
};

type TopicInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

type UniversityProfileInputStep1 = {
  /** City */
  city: Scalars["String"];
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

type UniversityProfileInputStep2 = {
  /** description */
  description?: InputMaybe<Scalars["String"]>;
};

type UniversityProfileInputStep3 = {
  /** Benefits */
  benefits?: InputMaybe<Array<InputMaybe<BenefitInput>>>;
  /** Branches */
  branches?: InputMaybe<Array<InputMaybe<BranchInput>>>;
  /** website education */
  linkEducation?: InputMaybe<Scalars["String"]>;
  /** website projects */
  linkProjects?: InputMaybe<Scalars["String"]>;
  /** website thesis */
  linkThesis?: InputMaybe<Scalars["String"]>;
  /** services */
  services?: InputMaybe<Scalars["String"]>;
};

type UniversityProfileInputStep4 = {
  /** Cultural Fit */
  culturalFits?: InputMaybe<Array<InputMaybe<CulturalFitInput>>>;
  /** Soft Skills */
  softSkills?: InputMaybe<Array<InputMaybe<SoftSkillInput>>>;
};

/** Updates the profile of a university */
type UniversityProfileStep1 = {
  __typename?: "UniversityProfileStep1";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates branches and description */
type UniversityProfileStep2 = {
  __typename?: "UniversityProfileStep2";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates website services */
type UniversityProfileStep3 = {
  __typename?: "UniversityProfileStep3";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates a company profile with soft skills and cultural fit */
type UniversityProfileStep4 = {
  __typename?: "UniversityProfileStep4";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type UploadConfiguration = {
  __typename?: "UploadConfiguration";
  contentTypesConfiguration: Array<UploadTypeConfiguration>;
  key: AttachmentKey;
  maxFiles: Scalars["Int"];
};

type UploadTypeConfiguration = {
  __typename?: "UploadTypeConfiguration";
  contentTypes: Array<Scalars["String"]>;
  maxSize: Scalars["Int"];
};

type User = Node & {
  __typename?: "User";
  company?: Maybe<Company>;
  dateJoined: Scalars["DateTime"];
  email: Scalars["String"];
  employee?: Maybe<Employee>;
  firstName: Scalars["String"];
  /** The ID of the object. */
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

type UserLanguageRelation = Node & {
  __typename?: "UserLanguageRelation";
  /** The ID of the object. */
  id: Scalars["ID"];
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
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<UserLanguageRelation>;
};

type UserLanguageRelationInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  languageLevel?: InputMaybe<Scalars["ID"]>;
};

type UserNode = Node & {
  __typename?: "UserNode";
  archived?: Maybe<Scalars["Boolean"]>;
  company?: Maybe<Company>;
  email: Scalars["String"];
  employee?: Maybe<Employee>;
  firstName: Scalars["String"];
  /** The ID of the object. */
  id: Scalars["ID"];
  lastName: Scalars["String"];
  pk?: Maybe<Scalars["Int"]>;
  secondaryEmail?: Maybe<Scalars["String"]>;
  student?: Maybe<Student>;
  type: UserType;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
  verified?: Maybe<Scalars["Boolean"]>;
};

/** Creates a new user user request */
type UserRequest = {
  __typename?: "UserRequest";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type UserRequestInput = {
  /** E-Mail */
  email: Scalars["String"];
  /** Message */
  message: Scalars["String"];
  /** Name */
  name: Scalars["String"];
};

/** An enumeration. */
enum UserType {
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

type UserUpload = {
  __typename?: "UserUpload";
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
type VerifyAccount = {
  __typename?: "VerifyAccount";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

type ZipCity = {
  __typename?: "ZipCity";
  canton: Scalars["String"];
  city: Scalars["String"];
  zip: Scalars["String"];
};

type ZipCityInput = {
  zip: Scalars["String"];
};

declare module "*/addEmployee.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/companyProfileStep1.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/companyProfileStep2.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/companyProfileStep3.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/companyProfileStep4.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/deleteAttachment.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobPostingStep1.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobPostingStep2.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobPostingStep3.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/logout.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/matchJobPosting.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/matchProjectPosting.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/matchStudent.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/passwordReset.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/projectPostingStep1.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/projectPostingStep2.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/projectPostingStep3.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/refreshToken.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/registerCompany.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/registerStudent.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/revokeToken.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/sendPasswordResetEmail.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentProfileStep1.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentProfileStep2.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentProfileStep3.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentProfileStep4.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentProfileStep5.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/studentProfileStep6.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/tokenAuth.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/universityProfileStep1.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/universityProfileStep2.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/universityProfileStep3.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/universityProfileStep4.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/upload.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/uploadProjectPosting.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/userRequest.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/verifyAccount.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/attachments.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/attachmentsProjectPosting.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/benefits.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/branches.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/company.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/companyMatching.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const CompanyMatching: DocumentNode;

  export default defaultDocument;
}

declare module "*/culturalFits.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/dashboard.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/employees.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobPosting.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobPostings.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobRequirements.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/jobTypes.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/keywords.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/languageLevels.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/languages.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/matching.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/me.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/projectPosting.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/projectPostings.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/projectTypes.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/skills.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/softSkills.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/student.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/topics.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/uploadConfigurations.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/verifyPasswordResetToken.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/zipCity.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

declare module "*/zipCityJobs.gql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;

  export default defaultDocument;
}

const CompanyMatching = gql`
  query CompanyMatching {
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
