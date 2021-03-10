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
  expectations?: Maybe<Array<Maybe<ExpectationType>>>;
  jobPostings?: Maybe<Array<Maybe<JobPostingType>>>;
  jobPosting?: Maybe<JobPostingType>;
  uploadConfigurations?: Maybe<Array<Maybe<UploadConfiguration>>>;
  attachments?: Maybe<Array<Maybe<AttachmentType>>>;
  branches?: Maybe<Array<Maybe<BranchType>>>;
  benefits?: Maybe<Array<Maybe<BenefitType>>>;
  skills?: Maybe<Array<Maybe<SkillType>>>;
  jobPositions?: Maybe<Array<Maybe<JobPositionType>>>;
  jobOptions?: Maybe<Array<Maybe<JobOptionType>>>;
  zipCity?: Maybe<Array<Maybe<ZipCityType>>>;
  languageLevels?: Maybe<Array<Maybe<LevelType>>>;
  languages?: Maybe<Array<Maybe<LanguageType>>>;
  me?: Maybe<UserWithProfileNode>;
  verifyPasswordResetToken?: Maybe<Scalars["Boolean"]>;
};

type QueryJobPostingsArgs = {
  company: Scalars["Int"];
};

type QueryJobPostingArgs = {
  id: Scalars["Int"];
};

type QueryAttachmentsArgs = {
  key: AttachmentKey;
  userId?: Maybe<Scalars["Int"]>;
};

type QueryLanguagesArgs = {
  shortList?: Maybe<Scalars["Boolean"]>;
};

type QueryVerifyPasswordResetTokenArgs = {
  token: Scalars["String"];
};

