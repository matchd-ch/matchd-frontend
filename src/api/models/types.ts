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
export type AddEmployee = {
  __typename?: "AddEmployee";
  employee?: Maybe<Employee>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type AddEmployeeInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  role: Scalars["String"];
};

export type Attachment = Node & {
  __typename?: "Attachment";
  fileName: Scalars["String"];
  fileSize: Scalars["Int"];
  /** The ID of the object. */
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

/** An enumeration. */
export enum AttachmentKey {
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

export type Benefit = Node & {
  __typename?: "Benefit";
  icon: Scalars["String"];
  /** The ID of the object. */
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
  id: Scalars["ID"];
};

export type Branch = Node & {
  __typename?: "Branch";
  /** The ID of the object. */
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
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type Company = Node & {
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

/** Updates the Company Profile with benefits and branches */
export type CompanyProfileAdvantages = {
  __typename?: "CompanyProfileAdvantages";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates the profile of a Company */
export type CompanyProfileBaseData = {
  __typename?: "CompanyProfileBaseData";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type CompanyProfileInputAdvantages = {
  /** Benefits */
  benefits?: InputMaybe<Array<InputMaybe<BenefitInput>>>;
  /** Branches */
  branches?: InputMaybe<Array<InputMaybe<BranchInput>>>;
};

export type CompanyProfileInputBaseData = {
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

export type CompanyProfileInputRelations = {
  /** description */
  description?: InputMaybe<Scalars["String"]>;
  /** memeber IT St. Gallen */
  memberItStGallen: Scalars["Boolean"];
  /** services */
  services?: InputMaybe<Scalars["String"]>;
  /** website */
  website: Scalars["String"];
};

export type CompanyProfileInputValues = {
  /** Cultural Fit */
  culturalFits?: InputMaybe<Array<InputMaybe<CulturalFitInput>>>;
  /** Soft Skills */
  softSkills?: InputMaybe<Array<InputMaybe<SoftSkillInput>>>;
};

/** Updates website url, description, services, member IT St.Gallen */
export type CompanyProfileRelations = {
  __typename?: "CompanyProfileRelations";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates a company profile with soft skills and cultural fit */
export type CompanyProfileValues = {
  __typename?: "CompanyProfileValues";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type CulturalFit = Node & {
  __typename?: "CulturalFit";
  company: Scalars["String"];
  /** The ID of the object. */
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
  id: Scalars["ID"];
};

export type Dashboard = {
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
export enum DateMode {
  DateFrom = "DATE_FROM",
  DateRange = "DATE_RANGE",
}

export type DeleteAttachment = {
  __typename?: "DeleteAttachment";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type Employee = Node & {
  __typename?: "Employee";
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  /** The ID of the object. */
  id: Scalars["ID"];
  lastName?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  role: Scalars["String"];
};

export type EmployeeInput = {
  id?: InputMaybe<Scalars["ID"]>;
  /** Role */
  role?: InputMaybe<Scalars["String"]>;
};

export type FaqCategory = Node & {
  __typename?: "FAQCategory";
  /** The ID of the object. */
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
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type HobbyInput = {
  id?: InputMaybe<Scalars["ID"]>;
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

export type JobPostingJobRequirementsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Updates a job posting */
export type JobPostingAllocationForm = {
  __typename?: "JobPostingAllocationForm";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Creates a job posting */
export type JobPostingBaseDataForm = {
  __typename?: "JobPostingBaseDataForm";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
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
  id: Scalars["ID"];
};

export type JobPostingInputAllocation = {
  employee: EmployeeInput;
  id?: InputMaybe<Scalars["ID"]>;
  /** State */
  state: Scalars["String"];
};

export type JobPostingInputBaseData = {
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

export type JobPostingInputRequirements = {
  id?: InputMaybe<Scalars["ID"]>;
  jobRequirements?: InputMaybe<Array<InputMaybe<JobRequirementInput>>>;
  languages?: InputMaybe<Array<InputMaybe<JobPostingLanguageRelationInput>>>;
  skills?: InputMaybe<Array<InputMaybe<SkillInput>>>;
};

export type JobPostingLanguageRelation = Node & {
  __typename?: "JobPostingLanguageRelation";
  /** The ID of the object. */
  id: Scalars["ID"];
  language: Language;
  languageLevel: LanguageLevel;
};

export type JobPostingLanguageRelationInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  languageLevel?: InputMaybe<Scalars["ID"]>;
};

export type JobPostingMatchInfo = Node & {
  __typename?: "JobPostingMatchInfo";
  /** The ID of the object. */
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

/** Updates a job posting */
export type JobPostingRequirements = {
  __typename?: "JobPostingRequirements";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** An enumeration. */
export enum JobPostingState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

export type JobRequirement = Node & {
  __typename?: "JobRequirement";
  /** The ID of the object. */
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
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type JobType = Node & {
  __typename?: "JobType";
  /** The ID of the object. */
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
  id: Scalars["ID"];
  mode?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Keyword = Node & {
  __typename?: "Keyword";
  /** The ID of the object. */
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
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type Language = Node & {
  __typename?: "Language";
  /** The ID of the object. */
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
  /** The ID of the object. */
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

export type MatchHints = {
  __typename?: "MatchHints";
  hasConfirmedMatch: Scalars["Boolean"];
  hasRequestedMatch: Scalars["Boolean"];
};

/** Initiate or confirm Matching */
export type MatchJobPosting = {
  __typename?: "MatchJobPosting";
  confirmed: Scalars["Boolean"];
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type MatchJobPostingInput = {
  jobPosting: JobPostingInput;
};

/** Initiate or confirm Matching */
export type MatchProjectPosting = {
  __typename?: "MatchProjectPosting";
  confirmed: Scalars["Boolean"];
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type MatchProjectPostingInput = {
  projectPosting: ProjectPostingInput;
};

export type MatchStatus = {
  __typename?: "MatchStatus";
  confirmed: Scalars["Boolean"];
  initiator: ProfileType;
};

/** Initiate or confirm Matching */
export type MatchStudent = {
  __typename?: "MatchStudent";
  confirmed: Scalars["Boolean"];
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type MatchStudentInput = {
  jobPosting: JobPostingInput;
  student: StudentInput;
};

/** An enumeration. */
export enum MatchType {
  Company = "COMPANY",
  JobPosting = "JOB_POSTING",
  ProjectPosting = "PROJECT_POSTING",
  Student = "STUDENT",
  University = "UNIVERSITY",
}

export type Mutation = {
  __typename?: "Mutation";
  /** Adds a new emplyoee to a company */
  addEmployee?: Maybe<AddEmployee>;
  /** Updates the Company Profile with benefits and branches */
  companyProfileAdvantages?: Maybe<CompanyProfileAdvantages>;
  /** Updates the profile of a Company */
  companyProfileBaseData?: Maybe<CompanyProfileBaseData>;
  /** Updates website url, description, services, member IT St.Gallen */
  companyProfileRelations?: Maybe<CompanyProfileRelations>;
  /** Updates a company profile with soft skills and cultural fit */
  companyProfileValues?: Maybe<CompanyProfileValues>;
  deleteAttachment?: Maybe<DeleteAttachment>;
  /** Updates a job posting */
  jobPostingAllocation?: Maybe<JobPostingAllocationForm>;
  /** Creates a job posting */
  jobPostingBaseData?: Maybe<JobPostingBaseDataForm>;
  /** Updates a job posting */
  jobPostingRequirements?: Maybe<JobPostingRequirements>;
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
  /** Updates a project posting */
  projectPostingAllocation?: Maybe<ProjectPostingAllocation>;
  /** Creates a project posting */
  projectPostingBaseData?: Maybe<ProjectPostingBaseData>;
  /** Creates a project posting */
  projectPostingSpecificData?: Maybe<ProjectPostingSpecificData>;
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
  studentProfileAbilities?: Maybe<StudentProfileAbilities>;
  /** Updates the profile of a student */
  studentProfileBaseData?: Maybe<StudentProfileBaseData>;
  /** Updates soft skills and cultural fits of a student */
  studentProfileCharacter?: Maybe<StudentProfileCharacter>;
  /** Updates the state of a student */
  studentProfileCondition?: Maybe<StudentProfileCondition>;
  /** Updates job option, date (start or range) and branch of a student */
  studentProfileEmployment?: Maybe<StudentProfileEmployment>;
  /** Updates the nickname of a student */
  studentProfileSpecificData?: Maybe<StudentProfileSpecificData>;
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
  universityProfileBaseData?: Maybe<UniversityProfileBaseData>;
  /** Updates website services */
  universityProfileRelations?: Maybe<UniversityProfileRelations>;
  /** Updates branches and description */
  universityProfileSpecificData?: Maybe<UniversityProfileSpecificData>;
  /** Updates a company profile with soft skills and cultural fit */
  universityProfileValues?: Maybe<UniversityProfileValues>;
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

export type MutationAddEmployeeArgs = {
  addEmployee: AddEmployeeInput;
};

export type MutationCompanyProfileAdvantagesArgs = {
  advantages: CompanyProfileInputAdvantages;
};

export type MutationCompanyProfileBaseDataArgs = {
  baseData: CompanyProfileInputBaseData;
};

export type MutationCompanyProfileRelationsArgs = {
  relations: CompanyProfileInputRelations;
};

export type MutationCompanyProfileValuesArgs = {
  values: CompanyProfileInputValues;
};

export type MutationDeleteAttachmentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type MutationJobPostingAllocationArgs = {
  allocation: JobPostingInputAllocation;
};

export type MutationJobPostingBaseDataArgs = {
  baseData: JobPostingInputBaseData;
};

export type MutationJobPostingRequirementsArgs = {
  requirements: JobPostingInputRequirements;
};

export type MutationMatchJobPostingArgs = {
  match: MatchJobPostingInput;
};

export type MutationMatchProjectPostingArgs = {
  match: MatchProjectPostingInput;
};

export type MutationMatchStudentArgs = {
  match: MatchStudentInput;
};

export type MutationPasswordResetArgs = {
  newPassword1: Scalars["String"];
  newPassword2: Scalars["String"];
  token: Scalars["String"];
};

export type MutationProjectPostingAllocationArgs = {
  allocation: ProjectPostingInputAllocation;
};

export type MutationProjectPostingBaseDataArgs = {
  baseData: ProjectPostingInputBaseData;
};

export type MutationProjectPostingSpecificDataArgs = {
  specificData: ProjectPostingInputSpecificData;
};

export type MutationRefreshTokenArgs = {
  refreshToken: Scalars["String"];
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

export type MutationRevokeTokenArgs = {
  refreshToken: Scalars["String"];
};

export type MutationSendPasswordResetEmailArgs = {
  email: Scalars["String"];
};

export type MutationStudentProfileAbilitiesArgs = {
  abilities?: InputMaybe<StudentProfileInputAbilities>;
};

export type MutationStudentProfileBaseDataArgs = {
  baseData: StudentProfileInputBaseData;
};

export type MutationStudentProfileCharacterArgs = {
  character: StudentProfileInputCharacter;
};

export type MutationStudentProfileConditionArgs = {
  condition: StudentProfileInputCondition;
};

export type MutationStudentProfileEmploymentArgs = {
  employment: StudentProfileInputEmployment;
};

export type MutationStudentProfileSpecificDataArgs = {
  specificData: StudentProfileInputSpecificData;
};

export type MutationTokenAuthArgs = {
  email?: InputMaybe<Scalars["String"]>;
  password: Scalars["String"];
  username?: InputMaybe<Scalars["String"]>;
};

export type MutationUniversityProfileBaseDataArgs = {
  baseData: UniversityProfileInputBaseData;
};

export type MutationUniversityProfileRelationsArgs = {
  relations: UniversityProfileInputRelations;
};

export type MutationUniversityProfileSpecificDataArgs = {
  specificData: UniversityProfileInputSpecificData;
};

export type MutationUniversityProfileValuesArgs = {
  values: UniversityProfileInputValues;
};

export type MutationUploadArgs = {
  file: Scalars["Upload"];
  key: AttachmentKey;
  projectPosting?: InputMaybe<ProjectPostingInput>;
};

export type MutationUserRequestArgs = {
  input: UserRequestInput;
};

export type MutationVerifyAccountArgs = {
  token: Scalars["String"];
};

/** An object with an ID */
export type Node = {
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
export type ObtainJsonWebToken = {
  __typename?: "ObtainJSONWebToken";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
  token?: Maybe<Scalars["String"]>;
  unarchiving?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<UserNode>;
};

export type OnlineProject = Node & {
  __typename?: "OnlineProject";
  /** The ID of the object. */
  id: Scalars["ID"];
  url: Scalars["String"];
};

export type OnlineProjectInput = {
  id?: InputMaybe<Scalars["ID"]>;
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

/** An enumeration. */
export enum ProfileState {
  Anonymous = "ANONYMOUS",
  Incomplete = "INCOMPLETE",
  Public = "PUBLIC",
}

/** An enumeration. */
export enum ProfileType {
  CollegeStudent = "COLLEGE_STUDENT",
  Company = "COMPANY",
  Internal = "INTERNAL",
  Junior = "JUNIOR",
  Other = "OTHER",
  Student = "STUDENT",
  University = "UNIVERSITY",
}

export type ProjectPosting = Node & {
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

/** Updates a project posting */
export type ProjectPostingAllocation = {
  __typename?: "ProjectPostingAllocation";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  projectPostingId?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Creates a project posting */
export type ProjectPostingBaseData = {
  __typename?: "ProjectPostingBaseData";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  projectPostingId?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type ProjectPostingConnection = {
  __typename?: "ProjectPostingConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ProjectPostingEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ProjectPosting` and its cursor. */
export type ProjectPostingEdge = {
  __typename?: "ProjectPostingEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<ProjectPosting>;
};

export type ProjectPostingInput = {
  id: Scalars["ID"];
};

export type ProjectPostingInputAllocation = {
  employee?: InputMaybe<EmployeeInput>;
  id?: InputMaybe<Scalars["ID"]>;
  /** State */
  state: Scalars["String"];
};

export type ProjectPostingInputBaseData = {
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

export type ProjectPostingInputSpecificData = {
  id?: InputMaybe<Scalars["ID"]>;
  projectFromDate?: InputMaybe<Scalars["String"]>;
  website?: InputMaybe<Scalars["String"]>;
};

export type ProjectPostingMatchInfo = Node & {
  __typename?: "ProjectPostingMatchInfo";
  company?: Maybe<Company>;
  /** The ID of the object. */
  id: Scalars["ID"];
  projectPosting: ProjectPosting;
  student?: Maybe<Student>;
};

export type ProjectPostingMatchingInput = {
  projectPosting: ProjectPostingInput;
};

/** Creates a project posting */
export type ProjectPostingSpecificData = {
  __typename?: "ProjectPostingSpecificData";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  projectPostingId?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** An enumeration. */
export enum ProjectPostingState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

export type ProjectType = Node & {
  __typename?: "ProjectType";
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type ProjectTypeConnection = {
  __typename?: "ProjectTypeConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ProjectTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ProjectType` and its cursor. */
export type ProjectTypeEdge = {
  __typename?: "ProjectTypeEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<ProjectType>;
};

export type ProjectTypeInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type Query = {
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

export type QueryAttachmentsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["ID"]>;
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
  id?: InputMaybe<Scalars["ID"]>;
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
  first?: InputMaybe<Scalars["Int"]>;
  jobPostingMatching?: InputMaybe<JobPostingMatchingInput>;
  projectPostingMatching?: InputMaybe<ProjectPostingMatchingInput>;
  skip?: InputMaybe<Scalars["Int"]>;
  softBoost?: InputMaybe<Scalars["Int"]>;
  studentMatching?: InputMaybe<StudentMatchingInput>;
  techBoost?: InputMaybe<Scalars["Int"]>;
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
};

export type QueryProjectPostingArgs = {
  id?: InputMaybe<Scalars["ID"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type QueryProjectPostingsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryProjectTypesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
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
  jobPostingId?: InputMaybe<Scalars["ID"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type QueryTopicsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryVerifyPasswordResetTokenArgs = {
  token: Scalars["String"];
};

export type QueryZipCityJobsArgs = {
  branchId?: InputMaybe<Scalars["ID"]>;
  jobTypeId?: InputMaybe<Scalars["ID"]>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RefreshToken = {
  __typename?: "RefreshToken";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  payload?: Maybe<Scalars["GenericScalar"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
  token?: Maybe<Scalars["String"]>;
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
  id?: InputMaybe<Scalars["ID"]>;
  /** Mobile */
  mobile: Scalars["String"];
};

export type Revoke = {
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
export type SendPasswordResetEmail = {
  __typename?: "SendPasswordResetEmail";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type Skill = Node & {
  __typename?: "Skill";
  /** The ID of the object. */
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
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type SoftSkill = Node & {
  __typename?: "SoftSkill";
  company: Scalars["String"];
  /** The ID of the object. */
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
  id: Scalars["ID"];
};

export type Student = Node & {
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
  id: Scalars["ID"];
};

export type StudentMatchingInput = {
  jobPosting: JobPostingInput;
};

/** Updates the profile of a student */
export type StudentProfileAbilities = {
  __typename?: "StudentProfileAbilities";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates the profile of a student */
export type StudentProfileBaseData = {
  __typename?: "StudentProfileBaseData";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates soft skills and cultural fits of a student */
export type StudentProfileCharacter = {
  __typename?: "StudentProfileCharacter";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates the state of a student */
export type StudentProfileCondition = {
  __typename?: "StudentProfileCondition";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates job option, date (start or range) and branch of a student */
export type StudentProfileEmployment = {
  __typename?: "StudentProfileEmployment";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type StudentProfileInputAbilities = {
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

export type StudentProfileInputBaseData = {
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

export type StudentProfileInputCharacter = {
  culturalFits?: InputMaybe<Array<InputMaybe<CulturalFitInput>>>;
  softSkills?: InputMaybe<Array<InputMaybe<SoftSkillInput>>>;
};

export type StudentProfileInputCondition = {
  /** State */
  state: Scalars["String"];
};

export type StudentProfileInputEmployment = {
  branch?: InputMaybe<BranchInput>;
  jobFromDate?: InputMaybe<Scalars["String"]>;
  jobToDate?: InputMaybe<Scalars["String"]>;
  jobType: JobTypeInput;
};

export type StudentProfileInputSpecificData = {
  /** Nickname */
  nickname: Scalars["String"];
};

/** Updates the nickname of a student */
export type StudentProfileSpecificData = {
  __typename?: "StudentProfileSpecificData";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  nicknameSuggestions?: Maybe<Array<Maybe<Scalars["String"]>>>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type Topic = Node & {
  __typename?: "Topic";
  /** The ID of the object. */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type TopicConnection = {
  __typename?: "TopicConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TopicEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Topic` and its cursor. */
export type TopicEdge = {
  __typename?: "TopicEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<Topic>;
};

export type TopicInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

/** Updates the profile of a university */
export type UniversityProfileBaseData = {
  __typename?: "UniversityProfileBaseData";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type UniversityProfileInputBaseData = {
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

export type UniversityProfileInputRelations = {
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

export type UniversityProfileInputSpecificData = {
  /** description */
  description?: InputMaybe<Scalars["String"]>;
};

export type UniversityProfileInputValues = {
  /** Cultural Fit */
  culturalFits?: InputMaybe<Array<InputMaybe<CulturalFitInput>>>;
  /** Soft Skills */
  softSkills?: InputMaybe<Array<InputMaybe<SoftSkillInput>>>;
};

/** Updates website services */
export type UniversityProfileRelations = {
  __typename?: "UniversityProfileRelations";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates branches and description */
export type UniversityProfileSpecificData = {
  __typename?: "UniversityProfileSpecificData";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

/** Updates a company profile with soft skills and cultural fit */
export type UniversityProfileValues = {
  __typename?: "UniversityProfileValues";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
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

export type UserLanguageRelation = Node & {
  __typename?: "UserLanguageRelation";
  /** The ID of the object. */
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
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  languageLevel?: InputMaybe<Scalars["ID"]>;
};

export type UserNode = Node & {
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
export type UserRequest = {
  __typename?: "UserRequest";
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type UserRequestInput = {
  /** E-Mail */
  email: Scalars["String"];
  /** Message */
  message: Scalars["String"];
  /** Name */
  name: Scalars["String"];
};

/** An enumeration. */
export enum UserType {
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

export type UserUpload = {
  __typename?: "UserUpload";
  attachment?: Maybe<Attachment>;
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
