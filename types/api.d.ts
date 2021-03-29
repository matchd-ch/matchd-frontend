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
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

type Query = {
  __typename?: "Query";
  softSkills?: Maybe<Array<Maybe<SoftSkill>>>;
  faqCategories?: Maybe<Array<Maybe<FaqCategory>>>;
  expectations?: Maybe<Array<Maybe<Expectation>>>;
  jobPostings?: Maybe<Array<Maybe<JobPosting>>>;
  jobPosting?: Maybe<JobPosting>;
  company?: Maybe<Company>;
  uploadConfigurations?: Maybe<Array<Maybe<UploadConfiguration>>>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  branches?: Maybe<Array<Maybe<Branch>>>;
  benefits?: Maybe<Array<Maybe<Benefit>>>;
  skills?: Maybe<Array<Maybe<Skill>>>;
  jobPositions?: Maybe<Array<Maybe<JobPosition>>>;
  jobOptions?: Maybe<Array<Maybe<JobOption>>>;
  zipCity: Array<ZipCity>;
  languageLevels?: Maybe<Array<Maybe<LanguageLevel>>>;
  languages?: Maybe<Array<Maybe<Language>>>;
  me?: Maybe<User>;
  verifyPasswordResetToken?: Maybe<Scalars["Boolean"]>;
};

type QueryJobPostingsArgs = {
  company: Scalars["Int"];
};

type QueryJobPostingArgs = {
  id: Scalars["ID"];
};

type QueryCompanyArgs = {
  slug?: Maybe<Scalars["String"]>;
};

type QueryAttachmentsArgs = {
  key: AttachmentKey;
  userId?: Maybe<Scalars["Int"]>;
  slug?: Maybe<Scalars["String"]>;
};

type QueryLanguagesArgs = {
  shortList?: Maybe<Scalars["Boolean"]>;
};

type QueryVerifyPasswordResetTokenArgs = {
  token: Scalars["String"];
};

type SoftSkill = {
  __typename?: "SoftSkill";
  id: Scalars["ID"];
  student: Scalars["String"];
  company: Scalars["String"];
};

