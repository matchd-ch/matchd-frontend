import gql from 'graphql-tag';
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
  ErrorType: any;
};

export type Query = {
  __typename?: 'Query';
  temp?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
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


export type MutationTokenAuthArgs = {
  password: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationUserRequestArgs = {
  input: UserRequestInput;
};


export type MutationRegisterCompanyArgs = {
  company: CompanyInput;
  type?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
};


export type MutationRegisterStudentArgs = {
  student: StudentInput;
  type?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
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
  __typename?: 'ObtainJSONWebToken';
  token?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  user?: Maybe<UserNode>;
  unarchiving?: Maybe<Scalars['Boolean']>;
  refreshToken?: Maybe<Scalars['String']>;
};


export type UserNode = Node & {
  __typename?: 'UserNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  email: Scalars['String'];
  type: UserType;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  pk?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  secondaryEmail?: Maybe<Scalars['String']>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/** An enumeration. */
export enum UserType {
  /** Internal */
  Internal = 'INTERNAL',
  /** Student */
  Student = 'STUDENT',
  /** College Student */
  CollegeStudent = 'COLLEGE_STUDENT',
  /** Junior */
  Junior = 'JUNIOR',
  /** Company */
  Company = 'COMPANY',
  /** University */
  University = 'UNIVERSITY',
  /** Other */
  Other = 'OTHER'
}

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RefreshToken = {
  __typename?: 'RefreshToken';
  token?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['GenericScalar']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
};


/** Creates a new user user request */
export type UserRequest = {
  __typename?: 'UserRequest';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ErrorType']>;
};


export type UserRequestInput = {
  /** Name */
  name?: Maybe<Scalars['String']>;
  /** E-Mail */
  email?: Maybe<Scalars['String']>;
  /** Message */
  message?: Maybe<Scalars['String']>;
};

/** Creates a new user with company */
export type RegisterCompany = {
  __typename?: 'RegisterCompany';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type CompanyInput = {
  /** Role */
  role?: Maybe<Scalars['String']>;
  /** Name */
  name?: Maybe<Scalars['String']>;
  /** UID */
  uid?: Maybe<Scalars['String']>;
  /** ZIP */
  zip?: Maybe<Scalars['String']>;
  /** City */
  city?: Maybe<Scalars['String']>;
};

/** Creates a new user as student */
export type RegisterStudent = {
  __typename?: 'RegisterStudent';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type StudentInput = {
  /** Mobile */
  mobileNumber?: Maybe<Scalars['String']>;
};

/**
 * Verify user account.
 * 
 * Receive the token that was sent by email.
 * If the token is valid, make the user verified
 * by making the `user.status.verified` field true.
 */
export type VerifyAccount = {
  __typename?: 'VerifyAccount';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};
