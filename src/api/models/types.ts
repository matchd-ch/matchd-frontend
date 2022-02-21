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

export type IAddEmployeeInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  role: Scalars["String"];
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

export type IBenefitInput = {
  icon?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type IBranchInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type ICompanyProfileInputAdvantages = {
  /** Benefits */
  benefits?: InputMaybe<Array<InputMaybe<IBenefitInput>>>;
  /** Branches */
  branches?: InputMaybe<Array<InputMaybe<IBranchInput>>>;
};

export type ICompanyProfileInputBaseData = {
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

export type ICompanyProfileInputRelations = {
  /** description */
  description?: InputMaybe<Scalars["String"]>;
  /** memeber IT St. Gallen */
  memberItStGallen: Scalars["Boolean"];
  /** services */
  services?: InputMaybe<Scalars["String"]>;
  /** website */
  website: Scalars["String"];
};

export type ICompanyProfileInputValues = {
  /** Cultural Fit */
  culturalFits?: InputMaybe<Array<InputMaybe<ICulturalFitInput>>>;
  /** Soft Skills */
  softSkills?: InputMaybe<Array<InputMaybe<ISoftSkillInput>>>;
};

export type ICulturalFitInput = {
  id: Scalars["ID"];
};

/** An enumeration. */
export enum DateMode {
  DateFrom = "DATE_FROM",
  DateRange = "DATE_RANGE",
}

export type IEmployeeInput = {
  id?: InputMaybe<Scalars["ID"]>;
  /** Role */
  role?: InputMaybe<Scalars["String"]>;
};

export type IHobbyInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type IJobPostingInput = {
  id: Scalars["ID"];
};

export type IJobPostingInputAllocation = {
  employee: IEmployeeInput;
  id?: InputMaybe<Scalars["ID"]>;
  /** State */
  state: Scalars["String"];
};

export type IJobPostingInputBaseData = {
  branches: Array<InputMaybe<IBranchInput>>;
  /** Description */
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  jobFromDate: Scalars["String"];
  jobToDate?: InputMaybe<Scalars["String"]>;
  jobType: IJobTypeInput;
  /** Title */
  title: Scalars["String"];
  url?: InputMaybe<Scalars["String"]>;
  /** Workload */
  workload: Scalars["Int"];
};

export type IJobPostingInputRequirements = {
  id?: InputMaybe<Scalars["ID"]>;
  jobRequirements?: InputMaybe<Array<InputMaybe<IJobRequirementInput>>>;
  languages?: InputMaybe<Array<InputMaybe<IJobPostingLanguageRelationInput>>>;
  skills?: InputMaybe<Array<InputMaybe<ISkillInput>>>;
};

export type IJobPostingLanguageRelationInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  languageLevel?: InputMaybe<Scalars["ID"]>;
};

export type IJobPostingMatchingInput = {
  branch?: InputMaybe<IBranchInput>;
  jobType?: InputMaybe<IJobTypeInput>;
  workload?: InputMaybe<Scalars["Int"]>;
  zip?: InputMaybe<IZipCityInput>;
};

/** An enumeration. */
export enum JobPostingState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

export type IJobRequirementInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type IJobTypeInput = {
  id: Scalars["ID"];
  mode?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type IKeywordInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type IMatchJobPostingInput = {
  jobPosting: IJobPostingInput;
};

export type IMatchProjectPostingInput = {
  projectPosting: IProjectPostingInput;
};

export type IMatchStudentInput = {
  jobPosting: IJobPostingInput;
  student: IStudentInput;
};

/** An enumeration. */
export enum MatchType {
  Company = "COMPANY",
  JobPosting = "JOB_POSTING",
  ProjectPosting = "PROJECT_POSTING",
  Student = "STUDENT",
  University = "UNIVERSITY",
}

export type IOnlineProjectInput = {
  id?: InputMaybe<Scalars["ID"]>;
  url?: InputMaybe<Scalars["String"]>;
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

export type IProjectPostingInput = {
  id: Scalars["ID"];
};

export type IProjectPostingInputAllocation = {
  employee?: InputMaybe<IEmployeeInput>;
  id?: InputMaybe<Scalars["ID"]>;
  /** State */
  state: Scalars["String"];
};

export type IProjectPostingInputBaseData = {
  /** Additional Information */
  additionalInformation?: InputMaybe<Scalars["String"]>;
  /** Description */
  description: Scalars["String"];
  id?: InputMaybe<Scalars["ID"]>;
  keywords?: InputMaybe<Array<InputMaybe<IKeywordInput>>>;
  projectType: IProjectTypeInput;
  /** Title */
  title: Scalars["String"];
  topic: ITopicInput;
};

export type IProjectPostingInputSpecificData = {
  id?: InputMaybe<Scalars["ID"]>;
  projectFromDate?: InputMaybe<Scalars["String"]>;
  website?: InputMaybe<Scalars["String"]>;
};

export type IProjectPostingMatchingInput = {
  projectPosting: IProjectPostingInput;
};

/** An enumeration. */
export enum ProjectPostingState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

export type IProjectTypeInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type IRegisterCompanyInput = {
  /** City */
  city: Scalars["String"];
  /** Name */
  name: Scalars["String"];
  /** UID */
  uid?: InputMaybe<Scalars["String"]>;
  /** ZIP */
  zip: Scalars["String"];
};

export type IRegisterStudentInput = {
  id?: InputMaybe<Scalars["ID"]>;
  /** Mobile */
  mobile: Scalars["String"];
};

export type ISkillInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type ISoftSkillInput = {
  id: Scalars["ID"];
};

export type IStudentInput = {
  id: Scalars["ID"];
};

export type IStudentMatchingInput = {
  jobPosting: IJobPostingInput;
};

export type IStudentProfileInputAbilities = {
  /** Distinction */
  distinction?: InputMaybe<Scalars["String"]>;
  /** Hobbies */
  hobbies?: InputMaybe<Array<InputMaybe<IHobbyInput>>>;
  /** Languages */
  languages: Array<InputMaybe<IUserLanguageRelationInput>>;
  /** Online_Projects */
  onlineProjects?: InputMaybe<Array<InputMaybe<IOnlineProjectInput>>>;
  /** Skills */
  skills?: InputMaybe<Array<InputMaybe<ISkillInput>>>;
};

export type IStudentProfileInputBaseData = {
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

export type IStudentProfileInputCharacter = {
  culturalFits?: InputMaybe<Array<InputMaybe<ICulturalFitInput>>>;
  softSkills?: InputMaybe<Array<InputMaybe<ISoftSkillInput>>>;
};

export type IStudentProfileInputCondition = {
  /** State */
  state: Scalars["String"];
};

export type IStudentProfileInputEmployment = {
  branch?: InputMaybe<IBranchInput>;
  jobFromDate?: InputMaybe<Scalars["String"]>;
  jobToDate?: InputMaybe<Scalars["String"]>;
  jobType: IJobTypeInput;
};

export type IStudentProfileInputSpecificData = {
  /** Nickname */
  nickname: Scalars["String"];
};

export type ITopicInput = {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type IUniversityProfileInputBaseData = {
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

export type IUniversityProfileInputRelations = {
  /** Benefits */
  benefits?: InputMaybe<Array<InputMaybe<IBenefitInput>>>;
  /** Branches */
  branches?: InputMaybe<Array<InputMaybe<IBranchInput>>>;
  /** website education */
  linkEducation?: InputMaybe<Scalars["String"]>;
  /** website projects */
  linkProjects?: InputMaybe<Scalars["String"]>;
  /** website thesis */
  linkThesis?: InputMaybe<Scalars["String"]>;
  /** services */
  services?: InputMaybe<Scalars["String"]>;
};

export type IUniversityProfileInputSpecificData = {
  /** description */
  description?: InputMaybe<Scalars["String"]>;
};

export type IUniversityProfileInputValues = {
  /** Cultural Fit */
  culturalFits?: InputMaybe<Array<InputMaybe<ICulturalFitInput>>>;
  /** Soft Skills */
  softSkills?: InputMaybe<Array<InputMaybe<ISoftSkillInput>>>;
};

export type IUserLanguageRelationInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  languageLevel?: InputMaybe<Scalars["ID"]>;
};

export type IUserRequestInput = {
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

export type IZipCityInput = {
  zip: Scalars["String"];
};
