import React, { createContext, useEffect } from "react";
import io, { Socket } from "socket.io-client";

// Defina os tipos para o contexto e o socket
export interface SocketContextType {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType>({ socket: null });

const SOCKET_SERVER_URL = "http://localhost:8080";

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export { SocketProvider };
