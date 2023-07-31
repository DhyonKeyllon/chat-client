import axios from "axios";

import {
  IAuthResponse,
  ICreateMessage,
  IGetUserByToken,
  IGetUserByTokenResponse,
  IMessageResponse,
  ISignin,
  ISignup,
} from "./types";

const BASE_URL = "http://localhost:8080";

export const signup = async ({ name, email, password }: ISignup): Promise<IAuthResponse> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/signup`,
      { name, email, password },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
    const { user, token } = response.data as IAuthResponse;

    return { token, user };
  } catch (error) {
    throw new Error("Failed to register user.");
  }
};

export const signin = async ({ email, password }: ISignin): Promise<IAuthResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signin`, { email, password });

    const { user, token } = response.data as IAuthResponse;

    return { token, user };
  } catch (error) {
    throw new Error("Failed to authenticate user.");
  }
};

export const getUserByToken = async ({ token }: IGetUserByToken): Promise<IGetUserByTokenResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${token}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { user } = response.data as IGetUserByTokenResponse;

    return { user };
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
};

export const getContacts = async () => {
  try {
    const localToken = localStorage.getItem("token");
    if (!localToken) throw new Error("No token found.");

    const response = await axios.get(`${BASE_URL}/users`, { headers: { Authorization: `Bearer ${localToken}` } });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch contacts.");
  }
};

export const createMessage = async ({ sender, receiver, text }: ICreateMessage): Promise<IMessageResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/messages`, { sender, receiver, text });
    return response.data as IMessageResponse;
  } catch (error) {
    throw new Error("Failed to create message.");
  }
};

export const getMessagesBetweenUsers = async ({ receiver, sender }: Omit<ICreateMessage, "text">) => {
  try {
    const response = await axios.get(`${BASE_URL}/messages/${sender}/${receiver}`);
    return response.data as IMessageResponse;
  } catch (error) {
    throw new Error("Failed to fetch messages.");
  }
};
