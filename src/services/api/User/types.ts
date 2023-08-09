export interface IUser {
  id: string;
  name: string;
  email: string;
}

// INPUTS

export interface ISigninInput {
  email: string;
  password: string;
}

export interface ISignupInput extends ISigninInput {
  name: string;
}

export interface IGetUserByTokenInput {
  token: string;
}

// RESPONSES

export interface ISigninResponse {
  user: IUser;
  token: string;
}

export interface IGetUserByTokenResponse {
  user: IUser;
}

export interface IGetUsersResponse {
  users: Omit<IUser, "email">[];
}
