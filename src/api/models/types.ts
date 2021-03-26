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
  /** Date from */
  DateFrom = "DATE_FROM",
  /** Date range */
  DateRange = "DATE_RANGE",
}

/** An enumeration. */
export enum UserType {
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
export enum UserState {
  /** Incomplete */
  Incomplete = "INCOMPLETE",
  /** Anonymous */
  Anonymous = "ANONYMOUS",
  /** Public */
  Public = "PUBLIC",
}

/** An enumeration. */
export enum JobPostingState {
  /** Draft */
  Draft = "DRAFT",
  /** Public */
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
  jobOption: IJobOptionInputType;
  branch: IBranchInputType;
  /** Workload */
  workload: Scalars["Int"];
  jobFromDate: Scalars["String"];
  jobToDate?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type IJobOptionInputType = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  mode?: Maybe<Scalars["String"]>;
};

export type IBranchInputType = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type IJobPostingInputStep2 = {
  id?: Maybe<Scalars["ID"]>;
  expectations?: Maybe<Array<Maybe<IExpectationInputType>>>;
  skills?: Maybe<Array<Maybe<ISkillInputType>>>;
  languages?: Maybe<Array<Maybe<IJobPostingLanguageRelationInputType>>>;
};

export type IExpectationInputType = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type ISkillInputType = {
  id: Scalars["ID"];
};

export type IJobPostingLanguageRelationInputType = {
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
  branch?: Maybe<IBranchInputType>;
  /** description */
  description?: Maybe<Scalars["String"]>;
  /** services */
  services?: Maybe<Scalars["String"]>;
  /** memeber IT St. Gallen */
  memberItStGallen: Scalars["Boolean"];
};

export type ICompanyProfileInputStep3 = {
  /** Job Position */
  jobPositions?: Maybe<Array<Maybe<IJobPositionInputType>>>;
  /** Benefits */
  benefits?: Maybe<Array<Maybe<IBenefitInputType>>>;
};

export type IJobPositionInputType = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type IBenefitInputType = {
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
  jobOption: IJobOptionInputType;
  jobFromDate?: Maybe<Scalars["String"]>;
  jobToDate?: Maybe<Scalars["String"]>;
  jobPosition?: Maybe<IJobPositionInputType>;
  softSkills?: Maybe<Array<Maybe<ISoftSkillInputType>>>;
};

export type ISoftSkillInputType = {
  id: Scalars["ID"];
};

export type IStudentProfileInputStep4 = {
  /** Skills */
  skills?: Maybe<Array<Maybe<ISkillInputType>>>;
  /** Hobbies */
  hobbies?: Maybe<Array<Maybe<IHobbyInputType>>>;
  /** Online_Projects */
  onlineProjects?: Maybe<Array<Maybe<IOnlineProjectInputType>>>;
  /** Languages */
  languages: Array<Maybe<IUserLanguageRelationInputType>>;
  /** Distinction */
  distinction?: Maybe<Scalars["String"]>;
};

export type IHobbyInputType = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type IOnlineProjectInputType = {
  id?: Maybe<Scalars["ID"]>;
  url?: Maybe<Scalars["String"]>;
};

export type IUserLanguageRelationInputType = {
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
