export type Message = {
  sender: string;
  text: string;
};

// INPUTS

export interface ICreateMessageInput {
  token: string;
  sender: string;
  receiver: string;
  text?: string;
}

// RESPONSES

export interface IMessageResponse {
  channel: string;
  messages: Message[];
}
