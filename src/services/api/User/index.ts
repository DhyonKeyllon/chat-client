import { AxiosResponse } from "axios";

import Api from "../Api";
import {
  ISigninResponse,
  IGetUsersResponse,
  IGetUserByTokenInput,
  IGetUserByTokenResponse,
  ISigninInput,
  ISignupInput,
} from "./types";

class UserApi extends Api {
  private static api: UserApi;

  public static getInstance(): UserApi {
    if (!UserApi.api) {
      UserApi.api = new UserApi();
    }
    return UserApi.api;
  }

  public async signup({ name, email, password }: ISignupInput): Promise<ISigninResponse> {
    try {
      const response: AxiosResponse<ISigninResponse> = await this.httpClient.post("/users/signup", {
        name,
        email,
        password,
      });

      const { user, token } = response.data;

      return { user, token };
    } catch (error) {
      throw new Error("Failed to register user.");
    }
  }

  public async signin({ email, password }: ISigninInput): Promise<ISigninResponse> {
    try {
      const response: AxiosResponse<ISigninResponse> = await this.httpClient.post("/users/signin", { email, password });

      const { user, token } = response.data;

      return { token, user };
    } catch (error) {
      throw new Error("Failed to authenticate user.");
    }
  }

  public async getUserByToken({ token }: IGetUserByTokenInput): Promise<IGetUserByTokenResponse> {
    try {
      const response = await this.httpClient.get(`/users/${token}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { user } = response.data as IGetUserByTokenResponse;
      return { user };
    } catch (error) {
      throw new Error("Failed to fetch user.");
    }
  }

  public async getUsers(): Promise<IGetUsersResponse> {
    try {
      const localToken = localStorage.getItem("token");
      if (!localToken) throw new Error("No token found.");

      const response: AxiosResponse<IGetUsersResponse> = await this.httpClient.get("/users", {
        headers: { Authorization: `Bearer ${localToken}` },
      });

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch contacts.");
    }
  }
}

export default UserApi.getInstance();
