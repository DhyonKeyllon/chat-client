import { Message } from "../../services/api/Message/types";
import { IUser } from "../../services/api/User/types";

import { useAuth } from "../../hooks/useAuth";

import BallonChatComponent from "../BallonChat";
import HeaderComponent from "../Header";
import BottomBarComponent from "../BottomBar";
import InputComponent from "../Input";
import ButtonComponent from "../Button";
import { MdSendFill } from "../Icons/Custom";

import { ChatContent, Container } from "./styles";
import { useEffect, useRef } from "react";
import ContactsComponent from "../Contacts";
import { FaArrowLeft } from "react-icons/fa6";

type ChatRoomComponentProps = {
  messages: Message[] | [];
  handleSendMessage: () => Promise<void>;
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  selectedContact: Omit<IUser, "email"> | null;
  setSelectedContact: React.Dispatch<
    React.SetStateAction<Omit<IUser, "email"> | null>
  >;
  contacts: Omit<IUser, "email">[];
  connectToChannel: (selectedUser: Omit<IUser, "email">) => Promise<void>;
};

const ChatRoomComponent = ({
  selectedContact,
  setSelectedContact,
  messages,
  handleSendMessage,
  inputMessage,
  setInputMessage,
  contacts,
  connectToChannel,
}: ChatRoomComponentProps) => {
  const { user } = useAuth();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  if (!user) return <></>;

  return (
    <Container>
      <HeaderComponent
        title={selectedContact ? selectedContact.name : "Selecione um contato"}
        icon={
          selectedContact && (
            <FaArrowLeft onClick={() => setSelectedContact(null)} />
          )
        }
      />

      <ChatContent>
        {selectedContact ? (
          <>
            {messages?.map(
              (message, index) =>
                !!message.text && (
                  <BallonChatComponent
                    me={message.sender === user.id}
                    key={`${index}-chat-ballon`}
                  >
                    {message.text}
                  </BallonChatComponent>
                )
            )}
          </>
        ) : (
          <ContactsComponent>
            {contacts.map(
              (contact) =>
                contact.id !== user.id && (
                  <ButtonComponent
                    key={contact.id}
                    onClick={() => void connectToChannel(contact)}
                  >
                    {contact.name}
                  </ButtonComponent>
                )
            )}
          </ContactsComponent>
        )}

        <div ref={messagesEndRef} />
      </ChatContent>

      <BottomBarComponent>
        <InputComponent
          placeholder={
            selectedContact
              ? "Digite sua mensagem"
              : "Aguardando seleção de contato..."
          }
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          value={inputMessage}
          onKeyDown={(e) => {
            if (!selectedContact || !inputMessage) return;
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          disabled={!selectedContact}
        />
        {selectedContact && (
          <ButtonComponent
            disabled={!selectedContact || !inputMessage}
            onClick={() => {
              handleSendMessage();
            }}
          >
            <MdSendFill />
          </ButtonComponent>
        )}
      </BottomBarComponent>
    </Container>
  );
};

export default ChatRoomComponent;
