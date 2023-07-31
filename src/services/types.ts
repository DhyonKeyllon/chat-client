import { IUser } from "../contexts/AuthContext";

export interface ISignin {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}

export interface ISignup extends ISignin {
  name: string;
}

export interface IGetUserByToken {
  token: string;
}

export interface IGetUserByTokenResponse {
  user: IUser;
}

export type Message = {
  sender: string;
  text: string;
};

export interface IMessageResponse {
  channel: string;
  messages: Message[];
}

export interface ICreateMessage {
  sender: string;
  receiver: string;
  text?: string;
}
