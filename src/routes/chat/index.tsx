import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IUser } from "../../services/api/User/types";
import { Message } from "../../services/api/Message/types";

import { useSocket } from "../../hooks/useSocket";
import { useAuth } from "../../hooks/useAuth";

import messageApi from "../../services/api/Message";
import userApi from "../../services/api/User";
import createChannel from "../../utils/createChannel";

import ContactsComponent from "../../components/Contacts";
import ChatRoomComponent from "../../components/ChatRoom";
import ButtonComponent from "../../components/Button";

import { Container } from "./styles";

function ChatPage() {
  const navigate = useNavigate();

  const { socket } = useSocket();
  const { user } = useAuth();

  const [contacts, setContacts] = useState<Omit<IUser, "email">[]>([]);
  const [selectedContact, setSelectedContact] = useState<Omit<IUser, "email"> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

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
        const contacts = await userApi.getUsers();
        setContacts(contacts.users);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    void fetchContacts();
  }, []);

  const handleSendMessage = async () => {
    if (!user || !selectedContact) return;
    if (!socket) return;
    if (!inputMessage) return;

    console.log("entrou no handleSendMessage");

    try {
      const channel = createChannel({ sender: user.id, receiver: selectedContact.id });

      const response = await messageApi.createMessage({
        sender: user.id,
        text: inputMessage,
        receiver: selectedContact.id,
      });

      if (response.messages && response.messages.length > 0) {
        socket.emit("message", { channel, content: inputMessage, id: user.id });

        setMessages((prevMessages) => [...prevMessages, { sender: user.id, text: inputMessage }]);
      }

      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const connectToChannel = async (selectedUser: Omit<IUser, "email">) => {
    if (!socket || !user) return;

    try {
      setSelectedContact(selectedUser);

      const channel = createChannel({ sender: user.id, receiver: selectedUser.id });

      const response = await messageApi.getMessagesBetweenUsers({ sender: user.id, receiver: selectedUser.id });

      if (response.messages && response.messages.length > 0) {
        setMessages(response.messages);
      } else {
        await messageApi.createMessage({ sender: user.id, receiver: selectedUser.id });
      }

      socket.emit("join", channel);
    } catch (error) {
      console.error("Error connecting to channel:", error);
    }
  };

  if (!user) return null;

  return (
    <Container $isSelectedContact={false}>
      <ContactsComponent>
        {contacts.map(
          (contact) =>
            contact.id !== user.id && (
              <ButtonComponent key={contact.id} onClick={() => void connectToChannel(contact)}>
                {contact.name}
              </ButtonComponent>
            )
        )}
      </ContactsComponent>
      <ChatRoomComponent
        handleSendMessage={handleSendMessage}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        messages={messages}
        selectedContact={selectedContact}
      />
    </Container>
  );
}

export default ChatPage;
