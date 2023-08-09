import React, { createContext, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { SERVER_BASE_URL } from "../services/api/baseUrl";

export interface ISocketContext {
  socket: Socket | null;
}

export const SocketContext = createContext<ISocketContext>({ socket: null });

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SERVER_BASE_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export { SocketProvider };
