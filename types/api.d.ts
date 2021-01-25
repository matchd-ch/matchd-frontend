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
};

export type Query = {
  __typename?: 'Query';
  temp?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
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


export type MutationUserRequestArgs = {
  input: UserRequestInput;
};


export type MutationRegisterCompanyArgs = {
  company: CompanyInput;
  email: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  type: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
};


export type MutationRegisterStudentArgs = {
  student?: Maybe<StudentInput>;
  email: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  type: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};

/** Creates a new user user request */
export type UserRequest = {
  __typename?: 'UserRequest';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};


export type UserRequestInput = {
  /** Name */
  name: Scalars['String'];
  /** E-Mail */
  email: Scalars['String'];
  /** Message */
  message: Scalars['String'];
};

/** Creates a new user with company */
export type RegisterCompany = {
  __typename?: 'RegisterCompany';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type CompanyInput = {
  /** Role */
  role: Scalars['String'];
  /** Name */
  name: Scalars['String'];
  /** UID */
  uid: Scalars['String'];
  /** ZIP */
  zip: Scalars['String'];
  /** City */
  city: Scalars['String'];
};

/** Creates a new user as student */
export type RegisterStudent = {
  __typename?: 'RegisterStudent';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type StudentInput = {
  /** Mobile */
  mobile: Scalars['String'];
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
