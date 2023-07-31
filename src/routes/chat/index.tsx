import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSocket } from "../../hooks/useSocket";

import BottomBarComponent from "../../components/BottomBar";
import HeaderComponent from "../../components/Header";
import BallonChatComponent from "../../components/BallonChat";
import InputComponent from "../../components/Input";
import ButtonComponent from "../../components/Button";

import { MdSendFill } from "../../components/Icons/Custom";

import { ChatContent, Container } from "./styles";
import { AuthContext, IUser } from "../../contexts/AuthContext";
import { getContacts, getMessagesBetweenUsers, createMessage } from "../../services/api";
import createChannel from "../../utils/createChannel";

type Message = {
  sender: string;
  text: string;
};

function ChatPage() {
  const { socket } = useSocket();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [contacts, setContacts] = useState<IUser[]>([]);
  const [selectedContact, setSelectedContact] = useState<IUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (message: Message) => {
      if (message.sender === user?.id) return;
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket, user]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contacts = await getContacts();
        setContacts(contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    void fetchContacts();
  }, []);

  const handleSendMessage = async () => {
    if (!user || !selectedContact) return;
    if (!socket) return;

    const inputMessage = inputRef.current?.value.trim();

    if (!inputMessage || !inputRef.current) return;

    try {
      const channel = createChannel({ sender: user.id, receiver: selectedContact.id });

      const response = await createMessage({ sender: user.id, text: inputMessage, receiver: selectedContact.id });

      if (response.messages && response.messages.length > 0) {
        socket.emit("message", { channel, content: inputMessage, id: user.id });

        setMessages((prevMessages) => [...prevMessages, { sender: user.id, text: inputMessage }]);
      }
      inputRef.current.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const connectToChannel = async (selectedUser: IUser) => {
    if (!socket || !user) return;

    try {
      setSelectedContact(selectedUser);

      const channel = createChannel({ sender: user.id, receiver: selectedUser.id });

      const response = await getMessagesBetweenUsers({ sender: user.id, receiver: selectedUser.id });

      if (response.messages && response.messages.length > 0) {
        setMessages(response.messages);
      } else {
        await createMessage({ sender: user.id, receiver: selectedUser.id });
      }

      socket.emit("join", channel);
    } catch (error) {
      console.error("Error connecting to channel:", error);
    }
  };

  if (!user) return null;

  return (
    <>
      <div>
        <h1>{user.name}</h1>
        {contacts.map((contact) => (
          <div key={contact.id} onClick={() => void connectToChannel(contact)}>
            {contact.name}
          </div>
        ))}
      </div>
      <Container>
        <HeaderComponent title={selectedContact ? selectedContact.name : "Selecione um contato"} />
        <ChatContent>
          {messages?.map((message, index) => (
            <BallonChatComponent me={message.sender === user.id} key={`${index}-chat-ballon`}>
              {message.text}
            </BallonChatComponent>
          ))}
        </ChatContent>
        <BottomBarComponent>
          <InputComponent
            placeholder={selectedContact ? "Digite sua mensagem" : "Aguardando seleção de contato..."}
            ref={inputRef}
            onKeyDown={(e) => {
              if (!selectedContact) return;
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            disabled={!selectedContact}
          />
          {selectedContact && (
            <ButtonComponent disabled={!selectedContact} onClick={() => void handleSendMessage()}>
              <MdSendFill />
            </ButtonComponent>
          )}
        </BottomBarComponent>
      </Container>
    </>
  );
}

export default ChatPage;