type ExpectationType = {
  __typename?: "ExpectationType";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type JobPostingType = {
  __typename?: "JobPostingType";
  id: Scalars["ID"];
  description: Scalars["String"];
  jobOption: JobOptionType;
  workload?: Maybe<Scalars["String"]>;
  company: Company;
  jobFromDate: Scalars["Date"];
  jobToDate?: Maybe<Scalars["Date"]>;
  url?: Maybe<Scalars["String"]>;
  expectations: Array<ExpectationType>;
  skills: Array<SkillType>;
  formStep: Scalars["Int"];
  languages: Array<JobPostingLanguageRelationType>;
};

type JobOptionType = {
  __typename?: "JobOptionType";
  id: Scalars["ID"];
  name: Scalars["String"];
  mode: JobOptionMode;
};

/** An enumeration. */
enum JobOptionMode {
  /** Date from */
  DateFrom = "DATE_FROM",
  /** Date range */
  DateRange = "DATE_RANGE",
}

type Company = {
  __typename?: "Company";
  uid: Scalars["String"];
  name: Scalars["String"];
  zip: Scalars["String"];
  city: Scalars["String"];
  street: Scalars["String"];
  phone: Scalars["String"];
  website: Scalars["String"];
  description: Scalars["String"];
  services: Scalars["String"];
  memberItStGallen: Scalars["Boolean"];
  benefits: Array<BenefitType>;
  jobPositions: Array<JobPositionType>;
};

type BenefitType = {
  __typename?: "BenefitType";
  id: Scalars["ID"];
  icon: Scalars["String"];
  name: Scalars["String"];
};

type JobPositionType = {
  __typename?: "JobPositionType";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type SkillType = {
  __typename?: "SkillType";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type JobPostingLanguageRelationType = {
  __typename?: "JobPostingLanguageRelationType";
  id: Scalars["ID"];
  language: LanguageType;
  languageLevel: LevelType;
};

type LanguageType = {
  __typename?: "LanguageType";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type LevelType = {
  __typename?: "LevelType";
  id: Scalars["ID"];
  level: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

type UploadConfiguration = {
  __typename?: "UploadConfiguration";
  contentTypesConfiguration?: Maybe<Array<Maybe<UploadTypeConfiguration>>>;
  maxFiles?: Maybe<Scalars["Int"]>;
  key?: Maybe<AttachmentKey>;
};

type UploadTypeConfiguration = {
  __typename?: "UploadTypeConfiguration";
  contentTypes?: Maybe<Array<Maybe<Scalars["String"]>>>;
  maxSize?: Maybe<Scalars["Int"]>;
};

/** An enumeration. */
enum AttachmentKey {
  StudentAvatar = "STUDENT_AVATAR",
  StudentDocuments = "STUDENT_DOCUMENTS",
  CompanyAvatar = "COMPANY_AVATAR",
  CompanyDocuments = "COMPANY_DOCUMENTS",
}

type AttachmentType = {
  __typename?: "AttachmentType";
  id: Scalars["ID"];
  url?: Maybe<Scalars["String"]>;
  mimeType?: Maybe<Scalars["String"]>;
  fileSize?: Maybe<Scalars["Int"]>;
  fileName?: Maybe<Scalars["String"]>;
};

type BranchType = {
  __typename?: "BranchType";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type ZipCityType = {
  __typename?: "ZipCityType";
  zip?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  canton?: Maybe<Scalars["String"]>;
};

type UserWithProfileNode = Node & {
  __typename?: "UserWithProfileNode";
  /** The ID of the object. */
  id: Scalars["ID"];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
  email: Scalars["String"];
  type: UserType;
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  company?: Maybe<Company>;
  state: UserState;
  profileStep: Scalars["Int"];
  student?: Maybe<Student>;
  employee?: Maybe<Employee>;
};

/** An object with an ID */
type Node = {
  /** The ID of the object. */
  id: Scalars["ID"];
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

/** An enumeration. */
enum UserState {
  /** Incomplete */
  Incomplete = "INCOMPLETE",
  /** Anonymous */
  Anonymous = "ANONYMOUS",
  /** Public */
  Public = "PUBLIC",
}

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
  skills: Array<SkillType>;
  distinction: Scalars["String"];
  hobbies: Array<HobbyType>;
  onlineProjects: Array<OnlineProjectType>;
  languages: Array<UserLanguageRelationType>;
};

type HobbyType = {
  __typename?: "HobbyType";
  id: Scalars["ID"];
  name: Scalars["String"];
};

type OnlineProjectType = {
  __typename?: "OnlineProjectType";
  id: Scalars["ID"];
  url: Scalars["String"];
};

type UserLanguageRelationType = {
  __typename?: "UserLanguageRelationType";
  id: Scalars["ID"];
  language: LanguageType;
  languageLevel: LevelType;
};

type Employee = {
  __typename?: "Employee";
  id: Scalars["ID"];
  role: Scalars["String"];
};

type Mutation = {
  __typename?: "Mutation";
  /** Creates a job posting */
  jobPostingStep1?: Maybe<JobPostingStep1>;
  /** Updates a job posting */
  jobPostingStep2?: Maybe<JobPostingStep2>;
  deleteAttachment?: Maybe<DeleteAttachment>;
  upload?: Maybe<UserUpload>;
  /** Updates the profile of a Company */
  companyProfileStep1?: Maybe<CompanyProfileStep1>;
  /** Updates website url, branch, description, services, member IT St.Gallen */
  companyProfileStep2?: Maybe<CompanyProfileStep2>;
  /** Updates the Company Profile with benefits and Job Positions */
  companyProfileStep3?: Maybe<CompanyProfileStep3>;
  /** Updates the profile of a student */
  studentProfileStep1?: Maybe<StudentProfileStep1>;
  /** Updates school name, field of study and graduation */
  studentProfileStep2?: Maybe<StudentProfileStep2>;
  /** Updates job option, date (start or range) and job position of a student */
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

type MutationJobPostingStep1Args = {
  step1: JobPostingInputStep1;
};

type MutationJobPostingStep2Args = {
  step2: JobPostingInputStep2;
};

type MutationDeleteAttachmentArgs = {
  id?: Maybe<Scalars["ID"]>;
};

type MutationUploadArgs = {
  file: Scalars["Upload"];
  key: AttachmentKey;
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

/** Creates a job posting */
type JobPostingStep1 = {
  __typename?: "JobPostingStep1";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
  jobPostingId?: Maybe<Scalars["ID"]>;
};

type JobPostingInputStep1 = {
  /** Description */
  description: Scalars["String"];
  jobOption: JobOptionInputType;
  branch: BranchInputType;
  /** Workload */
  workload?: Maybe<Scalars["String"]>;
  jobFromDate: Scalars["String"];
  jobToDate?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

type JobOptionInputType = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  mode?: Maybe<Scalars["String"]>;
};

type BranchInputType = {
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
  expectations?: Maybe<Array<Maybe<ExpectationInputType>>>;
  skills?: Maybe<Array<Maybe<SkillInputType>>>;
  languages?: Maybe<Array<Maybe<JobPostingLanguageRelationInputType>>>;
};

type ExpectationInputType = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

type SkillInputType = {
  id: Scalars["ID"];
};

type JobPostingLanguageRelationInputType = {
  id?: Maybe<Scalars["ID"]>;
  language?: Maybe<Scalars["ID"]>;
  languageLevel?: Maybe<Scalars["ID"]>;
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
  branch?: Maybe<BranchInputType>;
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
  jobPositions?: Maybe<Array<Maybe<JobPositionInputType>>>;
  /** Benefits */
  benefits?: Maybe<Array<Maybe<BenefitInputType>>>;
};

type JobPositionInputType = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

type BenefitInputType = {
  id: Scalars["ID"];
  icon?: Maybe<Scalars["String"]>;
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

/** Updates school name, field of study and graduation */
type StudentProfileStep2 = {
  __typename?: "StudentProfileStep2";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type StudentProfileInputStep2 = {
  /** School name */
  schoolName?: Maybe<Scalars["String"]>;
  /** Field of study */
  fieldOfStudy?: Maybe<Scalars["String"]>;
  /** Graduation */
  graduation?: Maybe<Scalars["String"]>;
};

/** Updates job option, date (start or range) and job position of a student */
type StudentProfileStep3 = {
  __typename?: "StudentProfileStep3";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type StudentProfileInputStep3 = {
  jobOption: JobOptionInputType;
  jobFromDate?: Maybe<Scalars["String"]>;
  jobToDate?: Maybe<Scalars["String"]>;
  jobPosition?: Maybe<JobPositionInputType>;
};

/** Updates the profile of a student */
type StudentProfileStep4 = {
  __typename?: "StudentProfileStep4";
  success?: Maybe<Scalars["Boolean"]>;
  errors?: Maybe<Scalars["ExpectedErrorType"]>;
};

type StudentProfileInputStep4 = {
  /** Skills */
  skills?: Maybe<Array<Maybe<SkillInputType>>>;
  /** Hobbies */
  hobbies?: Maybe<Array<Maybe<HobbyInputType>>>;
  /** Online_Projects */
  onlineProjects?: Maybe<Array<Maybe<OnlineProjectInputType>>>;
  /** Languages */
  languages: Array<Maybe<UserLanguageRelationInputType>>;
  /** Distinction */
  distinction?: Maybe<Scalars["String"]>;
};

type HobbyInputType = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

type OnlineProjectInputType = {
  id?: Maybe<Scalars["ID"]>;
  url?: Maybe<Scalars["String"]>;
};

type UserLanguageRelationInputType = {
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
  type: UserType;
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  company?: Maybe<Company>;
  state: UserState;
  profileStep: Scalars["Int"];
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

type EmployeeInput = {
  /** Role */
  role: Scalars["String"];
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
