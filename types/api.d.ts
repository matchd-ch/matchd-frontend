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
  ErrorType: any;
};

export type Query = {
  __typename?: 'Query';
  temp?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new user user request */
  userRequest?: Maybe<UserRequest>;
};


export type MutationUserRequestArgs = {
  input: UserRequestInput;
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
