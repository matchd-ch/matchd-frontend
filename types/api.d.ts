import gql from "graphql-tag";
type Maybe<T> = T | null;
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

/** Adds a new emplyoee to a comany */
type AddEmployee = {
  __typename?: "AddEmployee";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  employee?: Maybe<Employee>;
};

type AddEmployeeInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  role: Scalars["String"];
  email: Scalars["String"];
};

type Attachment = {
  __typename?: "Attachment";
  id: Scalars["ID"];
  url: Scalars["String"];
  mimeType: Scalars["String"];
  fileSize: Scalars["Int"];
  fileName: Scalars["String"];
};

/** An enumeration. */
enum AttachmentKey {
  StudentAvatar = "STUDENT_AVATAR",
  StudentDocuments = "STUDENT_DOCUMENTS",
  CompanyAvatar = "COMPANY_AVATAR",
  CompanyDocuments = "COMPANY_DOCUMENTS",
  StudentAvatarFallback = "STUDENT_AVATAR_FALLBACK",
  CompanyAvatarFallback = "COMPANY_AVATAR_FALLBACK",
  ProjectPostingImages = "PROJECT_POSTING_IMAGES",
  ProjectPostingDocuments = "PROJECT_POSTING_DOCUMENTS",
  ProjectPostingFallback = "PROJECT_POSTING_FALLBACK",
}

type Benefit = {
  __typename?: "Benefit";
  id: Scalars["ID"];
  icon: Scalars["String"];
  name: Scalars["String"];
};

type BenefitInput = {
  id: Scalars["ID"];
  icon?: Maybe<Scalars["String"]>;
};

