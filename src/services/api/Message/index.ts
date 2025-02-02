import { AxiosResponse } from "axios";

import Api from "../Api";
import { ICreateMessageInput, IMessageResponse } from "./types";

export class MessagesApi extends Api {
  private static api: MessagesApi;

  public static getInstance(): MessagesApi {
    if (!MessagesApi.api) {
      MessagesApi.api = new MessagesApi();
    }
    return MessagesApi.api;
  }

  public async createMessage({ sender, receiver, text, token }: ICreateMessageInput): Promise<IMessageResponse> {
    try {
      const response: AxiosResponse<IMessageResponse> = await this.httpClient.post(
        "/messages",
        {
          sender,
          receiver,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { channel, messages } = response.data;

      return { channel, messages };
    } catch (error) {
      throw new Error("Failed to create message.");
    }
  }

  public async getMessagesBetweenUsers({
    receiver,
    sender,
    token,
  }: Omit<ICreateMessageInput, "text">): Promise<IMessageResponse> {
    try {
      const response: AxiosResponse<IMessageResponse> = await this.httpClient.get(`/messages/${sender}/${receiver}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { channel, messages } = response.data;

      return { channel, messages };
    } catch (error) {
      throw new Error("Failed to fetch messages.");
    }
  }
}

export default MessagesApi.getInstance();
