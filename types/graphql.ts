/* eslint-disable */
// @ts-nocheck
export type Maybe<T> = T | null;


/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type AuthResult = {
   __typename?: 'AuthResult',
  token: Scalars['String'],
  user: User,
};

export type Comment = {
   __typename?: 'Comment',
  id: Scalars['ID'],
  body: Scalars['String'],
  user: User,
  createdAt: Scalars['DateTime'],
};

export type CreateGadgetInput = {
  title: Scalars['String'],
  description: Scalars['String'],
  quantity: Scalars['Int'],
  images: Array<Scalars['String']>,
};

export type CreateLocationInput = {
  city: Scalars['String'],
  country: Scalars['String'],
};


export type Gadget = {
   __typename?: 'Gadget',
  id: Scalars['ID'],
  title: Scalars['String'],
  description: Scalars['String'],
  images: Array<Scalars['String']>,
  location: Location,
  quantity: Scalars['Float'],
  status: GadgetStatus,
  comments: Array<Comment>,
  user: User,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  isRequested: Scalars['Boolean'],
};

export type GadgetRequest = {
   __typename?: 'GadgetRequest',
  id: Scalars['ID'],
  description: Scalars['String'],
  status: GadgetRequestStatus,
  user: User,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export enum GadgetRequestStatus {
  Approved = 'APPROVED',
  Denied = 'DENIED',
  Pending = 'PENDING'
}

export enum GadgetStatus {
  Available = 'AVAILABLE',
  NotAvailable = 'NOT_AVAILABLE'
}

export type Location = {
   __typename?: 'Location',
  id: Scalars['ID'],
  city: Scalars['String'],
  country: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createComment: Comment,
  createGadget: Gadget,
  createLocation: Location,
  requestGadget: GadgetRequest,
  updateRequest: Scalars['Boolean'],
  login: AuthResult,
  register: AuthResult,
};


export type MutationCreateCommentArgs = {
  body: Scalars['String'],
  gadgetId: Scalars['ID']
};


export type MutationCreateGadgetArgs = {
  data: CreateGadgetInput,
  location: CreateLocationInput
};


export type MutationCreateLocationArgs = {
  data: CreateLocationInput
};


export type MutationRequestGadgetArgs = {
  description: Scalars['String'],
  gadgetId: Scalars['ID']
};


export type MutationUpdateRequestArgs = {
  gadgetId: Scalars['ID'],
  requestId: Scalars['ID'],
  status: GadgetRequestStatus
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationRegisterArgs = {
  email: Scalars['String'],
  name: Scalars['String'],
  password: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  gadgetComments: Array<Comment>,
  gadgets: Array<Gadget>,
  gadget: Gadget,
  countries: Array<Scalars['String']>,
  locations: Array<Location>,
  requests: Array<GadgetRequest>,
  gadgetRequests: Array<GadgetRequest>,
  profile: User,
};


export type QueryGadgetCommentsArgs = {
  gadgetId: Scalars['ID']
};


export type QueryGadgetsArgs = {
  locationId?: Maybe<Scalars['ID']>
};


export type QueryGadgetArgs = {
  gadgetId: Scalars['ID']
};


export type QueryLocationsArgs = {
  country: Scalars['String']
};


export type QueryGadgetRequestsArgs = {
  gadgetId: Scalars['ID']
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};