type Branch = {
  __typename?: "Branch";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type BranchInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

type Company = {
  __typename?: "Company";
  id: Scalars["ID"];
  type: ProfileType;
  state: ProfileState;
  profileStep: Scalars["Int"];
  slug: Scalars["String"];
  name: Scalars["String"];
  zip: Scalars["String"];
  city: Scalars["String"];
  street: Scalars["String"];
  phone: Scalars["String"];
  website: Scalars["String"];
  branches: Array<Branch>;
  description: Scalars["String"];
  softSkills?: Maybe<Array<SoftSkill>>;
  uid: Scalars["String"];
  services: Scalars["String"];
  memberItStGallen: Scalars["Boolean"];
  benefits: Array<Benefit>;
  culturalFits?: Maybe<Array<CulturalFit>>;
  topLevelOrganisationDescription: Scalars["String"];
  topLevelOrganisationWebsite: Scalars["String"];
  linkEducation?: Maybe<Scalars["String"]>;
  linkProjects?: Maybe<Scalars["String"]>;
  linkThesis?: Maybe<Scalars["String"]>;
  jobPostings: Array<JobPosting>;
  employees: Array<Employee>;
  projectPostings: Array<ProjectPosting>;
  displayName: Scalars["String"];
};

type CompanyProfileInputStep1 = {
  /** First name */
  firstName: Scalars["String"];
  /** Last name */
  lastName: Scalars["String"];
  /** Name */
  name?: Maybe<Scalars["String"]>;
  /** Street */
  street: Scalars["String"];
  /** Zip */
  zip: Scalars["String"];
  /** City */
  city: Scalars["String"];
  /** Phone Number */
  phone?: Maybe<Scalars["String"]>;
  /** role */
  role: Scalars["String"];
};

type CompanyProfileInputStep2 = {
  /** website */
  website: Scalars["String"];
  /** description */
  description?: Maybe<Scalars["String"]>;
  /** services */
  services?: Maybe<Scalars["String"]>;
  /** memeber IT St. Gallen */
  memberItStGallen: Scalars["Boolean"];
};

type CompanyProfileInputStep3 = {
  /** Branches */
  branches?: Maybe<Array<Maybe<BranchInput>>>;
  /** Benefits */
  benefits?: Maybe<Array<Maybe<BenefitInput>>>;
};

type CompanyProfileInputStep4 = {
  /** Soft Skills */
  softSkills?: Maybe<Array<Maybe<SoftSkillInput>>>;
  /** Cultural Fit */
  culturalFits?: Maybe<Array<Maybe<CulturalFitInput>>>;
};

/** Updates the profile of a Company */
type CompanyProfileStep1 = {
  __typename?: "CompanyProfileStep1";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

/** Updates website url, description, services, member IT St.Gallen */
type CompanyProfileStep2 = {
  __typename?: "CompanyProfileStep2";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

/** Updates the Company Profile with benefits and branches */
type CompanyProfileStep3 = {
  __typename?: "CompanyProfileStep3";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

/** Updates a company profile with soft skills and cultural fit */
type CompanyProfileStep4 = {
  __typename?: "CompanyProfileStep4";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type CulturalFit = {
  __typename?: "CulturalFit";
  id: Scalars["ID"];
  student: Scalars["String"];
  company: Scalars["String"];
};

type CulturalFitInput = {
  id: Scalars["ID"];
};

type Dashboard = {
  __typename?: "Dashboard";
  jobPostings?: Maybe<Array<JobPosting>>;
  projectPostings?: Maybe<Array<ProjectPosting>>;
  latestJobPostings?: Maybe<Array<JobPosting>>;
  latestProjectPostings?: Maybe<Array<ProjectPosting>>;
  requestedMatches?: Maybe<Array<JobPostingMatchInfo>>;
  unconfirmedMatches?: Maybe<Array<JobPostingMatchInfo>>;
  confirmedMatches?: Maybe<Array<JobPostingMatchInfo>>;
  projectMatches?: Maybe<Array<ProjectPostingMatchInfo>>;
};

/** An enumeration. */
enum DateMode {
  DateFrom = "DATE_FROM",
  DateRange = "DATE_RANGE",
}

type DeleteAttachment = {
  __typename?: "DeleteAttachment";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type Employee = {
  __typename?: "Employee";
  id: Scalars["ID"];
  role: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
};

type EmployeeInput = {
  id?: Maybe<Scalars["ID"]>;
  /** Role */
  role?: Maybe<Scalars["String"]>;
};

type FaqCategory = {
  __typename?: "FAQCategory";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type Hobby = {
  __typename?: "Hobby";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type HobbyInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

type JobPosting = {
  __typename?: "JobPosting";
  id: Scalars["ID"];
  title: Scalars["String"];
  slug: Scalars["String"];
  description: Scalars["String"];
  jobType: JobType;
  branches: Array<Branch>;
  workload: Scalars["Int"];
  company: Company;
  jobFromDate: Scalars["Date"];
  jobToDate?: Maybe<Scalars["Date"]>;
  url?: Maybe<Scalars["String"]>;
  jobRequirements: Array<JobRequirement>;
  skills?: Maybe<Array<Skill>>;
  formStep: Scalars["Int"];
  state: JobPostingState;
  employee?: Maybe<Employee>;
  dateCreated?: Maybe<Scalars["Date"]>;
  datePublished?: Maybe<Scalars["Date"]>;
  languages?: Maybe<Array<JobPostingLanguageRelation>>;
  displayTitle: Scalars["String"];
  matchStatus?: Maybe<MatchStatus>;
  matchHints?: Maybe<MatchHints>;
};

type JobPostingInput = {
  id: Scalars["ID"];
};

type JobPostingInputStep1 = {
  id?: Maybe<Scalars["ID"]>;
  /** Title */
  title: Scalars["String"];
  /** Description */
  description?: Maybe<Scalars["String"]>;
  jobType: JobTypeInput;
  branches: Array<Maybe<BranchInput>>;
  /** Workload */
  workload: Scalars["Int"];
  jobFromDate: Scalars["String"];
  jobToDate?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

type JobPostingInputStep2 = {
  id?: Maybe<Scalars["ID"]>;
  jobRequirements?: Maybe<Array<Maybe<JobRequirementInput>>>;
  skills?: Maybe<Array<Maybe<SkillInput>>>;
  languages?: Maybe<Array<Maybe<JobPostingLanguageRelationInput>>>;
};

type JobPostingInputStep3 = {
  id?: Maybe<Scalars["ID"]>;
  /** State */
  state: Scalars["String"];
  employee: EmployeeInput;
};

type JobPostingLanguageRelation = {
  __typename?: "JobPostingLanguageRelation";
  id: Scalars["ID"];
  language: Language;
  languageLevel: LanguageLevel;
};

type JobPostingLanguageRelationInput = {
  id?: Maybe<Scalars["ID"]>;
  language?: Maybe<Scalars["ID"]>;
  languageLevel?: Maybe<Scalars["ID"]>;
};

type JobPostingMatchInfo = {
  __typename?: "JobPostingMatchInfo";
  id: Scalars["ID"];
  student: Student;
  jobPosting: JobPosting;
};

type JobPostingMatchingInput = {
  branch?: Maybe<BranchInput>;
  jobType?: Maybe<JobTypeInput>;
  workload?: Maybe<Scalars["Int"]>;
  zip?: Maybe<ZipCityInput>;
};

/** An enumeration. */
enum JobPostingState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

/** Creates a job posting */
type JobPostingStep1 = {
  __typename?: "JobPostingStep1";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  slug?: Maybe<Scalars["String"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
};

/** Updates a job posting */
type JobPostingStep2 = {
  __typename?: "JobPostingStep2";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  slug?: Maybe<Scalars["String"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
};

/** Updates a job posting */
type JobPostingStep3 = {
  __typename?: "JobPostingStep3";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  slug?: Maybe<Scalars["String"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
};

type JobRequirement = {
  __typename?: "JobRequirement";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type JobRequirementInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

type JobType = {
  __typename?: "JobType";
  id: Scalars["ID"];
  name: Scalars["String"];
  mode: DateMode;
};

type JobTypeInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  mode?: Maybe<Scalars["String"]>;
};

type Keyword = {
  __typename?: "Keyword";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type KeywordInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

type Language = {
  __typename?: "Language";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type LanguageLevel = {
  __typename?: "LanguageLevel";
  id: Scalars["ID"];
  level: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

type Match = {
  __typename?: "Match";
  id?: Maybe<Scalars["ID"]>;
  slug: Scalars["String"];
  name: Scalars["String"];
  type: MatchType;
  avatar?: Maybe<Scalars["String"]>;
  score: Scalars["Float"];
  rawScore: Scalars["Float"];
  title?: Maybe<Scalars["String"]>;
  matchStatus?: Maybe<MatchStatus>;
  description?: Maybe<Scalars["String"]>;
  keywords?: Maybe<Array<Keyword>>;
};

type MatchHints = {
  __typename?: "MatchHints";
  hasRequestedMatch: Scalars["Boolean"];
  hasConfirmedMatch: Scalars["Boolean"];
};

/** Initiate or confirm Matching */
type MatchJobPosting = {
  __typename?: "MatchJobPosting";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  confirmed: Scalars["Boolean"];
};

type MatchJobPostingInput = {
  jobPosting: JobPostingInput;
};

/** Initiate or confirm Matching */
type MatchProjectPosting = {
  __typename?: "MatchProjectPosting";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  confirmed: Scalars["Boolean"];
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
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  confirmed: Scalars["Boolean"];
};

type MatchStudentInput = {
  student: StudentInput;
  jobPosting: JobPostingInput;
};

/** An enumeration. */
enum MatchType {
  Student = "STUDENT",
  JobPosting = "JOB_POSTING",
  ProjectPosting = "PROJECT_POSTING",
  Company = "COMPANY",
  University = "UNIVERSITY",
}

type Mutation = {
  __typename?: "Mutation";
  /** Creates a project posting */
  projectPostingStep1?: Maybe<ProjectPostingStep1>;
  /** Creates a project posting */
  projectPostingStep2?: Maybe<ProjectPostingStep2>;
  /** Updates a project posting */
  projectPostingStep3?: Maybe<ProjectPostingStep3>;
  /** Initiate or confirm Matching */
  matchStudent?: Maybe<MatchStudent>;
  /** Initiate or confirm Matching */
  matchJobPosting?: Maybe<MatchJobPosting>;
  /** Initiate or confirm Matching */
  matchProjectPosting?: Maybe<MatchProjectPosting>;
  /** Adds a new emplyoee to a comany */
  addEmployee?: Maybe<AddEmployee>;
  /** Creates a job posting */
  jobPostingStep1?: Maybe<JobPostingStep1>;
  /** Updates a job posting */
  jobPostingStep2?: Maybe<JobPostingStep2>;
  /** Updates a job posting */
  jobPostingStep3?: Maybe<JobPostingStep3>;
  deleteAttachment?: Maybe<DeleteAttachment>;
  upload?: Maybe<UserUpload>;
  /** Updates the profile of a university */
  universityProfileStep1?: Maybe<UniversityProfileStep1>;
  /** Updates branches and description */
  universityProfileStep2?: Maybe<UniversityProfileStep2>;
  /** Updates website services */
  universityProfileStep3?: Maybe<UniversityProfileStep3>;
  /** Updates a company profile with soft skills and cultural fit */
  universityProfileStep4?: Maybe<UniversityProfileStep4>;
  /** Updates the profile of a Company */
  companyProfileStep1?: Maybe<CompanyProfileStep1>;
  /** Updates website url, description, services, member IT St.Gallen */
  companyProfileStep2?: Maybe<CompanyProfileStep2>;
  /** Updates the Company Profile with benefits and branches */
  companyProfileStep3?: Maybe<CompanyProfileStep3>;
  /** Updates a company profile with soft skills and cultural fit */
  companyProfileStep4?: Maybe<CompanyProfileStep4>;
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
  logout?: Maybe<Scalars["Boolean"]>;
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
  /** Same as `grapgql_jwt` implementation, with standard output. */
  refreshToken?: Maybe<RefreshToken>;
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
  /** Creates a new user user request */
  userRequest?: Maybe<UserRequest>;
  /** Creates a new user with company */
  registerCompany?: Maybe<RegisterCompany>;
  /** Creates a new user as student */
  registerStudent?: Maybe<RegisterStudent>;
  /**
   * Verify user account.
   *
   * Receive the token that was sent by email.
   * If the token is valid, make the user verified
   * by making the `user.status.verified` field true.
   */
  verifyAccount?: Maybe<VerifyAccount>;
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

type MutationMatchStudentArgs = {
  match: MatchStudentInput;
};

type MutationMatchJobPostingArgs = {
  match: MatchJobPostingInput;
};

type MutationMatchProjectPostingArgs = {
  match: MatchProjectPostingInput;
};

type MutationAddEmployeeArgs = {
  addEmployee: AddEmployeeInput;
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

type MutationDeleteAttachmentArgs = {
  id?: Maybe<Scalars["ID"]>;
};

type MutationUploadArgs = {
  file: Scalars["Upload"];
  key: AttachmentKey;
  projectPosting?: Maybe<ProjectPostingInput>;
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
  step4?: Maybe<StudentProfileInputStep4>;
};

type MutationStudentProfileStep5Args = {
  step5: StudentProfileInputStep5;
};

type MutationStudentProfileStep6Args = {
  step6: StudentProfileInputStep6;
};

type MutationTokenAuthArgs = {
  password: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

type MutationRefreshTokenArgs = {
  refreshToken: Scalars["String"];
};

type MutationRevokeTokenArgs = {
  refreshToken: Scalars["String"];
};

type MutationSendPasswordResetEmailArgs = {
  email: Scalars["String"];
};

type MutationPasswordResetArgs = {
  token: Scalars["String"];
  newPassword1: Scalars["String"];
  newPassword2: Scalars["String"];
};

type MutationUserRequestArgs = {
  input: UserRequestInput;
};

type MutationRegisterCompanyArgs = {
  company: RegisterCompanyInput;
  employee: EmployeeInput;
  email: Scalars["String"];
  username: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  type: Scalars["String"];
  password1: Scalars["String"];
  password2: Scalars["String"];
};

type MutationRegisterStudentArgs = {
  student?: Maybe<RegisterStudentInput>;
  email: Scalars["String"];
  username: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  type: Scalars["String"];
  password1: Scalars["String"];
  password2: Scalars["String"];
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
  token?: Maybe<Scalars["String"]>;
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  user?: Maybe<UserNode>;
  unarchiving?: Maybe<Scalars["Boolean"]>;
  refreshToken?: Maybe<Scalars["String"]>;
};

type OnlineProject = {
  __typename?: "OnlineProject";
  id: Scalars["ID"];
  url: Scalars["String"];
};

type OnlineProjectInput = {
  id?: Maybe<Scalars["ID"]>;
  url?: Maybe<Scalars["String"]>;
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
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

/** An enumeration. */
enum ProfileState {
  Incomplete = "INCOMPLETE",
  Anonymous = "ANONYMOUS",
  Public = "PUBLIC",
}

/** An enumeration. */
enum ProfileType {
  Internal = "INTERNAL",
  Student = "STUDENT",
  CollegeStudent = "COLLEGE_STUDENT",
  Junior = "JUNIOR",
  Company = "COMPANY",
  University = "UNIVERSITY",
  Other = "OTHER",
}

type ProjectPosting = {
  __typename?: "ProjectPosting";
  id: Scalars["ID"];
  title: Scalars["String"];
  slug: Scalars["String"];
  projectType: ProjectType;
  topic: Topic;
  keywords?: Maybe<Array<Keyword>>;
  description: Scalars["String"];
  additionalInformation: Scalars["String"];
  website: Scalars["String"];
  projectFromDate?: Maybe<Scalars["Date"]>;
  employee?: Maybe<Employee>;
  student?: Maybe<Student>;
  company?: Maybe<Company>;
  formStep: Scalars["Int"];
  state: ProjectPostingState;
  dateCreated?: Maybe<Scalars["Date"]>;
  datePublished?: Maybe<Scalars["Date"]>;
  displayTitle: Scalars["String"];
  matchStatus?: Maybe<MatchStatus>;
  matchHints?: Maybe<MatchHints>;
};

type ProjectPostingInput = {
  id: Scalars["ID"];
};

type ProjectPostingInputStep1 = {
  id?: Maybe<Scalars["ID"]>;
  /** Title */
  title: Scalars["String"];
  projectType: ProjectTypeInput;
  topic: TopicInput;
  keywords?: Maybe<Array<Maybe<KeywordInput>>>;
  /** Description */
  description: Scalars["String"];
  /** Additional Information */
  additionalInformation?: Maybe<Scalars["String"]>;
};

type ProjectPostingInputStep2 = {
  id?: Maybe<Scalars["ID"]>;
  projectFromDate?: Maybe<Scalars["String"]>;
  website?: Maybe<Scalars["String"]>;
};

type ProjectPostingInputStep3 = {
  id?: Maybe<Scalars["ID"]>;
  /** State */
  state: Scalars["String"];
  employee?: Maybe<EmployeeInput>;
};

type ProjectPostingMatchInfo = {
  __typename?: "ProjectPostingMatchInfo";
  id: Scalars["ID"];
  student?: Maybe<Student>;
  projectPosting: ProjectPosting;
  company?: Maybe<Company>;
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
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  slug?: Maybe<Scalars["String"]>;
  projectPostingId?: Maybe<Scalars["ID"]>;
};

/** Creates a project posting */
type ProjectPostingStep2 = {
  __typename?: "ProjectPostingStep2";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  slug?: Maybe<Scalars["String"]>;
  projectPostingId?: Maybe<Scalars["ID"]>;
};

/** Updates a project posting */
type ProjectPostingStep3 = {
  __typename?: "ProjectPostingStep3";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  slug?: Maybe<Scalars["String"]>;
  projectPostingId?: Maybe<Scalars["ID"]>;
};

type ProjectType = {
  __typename?: "ProjectType";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type ProjectTypeInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

type Query = {
  __typename?: "Query";
  projectPosting?: Maybe<ProjectPosting>;
  projectPostings?: Maybe<Array<Maybe<ProjectPosting>>>;
  projectTypes?: Maybe<Array<Maybe<ProjectType>>>;
  topics?: Maybe<Array<Maybe<Topic>>>;
  keywords?: Maybe<Array<Maybe<Keyword>>>;
  dashboard?: Maybe<Dashboard>;
  student?: Maybe<Student>;
  matches?: Maybe<Array<Maybe<Match>>>;
  culturalFits?: Maybe<Array<Maybe<CulturalFit>>>;
  softSkills?: Maybe<Array<Maybe<SoftSkill>>>;
  faqCategories?: Maybe<Array<Maybe<FaqCategory>>>;
  jobRequirements?: Maybe<Array<Maybe<JobRequirement>>>;
  jobPostings?: Maybe<Array<Maybe<JobPosting>>>;
  jobPosting?: Maybe<JobPosting>;
  company?: Maybe<Company>;
  uploadConfigurations?: Maybe<Array<Maybe<UploadConfiguration>>>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  branches?: Maybe<Array<Maybe<Branch>>>;
  benefits?: Maybe<Array<Maybe<Benefit>>>;
  skills?: Maybe<Array<Maybe<Skill>>>;
  jobTypes?: Maybe<Array<Maybe<JobType>>>;
  zipCity: Array<ZipCity>;
  zipCityJobs: Array<ZipCity>;
  languageLevels?: Maybe<Array<Maybe<LanguageLevel>>>;
  languages?: Maybe<Array<Maybe<Language>>>;
  me?: Maybe<User>;
  verifyPasswordResetToken?: Maybe<Scalars["Boolean"]>;
};

type QueryProjectPostingArgs = {
  id?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
};

type QueryStudentArgs = {
  slug?: Maybe<Scalars["String"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
};

type QueryMatchesArgs = {
  first?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  techBoost?: Maybe<Scalars["Int"]>;
  softBoost?: Maybe<Scalars["Int"]>;
  jobPostingMatching?: Maybe<JobPostingMatchingInput>;
  studentMatching?: Maybe<StudentMatchingInput>;
  projectPostingMatching?: Maybe<ProjectPostingMatchingInput>;
};

type QueryJobPostingsArgs = {
  slug?: Maybe<Scalars["String"]>;
};

type QueryJobPostingArgs = {
  id?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
};

type QueryCompanyArgs = {
  slug?: Maybe<Scalars["String"]>;
};

type QueryAttachmentsArgs = {
  key: AttachmentKey;
  slug?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
};

type QueryZipCityJobsArgs = {
  branchId?: Maybe<Scalars["ID"]>;
  jobTypeId?: Maybe<Scalars["ID"]>;
};

type QueryLanguagesArgs = {
  shortList?: Maybe<Scalars["Boolean"]>;
};

type QueryVerifyPasswordResetTokenArgs = {
  token: Scalars["String"];
};

/** Same as `grapgql_jwt` implementation, with standard output. */
type RefreshToken = {
  __typename?: "RefreshToken";
  token?: Maybe<Scalars["String"]>;
  payload?: Maybe<Scalars["GenericScalar"]>;
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  refreshToken?: Maybe<Scalars["String"]>;
};

/** Creates a new user with company */
type RegisterCompany = {
  __typename?: "RegisterCompany";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type RegisterCompanyInput = {
  /** Name */
  name: Scalars["String"];
  /** UID */
  uid?: Maybe<Scalars["String"]>;
  /** ZIP */
  zip: Scalars["String"];
  /** City */
  city: Scalars["String"];
};

/** Creates a new user as student */
type RegisterStudent = {
  __typename?: "RegisterStudent";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type RegisterStudentInput = {
  id?: Maybe<Scalars["ID"]>;
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
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type Skill = {
  __typename?: "Skill";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type SkillInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

type SoftSkill = {
  __typename?: "SoftSkill";
  id: Scalars["ID"];
  student: Scalars["String"];
  company: Scalars["String"];
};

type SoftSkillInput = {
  id: Scalars["ID"];
};

type Student = {
  __typename?: "Student";
  id: Scalars["ID"];
  mobile?: Maybe<Scalars["String"]>;
  street?: Maybe<Scalars["String"]>;
  zip?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  dateOfBirth?: Maybe<Scalars["String"]>;
  nickname?: Maybe<Scalars["String"]>;
  schoolName?: Maybe<Scalars["String"]>;
  fieldOfStudy?: Maybe<Scalars["String"]>;
  graduation?: Maybe<Scalars["String"]>;
  branch?: Maybe<Branch>;
  jobType?: Maybe<JobType>;
  jobFromDate?: Maybe<Scalars["Date"]>;
  jobToDate?: Maybe<Scalars["Date"]>;
  skills: Array<Skill>;
  distinction?: Maybe<Scalars["String"]>;
  state: ProfileState;
  profileStep: Scalars["Int"];
  softSkills: Array<SoftSkill>;
  culturalFits: Array<CulturalFit>;
  slug: Scalars["String"];
  hobbies?: Maybe<Array<Hobby>>;
  onlineProjects?: Maybe<Array<OnlineProject>>;
  languages: Array<UserLanguageRelation>;
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  matchStatus?: Maybe<MatchStatus>;
};

type StudentInput = {
  id: Scalars["ID"];
};

type StudentMatchingInput = {
  jobPosting: JobPostingInput;
};

type StudentProfileInputStep1 = {
  /** First name */
  firstName: Scalars["String"];
  /** Last name */
  lastName: Scalars["String"];
  /** street */
  street?: Maybe<Scalars["String"]>;
  /** Zip */
  zip?: Maybe<Scalars["String"]>;
  /** City */
  city?: Maybe<Scalars["String"]>;
  /** Date of birth */
  dateOfBirth: Scalars["String"];
  /** Date of birth */
  mobile?: Maybe<Scalars["String"]>;
};

type StudentProfileInputStep2 = {
  jobType: JobTypeInput;
  jobFromDate?: Maybe<Scalars["String"]>;
  jobToDate?: Maybe<Scalars["String"]>;
  branch?: Maybe<BranchInput>;
};

type StudentProfileInputStep3 = {
  softSkills?: Maybe<Array<Maybe<SoftSkillInput>>>;
  culturalFits?: Maybe<Array<Maybe<CulturalFitInput>>>;
};

type StudentProfileInputStep4 = {
  /** Skills */
  skills?: Maybe<Array<Maybe<SkillInput>>>;
  /** Hobbies */
  hobbies?: Maybe<Array<Maybe<HobbyInput>>>;
  /** Online_Projects */
  onlineProjects?: Maybe<Array<Maybe<OnlineProjectInput>>>;
  /** Languages */
  languages: Array<Maybe<UserLanguageRelationInput>>;
  /** Distinction */
  distinction?: Maybe<Scalars["String"]>;
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
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

/** Updates job option, date (start or range) and branch of a student */
type StudentProfileStep2 = {
  __typename?: "StudentProfileStep2";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

/** Updates soft skills and cultural fits of a student */
type StudentProfileStep3 = {
  __typename?: "StudentProfileStep3";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

/** Updates the profile of a student */
type StudentProfileStep4 = {
  __typename?: "StudentProfileStep4";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

/** Updates the nickname of a student */
type StudentProfileStep5 = {
  __typename?: "StudentProfileStep5";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  nicknameSuggestions?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

/** Updates the state of a student */
type StudentProfileStep6 = {
  __typename?: "StudentProfileStep6";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type Topic = {
  __typename?: "Topic";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type TopicInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

type UniversityProfileInputStep1 = {
  /** First name */
  firstName: Scalars["String"];
  /** Last name */
  lastName: Scalars["String"];
  /** Name */
  name?: Maybe<Scalars["String"]>;
  /** Street */
  street: Scalars["String"];
  /** Zip */
  zip: Scalars["String"];
  /** City */
  city: Scalars["String"];
  /** Phone Number */
  phone?: Maybe<Scalars["String"]>;
  /** role */
  role: Scalars["String"];
  /** website */
  website: Scalars["String"];
  /** description */
  topLevelOrganisationDescription?: Maybe<Scalars["String"]>;
  /** website dachorganisation */
  topLevelOrganisationWebsite?: Maybe<Scalars["String"]>;
};

type UniversityProfileInputStep2 = {
  /** description */
  description?: Maybe<Scalars["String"]>;
};

type UniversityProfileInputStep3 = {
  /** services */
  services?: Maybe<Scalars["String"]>;
  /** website education */
  linkEducation?: Maybe<Scalars["String"]>;
  /** website projects */
  linkProjects?: Maybe<Scalars["String"]>;
  /** website thesis */
  linkThesis?: Maybe<Scalars["String"]>;
  /** Branches */
  branches?: Maybe<Array<Maybe<BranchInput>>>;
  /** Benefits */
  benefits?: Maybe<Array<Maybe<BenefitInput>>>;
};

type UniversityProfileInputStep4 = {
  /** Soft Skills */
  softSkills?: Maybe<Array<Maybe<SoftSkillInput>>>;
  /** Cultural Fit */
  culturalFits?: Maybe<Array<Maybe<CulturalFitInput>>>;
};

/** Updates the profile of a university */
type UniversityProfileStep1 = {
  __typename?: "UniversityProfileStep1";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

/** Updates branches and description */
type UniversityProfileStep2 = {
  __typename?: "UniversityProfileStep2";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

/** Updates website services */
type UniversityProfileStep3 = {
  __typename?: "UniversityProfileStep3";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

/** Updates a company profile with soft skills and cultural fit */
type UniversityProfileStep4 = {
  __typename?: "UniversityProfileStep4";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type UploadConfiguration = {
  __typename?: "UploadConfiguration";
  contentTypesConfiguration: Array<UploadTypeConfiguration>;
  maxFiles: Scalars["Int"];
  key: AttachmentKey;
};

type UploadTypeConfiguration = {
  __typename?: "UploadTypeConfiguration";
  contentTypes: Array<Scalars["String"]>;
  maxSize: Scalars["Int"];
};

type User = {
  __typename?: "User";
  id: Scalars["ID"];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
  email: Scalars["String"];
  type: ProfileType;
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  company?: Maybe<Company>;
  student?: Maybe<Student>;
  employee?: Maybe<Employee>;
};

type UserLanguageRelation = {
  __typename?: "UserLanguageRelation";
  id: Scalars["ID"];
  language: Language;
  languageLevel: LanguageLevel;
};

type UserLanguageRelationInput = {
  id?: Maybe<Scalars["ID"]>;
  language?: Maybe<Scalars["ID"]>;
  languageLevel?: Maybe<Scalars["ID"]>;
};

type UserNode = Node & {
  __typename?: "UserNode";
  /** The ID of the object. */
  id: Scalars["ID"];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
  email: Scalars["String"];
  type: UserType;
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  company?: Maybe<Company>;
  student?: Maybe<Student>;
  employee?: Maybe<Employee>;
  pk?: Maybe<Scalars["Int"]>;
  archived?: Maybe<Scalars["Boolean"]>;
  verified?: Maybe<Scalars["Boolean"]>;
  secondaryEmail?: Maybe<Scalars["String"]>;
};

/** Creates a new user user request */
type UserRequest = {
  __typename?: "UserRequest";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type UserRequestInput = {
  /** Name */
  name: Scalars["String"];
  /** E-Mail */
  email: Scalars["String"];
  /** Message */
  message: Scalars["String"];
};

/** An enumeration. */
enum UserType {
  /** Internal */
  Internal = "INTERNAL",
  /** Student */
  Student = "STUDENT",
  /** College Student */
  CollegeStudent = "COLLEGE_STUDENT",
  /** Junior */
  Junior = "JUNIOR",
  /** Company */
  Company = "COMPANY",
  /** University */
  University = "UNIVERSITY",
  /** Other */
  Other = "OTHER",
}

type UserUpload = {
  __typename?: "UserUpload";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
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
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type ZipCity = {
  __typename?: "ZipCity";
  zip: Scalars["String"];
  city: Scalars["String"];
  canton: Scalars["String"];
};

type ZipCityInput = {
  zip: Scalars["String"];
};