type FaqCategory = {
  __typename?: "FAQCategory";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type Expectation = {
  __typename?: "Expectation";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type JobPosting = {
  __typename?: "JobPosting";
  id: Scalars["ID"];
  description: Scalars["String"];
  jobOption: JobOption;
  branch: Branch;
  workload: Scalars["Int"];
  company: Company;
  jobFromDate: Scalars["Date"];
  jobToDate?: Maybe<Scalars["Date"]>;
  url?: Maybe<Scalars["String"]>;
  expectations: Array<Expectation>;
  skills: Array<Skill>;
  formStep: Scalars["Int"];
  state: JobPostingState;
  employee: Employee;
  languages: Array<JobPostingLanguageRelation>;
};

type JobOption = {
  __typename?: "JobOption";
  id: Scalars["ID"];
  name: Scalars["String"];
  mode: JobOptionMode;
};

/** An enumeration. */
enum JobOptionMode {
  DateFrom = "DATE_FROM",
  DateRange = "DATE_RANGE",
}

type Branch = {
  __typename?: "Branch";
  id: Scalars["ID"];
  name: Scalars["String"];
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
  branch?: Maybe<Branch>;
  description: Scalars["String"];
  softSkills: Array<SoftSkill>;
  uid: Scalars["String"];
  services: Scalars["String"];
  memberItStGallen: Scalars["Boolean"];
  benefits: Array<Benefit>;
  jobPositions: Array<JobPosition>;
  topLevelOrganisationDescription: Scalars["String"];
  topLevelOrganisationWebsite: Scalars["String"];
  linkEducation?: Maybe<Scalars["String"]>;
  linkProjects?: Maybe<Scalars["String"]>;
  linkThesis?: Maybe<Scalars["String"]>;
  employees: Array<Employee>;
};

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

/** An enumeration. */
enum ProfileState {
  Incomplete = "INCOMPLETE",
  Anonymous = "ANONYMOUS",
  Public = "PUBLIC",
}

type Benefit = {
  __typename?: "Benefit";
  id: Scalars["ID"];
  icon: Scalars["String"];
  name: Scalars["String"];
};

type JobPosition = {
  __typename?: "JobPosition";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type Employee = {
  __typename?: "Employee";
  id: Scalars["ID"];
  user: User;
  role: Scalars["String"];
};

type User = Node & {
  __typename?: "User";
  /** The ID of the object. */
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

/** An object with an ID */
type Node = {
  /** The ID of the object. */
  id: Scalars["ID"];
};

type Student = {
  __typename?: "Student";
  mobile: Scalars["String"];
  street: Scalars["String"];
  zip: Scalars["String"];
  city: Scalars["String"];
  dateOfBirth?: Maybe<Scalars["Date"]>;
  nickname?: Maybe<Scalars["String"]>;
  schoolName?: Maybe<Scalars["String"]>;
  fieldOfStudy: Scalars["String"];
  graduation?: Maybe<Scalars["Date"]>;
  skills: Array<Skill>;
  distinction: Scalars["String"];
  state: ProfileState;
  profileStep: Scalars["Int"];
  softSkills: Array<SoftSkill>;
  hobbies: Array<Hobby>;
  onlineProjects: Array<OnlineProject>;
  languages: Array<UserLanguageRelation>;
};

type Skill = {
  __typename?: "Skill";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type Hobby = {
  __typename?: "Hobby";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type OnlineProject = {
  __typename?: "OnlineProject";
  id: Scalars["ID"];
  url: Scalars["String"];
};

type UserLanguageRelation = {
  __typename?: "UserLanguageRelation";
  id: Scalars["ID"];
  language: Language;
  languageLevel: LanguageLevel;
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

/** An enumeration. */
enum JobPostingState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

type JobPostingLanguageRelation = {
  __typename?: "JobPostingLanguageRelation";
  id: Scalars["ID"];
  language: Language;
  languageLevel: LanguageLevel;
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

/** An enumeration. */
enum AttachmentKey {
  StudentAvatar = "STUDENT_AVATAR",
  StudentDocuments = "STUDENT_DOCUMENTS",
  CompanyAvatar = "COMPANY_AVATAR",
  CompanyDocuments = "COMPANY_DOCUMENTS",
}

type Attachment = {
  __typename?: "Attachment";
  id: Scalars["ID"];
  url: Scalars["String"];
  mimeType: Scalars["String"];
  fileSize: Scalars["Int"];
  fileName: Scalars["String"];
};

type ZipCity = {
  __typename?: "ZipCity";
  zip: Scalars["String"];
  city: Scalars["String"];
  canton: Scalars["String"];
};

type Mutation = {
  __typename?: "Mutation";
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
  /** Updates website branch and description */
  universityProfileStep2?: Maybe<UniversityProfileStep2>;
  /** Updates website services */
  universityProfileStep3?: Maybe<UniversityProfileStep3>;
  /** Updates the profile of a Company */
  companyProfileStep1?: Maybe<CompanyProfileStep1>;
  /** Updates website url, branch, description, services, member IT St.Gallen */
  companyProfileStep2?: Maybe<CompanyProfileStep2>;
  /** Updates the Company Profile with benefits and Job Positions */
  companyProfileStep3?: Maybe<CompanyProfileStep3>;
  /** Updates the Company Profile with Soft Skills */
  companyProfileStep4?: Maybe<CompanyProfileStep4>;
  /** Updates the profile of a student */
  studentProfileStep1?: Maybe<StudentProfileStep1>;
  /** Updates job option, date (start or range) and job position of a student */
  studentProfileStep2?: Maybe<StudentProfileStep2>;
  /** Updates Soft Skill of a student */
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
  company: CompanyInput;
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
  student?: Maybe<StudentInput>;
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

/** Creates a job posting */
type JobPostingStep1 = {
  __typename?: "JobPostingStep1";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
};

type JobPostingInputStep1 = {
  id?: Maybe<Scalars["ID"]>;
  /** Description */
  description: Scalars["String"];
  jobOption: JobOptionInput;
  branch: BranchInput;
  /** Workload */
  workload: Scalars["Int"];
  jobFromDate: Scalars["String"];
  jobToDate?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

type JobOptionInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  mode?: Maybe<Scalars["String"]>;
};

type BranchInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

/** Updates a job posting */
type JobPostingStep2 = {
  __typename?: "JobPostingStep2";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
};

type JobPostingInputStep2 = {
  id?: Maybe<Scalars["ID"]>;
  expectations?: Maybe<Array<Maybe<ExpectationInput>>>;
  skills?: Maybe<Array<Maybe<SkillInput>>>;
  languages?: Maybe<Array<Maybe<JobPostingLanguageRelationInput>>>;
};

type ExpectationInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

type SkillInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

type JobPostingLanguageRelationInput = {
  id?: Maybe<Scalars["ID"]>;
  language?: Maybe<Scalars["ID"]>;
  languageLevel?: Maybe<Scalars["ID"]>;
};

/** Updates a job posting */
type JobPostingStep3 = {
  __typename?: "JobPostingStep3";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
};

type JobPostingInputStep3 = {
  id?: Maybe<Scalars["ID"]>;
  /** State */
  state: Scalars["String"];
  employee: EmployeeInput;
};

type EmployeeInput = {
  id?: Maybe<Scalars["ID"]>;
  /** Role */
  role?: Maybe<Scalars["String"]>;
};

type DeleteAttachment = {
  __typename?: "DeleteAttachment";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type UserUpload = {
  __typename?: "UserUpload";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

/** Updates the profile of a university */
type UniversityProfileStep1 = {
  __typename?: "UniversityProfileStep1";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
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

/** Updates website branch and description */
type UniversityProfileStep2 = {
  __typename?: "UniversityProfileStep2";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type UniversityProfileInputStep2 = {
  /** branch */
  branch?: Maybe<BranchInput>;
  /** description */
  description?: Maybe<Scalars["String"]>;
};

/** Updates website services */
type UniversityProfileStep3 = {
  __typename?: "UniversityProfileStep3";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
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
};

/** Updates the profile of a Company */
type CompanyProfileStep1 = {
  __typename?: "CompanyProfileStep1";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
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

/** Updates website url, branch, description, services, member IT St.Gallen */
type CompanyProfileStep2 = {
  __typename?: "CompanyProfileStep2";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type CompanyProfileInputStep2 = {
  /** website */
  website: Scalars["String"];
  /** branch */
  branch?: Maybe<BranchInput>;
  /** description */
  description?: Maybe<Scalars["String"]>;
  /** services */
  services?: Maybe<Scalars["String"]>;
  /** memeber IT St. Gallen */
  memberItStGallen: Scalars["Boolean"];
};

/** Updates the Company Profile with benefits and Job Positions */
type CompanyProfileStep3 = {
  __typename?: "CompanyProfileStep3";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type CompanyProfileInputStep3 = {
  /** Job Position */
  jobPositions?: Maybe<Array<Maybe<JobPositionInput>>>;
  /** Benefits */
  benefits?: Maybe<Array<Maybe<BenefitInput>>>;
};

type JobPositionInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

type BenefitInput = {
  id: Scalars["ID"];
  icon?: Maybe<Scalars["String"]>;
};

/** Updates the Company Profile with Soft Skills */
type CompanyProfileStep4 = {
  __typename?: "CompanyProfileStep4";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type CompanyProfileInputStep4 = {
  /** Soft Skills */
  softSkills?: Maybe<Array<Maybe<SoftSkillInput>>>;
};

type SoftSkillInput = {
  id: Scalars["ID"];
};

/** Updates the profile of a student */
type StudentProfileStep1 = {
  __typename?: "StudentProfileStep1";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
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

/** Updates job option, date (start or range) and job position of a student */
type StudentProfileStep2 = {
  __typename?: "StudentProfileStep2";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type StudentProfileInputStep2 = {
  jobOption: JobOptionInput;
  jobFromDate?: Maybe<Scalars["String"]>;
  jobToDate?: Maybe<Scalars["String"]>;
  jobPosition?: Maybe<JobPositionInput>;
};

/** Updates Soft Skill of a student */
type StudentProfileStep3 = {
  __typename?: "StudentProfileStep3";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type StudentProfileInputStep3 = {
  softSkills?: Maybe<Array<Maybe<SoftSkillInput>>>;
};

/** Updates the profile of a student */
type StudentProfileStep4 = {
  __typename?: "StudentProfileStep4";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
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

type HobbyInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

type OnlineProjectInput = {
  id?: Maybe<Scalars["ID"]>;
  url?: Maybe<Scalars["String"]>;
};

type UserLanguageRelationInput = {
  id?: Maybe<Scalars["ID"]>;
  language?: Maybe<Scalars["ID"]>;
  languageLevel?: Maybe<Scalars["ID"]>;
};

/** Updates the nickname of a student */
type StudentProfileStep5 = {
  __typename?: "StudentProfileStep5";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  nicknameSuggestions?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

type StudentProfileInputStep5 = {
  /** Nickname */
  nickname: Scalars["String"];
};

/** Updates the state of a student */
type StudentProfileStep6 = {
  __typename?: "StudentProfileStep6";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type StudentProfileInputStep6 = {
  /** State */
  state: Scalars["String"];
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

type UserNode = Node & {
  __typename?: "UserNode";
  /** The ID of the object. */
  id: Scalars["ID"];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
  email: Scalars["String"];
  type: Scalars["String"];
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

/** Same as `grapgql_jwt` implementation, with standard output. */
type RefreshToken = {
  __typename?: "RefreshToken";
  token?: Maybe<Scalars["String"]>;
  payload?: Maybe<Scalars["GenericScalar"]>;
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  refreshToken?: Maybe<Scalars["String"]>;
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

/** Creates a new user with company */
type RegisterCompany = {
  __typename?: "RegisterCompany";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type CompanyInput = {
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

type StudentInput = {
  /** Mobile */
  mobile: Scalars["String"];
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
