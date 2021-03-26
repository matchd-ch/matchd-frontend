/* eslint-disable */
export type Maybe<T> = T | null;
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

/** An enumeration. */
export enum JobOptionMode {
  DateFrom = "DATE_FROM",
  DateRange = "DATE_RANGE",
}

/** An enumeration. */
export enum ProfileType {
  Internal = "INTERNAL",
  Student = "STUDENT",
  CollegeStudent = "COLLEGE_STUDENT",
  Junior = "JUNIOR",
  Company = "COMPANY",
  University = "UNIVERSITY",
  Other = "OTHER",
}

/** An enumeration. */
export enum ProfileState {
  Incomplete = "INCOMPLETE",
  Anonymous = "ANONYMOUS",
  Public = "PUBLIC",
}

/** An enumeration. */
export enum JobPostingState {
  Draft = "DRAFT",
  Public = "PUBLIC",
}

/** An enumeration. */
export enum AttachmentKey {
  StudentAvatar = "STUDENT_AVATAR",
  StudentDocuments = "STUDENT_DOCUMENTS",
  CompanyAvatar = "COMPANY_AVATAR",
  CompanyDocuments = "COMPANY_DOCUMENTS",
}

export type IAddEmployeeInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  role: Scalars["String"];
  email: Scalars["String"];
};

export type IJobPostingInputStep1 = {
  id?: Maybe<Scalars["ID"]>;
  /** Description */
  description: Scalars["String"];
  jobOption: IJobOptionInput;
  branch: IBranchInput;
  /** Workload */
  workload: Scalars["Int"];
  jobFromDate: Scalars["String"];
  jobToDate?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type IJobOptionInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  mode?: Maybe<Scalars["String"]>;
};

export type IBranchInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type IJobPostingInputStep2 = {
  id?: Maybe<Scalars["ID"]>;
  expectations?: Maybe<Array<Maybe<IExpectationInput>>>;
  skills?: Maybe<Array<Maybe<ISkillInput>>>;
  languages?: Maybe<Array<Maybe<IJobPostingLanguageRelationInput>>>;
};

export type IExpectationInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type ISkillInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type IJobPostingLanguageRelationInput = {
  id?: Maybe<Scalars["ID"]>;
  language?: Maybe<Scalars["ID"]>;
  languageLevel?: Maybe<Scalars["ID"]>;
};

export type IJobPostingInputStep3 = {
  id?: Maybe<Scalars["ID"]>;
  /** State */
  state: Scalars["String"];
  employee: IEmployeeInput;
};

export type IEmployeeInput = {
  id?: Maybe<Scalars["ID"]>;
  /** Role */
  role?: Maybe<Scalars["String"]>;
};

export type IUniversityProfileInputStep1 = {
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

export type IUniversityProfileInputStep2 = {
  /** branch */
  branch?: Maybe<IBranchInput>;
  /** description */
  description?: Maybe<Scalars["String"]>;
};

export type IUniversityProfileInputStep3 = {
  /** services */
  services?: Maybe<Scalars["String"]>;
  /** website education */
  linkEducation?: Maybe<Scalars["String"]>;
  /** website projects */
  linkProjects?: Maybe<Scalars["String"]>;
  /** website thesis */
  linkThesis?: Maybe<Scalars["String"]>;
};

export type ICompanyProfileInputStep1 = {
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

export type ICompanyProfileInputStep2 = {
  /** website */
  website: Scalars["String"];
  /** branch */
  branch?: Maybe<IBranchInput>;
  /** description */
  description?: Maybe<Scalars["String"]>;
  /** services */
  services?: Maybe<Scalars["String"]>;
  /** memeber IT St. Gallen */
  memberItStGallen: Scalars["Boolean"];
};

export type ICompanyProfileInputStep3 = {
  /** Job Position */
  jobPositions?: Maybe<Array<Maybe<IJobPositionInput>>>;
  /** Benefits */
  benefits?: Maybe<Array<Maybe<IBenefitInput>>>;
};

export type IJobPositionInput = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type IBenefitInput = {
  id: Scalars["ID"];
  icon?: Maybe<Scalars["String"]>;
};

export type ICompanyProfileInputStep4 = {
  /** Soft Skills */
  softSkills?: Maybe<Array<Maybe<ISoftSkillInputType>>>;
};

export type ISoftSkillInputType = {
  id: Scalars["ID"];
};

export type IStudentProfileInputStep1 = {
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

export type IStudentProfileInputStep2 = {
  /** School name */
  schoolName?: Maybe<Scalars["String"]>;
  /** Field of study */
  fieldOfStudy?: Maybe<Scalars["String"]>;
  /** Graduation */
  graduation?: Maybe<Scalars["String"]>;
};

export type IStudentProfileInputStep3 = {
  jobOption: IJobOptionInput;
  jobFromDate?: Maybe<Scalars["String"]>;
  jobToDate?: Maybe<Scalars["String"]>;
  jobPosition?: Maybe<IJobPositionInput>;
};

export type IStudentProfileInputStep4 = {
  /** Skills */
  skills?: Maybe<Array<Maybe<ISkillInput>>>;
  /** Hobbies */
  hobbies?: Maybe<Array<Maybe<IHobbyInput>>>;
  /** Online_Projects */
  onlineProjects?: Maybe<Array<Maybe<IOnlineProjectInput>>>;
  /** Languages */
  languages: Array<Maybe<IUserLanguageRelationInput>>;
  /** Distinction */
  distinction?: Maybe<Scalars["String"]>;
};

export type IHobbyInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type IOnlineProjectInput = {
  id?: Maybe<Scalars["ID"]>;
  url?: Maybe<Scalars["String"]>;
};

export type IUserLanguageRelationInput = {
  id?: Maybe<Scalars["ID"]>;
  language?: Maybe<Scalars["ID"]>;
  languageLevel?: Maybe<Scalars["ID"]>;
};

export type IStudentProfileInputStep5 = {
  /** Nickname */
  nickname: Scalars["String"];
};

export type IStudentProfileInputStep6 = {
  /** State */
  state: Scalars["String"];
};

export type IUserRequestInput = {
  /** Name */
  name: Scalars["String"];
  /** E-Mail */
  email: Scalars["String"];
  /** Message */
  message: Scalars["String"];
};

export type ICompanyInput = {
  /** Name */
  name: Scalars["String"];
  /** UID */
  uid?: Maybe<Scalars["String"]>;
  /** ZIP */
  zip: Scalars["String"];
  /** City */
  city: Scalars["String"];
};

export type IStudentInput = {
  /** Mobile */
  mobile: Scalars["String"];
};
